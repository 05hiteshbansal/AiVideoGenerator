import connection from "@/dbconfig/connection";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import sendEmail from '@/utils/mailer'
connection();
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log(email , password);
    if(!email || !password){
      return NextResponse.json({ message: "enter all Fields", status: 400,success:false });
    }
    console.log(email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ message: "user does not exist", status:400  ,success:false});
    }

    const compared = await bcrypt.compare(password, user.password);
    console.log(compared);
    if (compared) {
      const tokenData = {
        id: user._id,
        email: user.email,
      };
      const jwttoken = jwt.sign(tokenData, process.env.JWTSECRET, {
        expiresIn: "1d",
      });
if(!user.isverified){
  await sendEmail(user.email ,"Verify User" , user._id)
}
      const response = NextResponse.json({
        user: user,
        message: "User is LogIn successfully",
        token: jwttoken,
        success:true
      });
      response.cookies.set("token", jwttoken, {
        httpOnly: true,
      });

      return response
    }
    else{
      return NextResponse.json({ message: "Invalid credentials", status: 500 ,success:false });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 ,success:false });
  }
}
