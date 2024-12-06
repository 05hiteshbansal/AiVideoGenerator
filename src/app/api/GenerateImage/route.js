import { NextResponse } from "next/server";
import Replicate from "replicate";
import { v2 as cloudinary } from 'cloudinary';
import stream from 'stream';
const replicate = new Replicate({
    auth:process.env.REPLIT_API_KEY
});

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});  


export async function POST(req) {
    try {

        const {prompt}=await req.json();
        console.log(prompt);
        const input = {
            prompt: prompt,
            height:1280,
            width:1024,
            num_outputs:1
        };
        const output = await replicate.run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", { input });
        // import { writeFile } from "node:fs/promises";
        // for (const [index, item] of Object.entries(output)) {
        //   await writeFile(`output_${index}.png`, item);
        // }
        const imageStream = output[0]; // Assuming the output is an array of ReadableStreams

        // Convert ReadableStream to Buffer
        const buffer = await streamToBuffer(imageStream);

        // Upload the buffer to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            const stream = require('stream');
            const bufferStream = new stream.PassThrough();
            bufferStream.end(buffer);
            bufferStream.pipe(uploadStream);
        });

        console.log("Upload Result: ", uploadResult);
        return NextResponse.json({ result: uploadResult.secure_url });
        
    } catch (error) {
        return NextResponse.json({message:error.message});
    }
}



const streamToBuffer = async (readableStream) => {
    const reader = readableStream.getReader();
    const chunks = [];
    let done, value;

    while (!done) {
        ({ done, value } = await reader.read());
        if (value) {
            chunks.push(value);
        }
    }

    return Buffer.concat(chunks);
};