

import { NextResponse } from "next/server";
export async function GET(req) {
  try {
      const response= NextResponse.json({
        message: "User Logged out",
        success: true,
        
      });
      response.cookies.set("token","",{
        httpOnly:true,
        expires: new Date(0)
      })


return response

    }

   catch (error) {
    return NextResponse.json({ message: error.message, status: 500 , success:false });
  }

}