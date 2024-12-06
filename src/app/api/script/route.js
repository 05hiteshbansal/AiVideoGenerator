import {chatSession} from "@/model/prompt";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {prompt}=await req.json();
        //console.log(prompt);
    const result = await chatSession.sendMessage(prompt);
        const response= NextResponse.json({
        message: JSON.parse(result.response.text()),
        success: true,
      });
return response
    }

   catch (error) {
    return NextResponse.json({ message: error.message, status: 500 , success:false });
  }

}