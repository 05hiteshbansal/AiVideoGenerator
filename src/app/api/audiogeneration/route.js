import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import  textToSpeech  from "@google-cloud/text-to-speech";
import Video from "@/model/video";
import connection from "@/dbconfig/connection";
const client = new textToSpeech.TextToSpeechClient({
    apiKey:process.env.TEXT_TO_SPEECH_API_KEY
});
export async function POST(req) {

    try {
      connection();
        const {text,id}=await req.json();
        console.log(text);
   
        const request = {
            input: {text: text},
            // Select the language and SSML voice gender (optional)
            voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},   
            // select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3'},
          };

        const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file

  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});  

// Upload an audio`file
const audioBuffer=Buffer.from(response.audioContent,'binary');


const uploadAudioToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'video' }, // Use 'video' for audio files
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to stream and pipe it to Cloudinary
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  });
};

const result = await uploadAudioToCloudinary(audioBuffer);
//console.log('Upload Result:', result);


const newVideo= await new Video({ id: id,audioUrl:result.secure_url });
  await newVideo.save();
return NextResponse.json({ status: 500 , success:"success",url:result.secure_url });        
    }

   catch (error) {
    return NextResponse.json({ message: error.message, status: 500 , success:false });
  }

}