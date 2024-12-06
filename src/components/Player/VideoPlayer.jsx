import React from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig,Audio , useCurrentFrame, interpolate } from 'remotion'

const VideoPlayer = ({scripts,image,audioUrl,setDurationValue, }) => {
  
//console.log(image);
  const {fps}=useVideoConfig();
  const frame=useCurrentFrame();
  const getDuration=()=>{

    setDurationValue(((scripts[scripts.length-1].end)/1000)*fps);
    return scripts[scripts.length-1].end/1000*fps;
  }

  const getCaption=()=>{
    const currentTime=frame/30*1000;
    console.log(currentTime);
    const currentCaption=scripts.find((word)=> currentTime>=word.start && currentTime<=word.end);
    console.log(currentCaption);
    if(currentCaption){
      return currentCaption.text;
    }
  
  return " ";
  } 


  
  return (
    <div>
        <AbsoluteFill>
        {image.map((img,index) => {
          
          const startTime=(index*getDuration()/image.length);
          const duration= scripts[scripts.length-1].end/1000*fps;
          const idx=index%2==0?[1,1.8,1]:[1.8,1,1.8];
          const scale=interpolate(frame,[startTime,startTime+duration/2 ,startTime+duration],idx);

          return(
          <>
            <Sequence key={index} from={startTime} durationInFrames={getDuration()} >
            <Img
              src={img}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
               transform: `scale(${scale})`,
              }}
            />
              <AbsoluteFill className=' text-white font-bold  font-ubuntu text-xl text-center justify-center '>
                <h2 className=' absolute z-10 bottom-[150px] right-[115px]'> {getCaption()} </h2>
              </AbsoluteFill>

            </Sequence>
          </>
        )})}
        <Audio src={audioUrl}/>
        </AbsoluteFill>
    </div>
  )
}

export default VideoPlayer