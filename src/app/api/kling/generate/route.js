import { NextResponse } from "next/server";
import { createVideoWithKling } from "@/model/KlingModel";

export async function POST(req) {
  try {
    const { images, prompt, options } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { message: "Images are required", success: false },
        { status: 400 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required", success: false },
        { status: 400 }
      );
    }

    console.log("Generating Kling video for prompt:", prompt);
    
    // We expect images to be an array of URLs
    const videoUrl = await createVideoWithKling(images, prompt, options || {});

    return NextResponse.json({
      success: true,
      videoUrl,
    });
  } catch (error) {
    console.error("Kling API Route Error:", error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
