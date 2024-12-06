import connection from "@/dbconfig/connection";
import UserProfile from "@/models/userProfile";
import { getDataFromToken } from "@/utils/GetTokenData";
import { NextResponse } from "next/server";
connection();
export async function GET(req) {
  try {
    const userid=getDataFromToken(req)
    const user = await UserProfile.findOne({ userid: userid });
    user.password=undefined
      return NextResponse.json({
        message: "User information",
        user: user,
        status: 200,
        success:true
      });
    }
 catch (error) {
    return NextResponse.json({ message: error.message, status: 500 , success:false});
  }
}
