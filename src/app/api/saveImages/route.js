import { NextResponse } from "next/server";
import Video from "@/model/video";
import connection from "@/dbconfig/connection";
export async function POST(req) {
  try {
    connection();
    const { images, id } = await req.json();
    console.log(images, id);
    const updatedVideo = await Video.findOneAndUpdate(
      { id: id },
      { images: images },
      { new: true }
    );

    if (!updatedVideo) {
      throw new Error("Video not found or update failed.");
    }

    console.log("Updated video:", updatedVideo);

    return NextResponse.json({
      message: updatedVideo,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
      success: false,
    });
  }
}
