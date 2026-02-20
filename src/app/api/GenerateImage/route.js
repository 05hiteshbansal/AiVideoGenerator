import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
import stream from "stream";

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, image } = await req.json();
    // image = optional base64 image for editing

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 },
      );
    }

    // 🔥 Build parts (supports optional image editing)
    const parts = [{ text: prompt }];

    if (image) {
      parts.push({
        inlineData: {
          mimeType: "image/png",
          data: image, // base64 string (no data:image/... prefix)
        },
      });
    }

    // 🔥 Generate Image from Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: [
        {
          role: "user",
          parts,
        },
      ],
    });

    if (!response.candidates?.length) {
      throw new Error("No image generated");
    }

    // 🔥 Extract image base64
    let imageBase64 = null;

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData?.data) {
        imageBase64 = part.inlineData.data;
        break;
      }
    }

    if (!imageBase64) {
      throw new Error("Image data not found in Gemini response");
    }

    const buffer = Buffer.from(imageBase64, "base64");

    // 🔥 Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
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
      result: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
