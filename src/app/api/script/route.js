import { generateStory } from "@/model/prompt";
import { NextResponse } from "next/server";
import { generateUGCVideo } from "@/model/UGCModel";
import { generateUGCVideoVariations } from "@/model/UGCVariationModel";

export async function POST(req) {
  try {
    const { prompt, type, generateVariations } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required", success: false },
        { status: 400 },
      );
    }
    let result = "";
    console.log("Received prompt for generation:", {
      prompt,
      type,
      generateVariations,
    });

    if (type == "new") {
      result = await generateStory(prompt);
    } else if (type == "ugc") {
      // If generateVariations is true, return all three variations
      if (generateVariations) {
        const variations = await generateUGCVideoVariations(
          prompt.productName,
          prompt.productDescription,
          prompt.brandName,
          {
            productType: prompt.productType,
            targetAudience: prompt.targetAudience,
            environment: prompt.environment,
            videoStyle: prompt.videoStyle
          }
        );

        console.log("Generated UGC Video Variations:", variations);
        return NextResponse.json({
          message: variations,
          success: true,
          hasVariations: true,
        });
      }

      // Otherwise, generate single variation (backwards compatible)
      result = await generateUGCVideo(
        prompt.productName,
        prompt.productDescription,
        prompt.brandName,
        {
          productType: prompt.productType,
          targetAudience: prompt.targetAudience,
          environment: prompt.environment,
          videoStyle: prompt.videoStyle
        }
      );

      console.log("Generated UGC Video Script:", result);
    } else {
      result = prompt;
    }

    const parsed = typeof result === "string" ? JSON.parse(result) : result;
    return NextResponse.json({
      message: parsed,
      success: true,
      hasVariations: false,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 },
    );
  }
}
