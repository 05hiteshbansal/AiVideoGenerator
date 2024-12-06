import { AssemblyAI } from 'assemblyai';
import { NextResponse } from "next/server";
import connection from '@/dbconfig/connection';
import Video from '@/model/video';


const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_AI_API_KEY,
});
export async function POST(req) {
  connection();
    try {
        const {audioFile,id}=await req.json();
        const data = {
            audio: audioFile
          }

          console.log(data);
    const transcript = await client.transcripts.transcribe(data);
    await Video.findOneAndUpdate({id:id}, {scripts:transcript.words});
    //console.log(transcript.words);

        return NextResponse.json({
        message: transcript.words,
        success: true,
      });
    }
   catch (error) {
    return NextResponse.json({ message: error.message, status: 500 , success:false });
  }

}