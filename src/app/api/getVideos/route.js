import {chatSession} from "@/model/prompt";
import { NextResponse } from "next/server";
import Video from "@/model/video";
import connection from "@/dbconfig/connection";
export async function POST(req) {
    try {
        connection();
        console.log("connected");
    const result = await Video.find();
    
    return NextResponse.json({
        message: result,
        success: true,
      });

    }

   catch (error) {
    return NextResponse.json({ message: error.message, status: 500 , success:false });
  }

}