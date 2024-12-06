import nodemailer from "nodemailer";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const  sendEmail = async (emailtosend, type, userId) => {
  //console.log(data);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_PROVIDER,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    //if (type === "Verify User" || type==="Re-send") {
      let token 
      let timeexpire 
      let htmlused
if(type==="Welcome to Platform"){
  token=undefined
  timeexpire=undefined
  htmlused=`<p>Welcome To the platform</p>`
}
if (type === "Verify User" || type==="Re-send") {
   token = await bcrypt.hash(userId.toString(), 10);
   timeexpire = Date.now() + 3600000;
      const updateduser = await User.findByIdAndUpdate(userId,{
        verifyToken: token,
        verifyTokenExpire: timeexpire,
      });
     htmlused=`<p>Please click to verify user <a href=${process.env.NEXT_PUBLIC_API_URL}/verify> Click </a> and Paste ${token} to verify </p>`
}
//const htmlused
//console.log(updateduser);
//}


    const mail = {
      from: {
        name: type,
        email: process.env.EMAIL_USERNAME,
      },
      to: emailtosend,
      subject: type,
      html: htmlused,
    };

    const y2 = await transporter.sendMail(mail);
    console.log("Message sent: %s", y2.messageId);
    return y2;
  } catch (error) {
    console.log(error.message, 1);
  }
};


export default sendEmail