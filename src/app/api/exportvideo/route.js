import { NextResponse } from "next/server";
import {
  getFunctions,
  renderMediaOnLambda,
  getRenderProgress,
} from "@remotion/lambda/client";

export async function POST(req) {
  try {
    const functions = await getFunctions({
      region: "us-east-1",
      compatibleOnly: true,
    });

    const functionName = functions[0].functionName;
    const { data } = await req.json();
    const region = "us-east-1";

    // 🔥 Calculate duration BEFORE rendering
    const durationInFrames = parseInt(
      (data.scripts[data.scripts.length - 1].end / 1000) * 30 + 20,
    );

    // 1️⃣ Get Lambda function
    const { renderId, bucketName } = await renderMediaOnLambda({
      region,
      functionName,
      serveUrl: process.env.SERVE_URL,
      composition: "VideoPlayer",
      inputProps: data,
      codec: "h264",
      imageFormat: "jpeg",
      durationInFrames,
      frameRange: [0, durationInFrames - 1], // 🔥 ADD THIS
      framesPerLambda: 20,
      privacy: "public",
      timeoutInMilliseconds: 120000,
    });

    // 3️⃣ Poll progress
    let outputFile = null;

    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName,
        region,
      });

      if (progress.fatalErrorEncountered) {
        throw new Error("Render failed: " + JSON.stringify(progress.errors));
      }

      if (progress.done) {
        outputFile = progress.outputFile;
        break;
      }
    }

    return NextResponse.json({
      success: true,
      url: outputFile,
    });
  } catch (err) {
    console.error("Lambda render error:", err);

    return NextResponse.json(
      {
        success: false,
        message: err.message || "Render failed",
      },
      { status: 500 },
    );
  }
}
