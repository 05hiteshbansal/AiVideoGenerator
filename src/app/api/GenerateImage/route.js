import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
import stream from "stream";

/* ==============================
   CONFIG
============================== */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* ==============================
   HELPERS
============================== */

// ✅ Clean base64 image (remove data:image/... prefix)
const cleanBase64Image = (base64String) => {
  if (!base64String) return null;

  // If already pure base64
  if (!base64String.startsWith("data:")) {
    return {
      mimeType: "image/png",
      data: base64String,
    };
  }

  const matches = base64String.match(/^data:(.*);base64,(.*)$/);

  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 image format");
  }

  return {
    mimeType: matches[1],
    data: matches[2],
  };
};

// ✅ Fetch external reference image and convert to base64
const fetchImageBase64 = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const mimeType = response.headers.get("content-type") || "image/png";

  return {
    mimeType,
    data: Buffer.from(arrayBuffer).toString("base64"),
  };
};

// ✅ Build Gemini inline image parts
const buildImageParts = async (urls = [], limit = 8) => {
  const parts = [];
  if (!Array.isArray(urls) || urls.length === 0) return parts;

  const safeUrls = urls.filter(Boolean).slice(0, limit);

  for (const url of safeUrls) {
    try {
      const { mimeType, data } = await fetchImageBase64(url);

      parts.push({
        inlineData: {
          mimeType,
          data,
        },
      });
    } catch (err) {
      console.warn("Reference image failed:", err.message);
    }
  }

  return parts;
};

/* ==============================
   API ROUTE
============================== */

export async function POST(req) {
  try {
    const {
      prompt: rawPrompt,
      avatarImages = [],
      primaryImages = [],
      visualFocus = "interaction",
      avatarDescription = "",
      primaryImageDescription = "",
      productName = "",
      imageModel = "",
      image, // optional base64 regeneration image
      userId = "guest",
    } = await req.json();

    if (!rawPrompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 },
      );
    }

    /* ==============================
       BUILD GEMINI CONTENT
    ============================== */

    // Create a strict consistency instruction
    const consistencyInstruction = `
STRICT CONSISTENCY RULES:
1. You MUST use the provided reference images for the avatar and the product.
2. The avatar in the output MUST be the SAME person as in the reference images.
3. The product in the output MUST match the design/packaging in the reference images.
4. FOCUS: ${visualFocus}.
5. PRODUCT NAME: ${productName}.
6. AVATAR DESCRIPTION: ${avatarDescription || "Authentic creator"}.
7. PRODUCT DESCRIPTION: ${primaryImageDescription || "Specific product"}.
7. DO NOT add extra products, characters, or text overlays not specified in the prompt.
8. QUALITY: Hyper-realistic 8K resolution, cinematic lighting, sharp textures, rich background depth.
9. Maintain a consistent, immersive UGC vertical video aesthetic.

SCENE PROMPT:
${rawPrompt}
    `.trim();

    const parts = [{ text: consistencyInstruction }];

    // Avatar reference images
    const avatarParts = await buildImageParts(avatarImages);
    parts.push(...avatarParts);

    // Product reference images
    const productParts = await buildImageParts(primaryImages);
    parts.push(...productParts);

    // Regeneration image (base64)
    if (image) {
      const cleanedImage = cleanBase64Image(image);

      console.log("Regeneration image size:", cleanedImage.data.length);

      parts.push({
        inlineData: {
          mimeType: cleanedImage.mimeType,
          data: cleanedImage.data,
        },
      });
    }

    /* ==============================
       CALL GEMINI IMAGE MODEL
    ============================== */

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts,
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE"],
      },
    });

    if (!response?.candidates?.length) {
      throw new Error("No image candidates returned");
    }

    const responseParts = response.candidates[0]?.content?.parts || [];

    const imagePart = responseParts.find((p) => p.inlineData?.data);

    if (!imagePart) {
      console.log("Gemini returned parts:", responseParts);
      throw new Error("Gemini did not return an image");
    }

    const imageBase64 = imagePart.inlineData.data;
    const buffer = Buffer.from(imageBase64, "base64");

    /* ==============================
       UPLOAD TO CLOUDINARY
    ============================== */

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "ai-generated",
          public_id: `${userId}_${Date.now()}`,
          overwrite: false,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);
      bufferStream.pipe(uploadStream);
    });

    return NextResponse.json({
      success: true,
      imageUrl: uploadResult.secure_url,
      result: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    console.error("Image generation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
