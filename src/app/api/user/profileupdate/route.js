import connection from "@/dbconfig/connection";
import UserProfile from "@/models/userProfile";
import { getDataFromToken } from "@/utils/GetTokenData";
import { NextResponse } from "next/server";
connection();
export async function POST(req) {
  try {
    const { userPhoto, location } = await req.json();
    const userid=getDataFromToken(req)
    console.log(userid);
    const user = await UserProfile.findOne({ userid: userid });
    if (user) {
      console.log(user , "Prev");
      user.location = location;
      user.userPhoto = userPhoto;
      const newuserupdated = await user.save()
      console.log(newuserupdated,"updated")
      newuserupdated.password=undefined
      return NextResponse.json({
        message: "user updated successfully",
        user: newuserupdated,
        status: 200,
        success:true
      });
    }

    const userupdated = new UserProfile({
      userid,
      userPhoto,
      location,
    });
    const newuserupdated = await userupdated.save();
    return NextResponse.json({
      message: "user updated successfully",
      user: newuserupdated,
      status: 200,
      success:false
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 500 , success:false});
  }
}
