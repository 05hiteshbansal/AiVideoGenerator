import { generateStory } from "@/model/prompt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required", success: false },
        { status: 400 }
      );
    }

    const result = await generateStory(prompt);
    console.log(result);
    const parsed = JSON.parse(result);
    return NextResponse.json({
      message: parsed,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
