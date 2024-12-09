import connection from "@/dbconfig/connection";
import User from "@/model/user";
import { NextResponse } from "next/server";
connection();
export async function GET(req) {
  try {
    const user = await User.findOne({ userid: "123" });
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
