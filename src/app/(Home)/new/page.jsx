"use client";
import React,{useState,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import DropdownOptions from "@/components/NewOptions/DropdownOptions";
import StyleOptions from "@/components/NewOptions/StyleOptions";
import DurationOption from "@/components/NewOptions/DurationOption";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { Video } from "remotion";
import PlayerModel from "@/components/Player/Player";
import Loading from "@/loading";
const testdata={
    "image": [
        "https://res.cloudinary.com/dpc29aatx/image/upload/v1733413652/w3uib91w8a63fhzh4mo3.png",
        "https://res.cloudinary.com/dpc29aatx/image/upload/v1733413652/tz8clxl4vb9rjv1sewsy.png",
        "https://res.cloudinary.com/dpc29aatx/image/upload/v1733413653/d7qzln482j42d5dkxgd9.png",
        "https://res.cloudinary.com/dpc29aatx/image/upload/v1733413653/auiaftgdmszvcov6n1nh.png",
        "https://res.cloudinary.com/dpc29aatx/image/upload/v1733413653/cjer06bttrslztgurgea.png",
        "https://res.cloudinary.com/dpc29aatx/image/upload/v1733413656/nyj40epyl1di0qbjxmfl.png",
        "https://res.cloudinary.com/dpc29aatx/image/upload/v1733413659/i5eqat1itmd0aespaycu.png"
    ],
    "audioUrl": "https://res.cloudinary.com/dpc29aatx/video/upload/v1733413632/uniataqdq2bccclrqyrr.mp3",
    "scripts": [
        {
            "text": "Once",
            "start": 360,
            "end": 496,
            "confidence": 0.99925,
            "speaker": null
        },
        {
            "text": "upon",
            "start": 496,
            "end": 728,
            "confidence": 0.89317,
            "speaker": null
        },
        {
            "text": "a",
            "start": 728,
            "end": 928,
            "confidence": 0.99989,
            "speaker": null
        },
        {
            "text": "time,",
            "start": 928,
            "end": 1224,
            "confidence": 0.99997,
            "speaker": null
        },
        {
            "text": "in",
            "start": 1273,
            "end": 1457,
            "confidence": 0.99985,
            "speaker": null
        },
        {
            "text": "a",
            "start": 1481,
            "end": 1641,
            "confidence": 0.99978,
            "speaker": null
        },
        {
            "text": "land",
            "start": 1673,
            "end": 1913,
            "confidence": 0.99999,
            "speaker": null
        },
        {
            "text": "filled",
            "start": 1969,
            "end": 2185,
            "confidence": 0.56201,
            "speaker": null
        },
        {
            "text": "with",
            "start": 2225,
            "end": 2401,
            "confidence": 0.9999,
            "speaker": null
        },
        {
            "text": "bananas,",
            "start": 2433,
            "end": 3041,
            "confidence": 0.8668,
            "speaker": null
        },
        {
            "text": "lived",
            "start": 3113,
            "end": 3337,
            "confidence": 0.99983,
            "speaker": null
        },
        {
            "text": "a",
            "start": 3361,
            "end": 3473,
            "confidence": 0.9999,
            "speaker": null
        },
        {
            "text": "mischievous",
            "start": 3489,
            "end": 3953,
            "confidence": 0.63324,
            "speaker": null
        },
        {
            "text": "monkey",
            "start": 4009,
            "end": 4409,
            "confidence": 0.46981,
            "speaker": null
        },
        {
            "text": "named",
            "start": 4457,
            "end": 4665,
            "confidence": 0.57758,
            "speaker": null
        },
        {
            "text": "Miko.",
            "start": 4705,
            "end": 5633,
            "confidence": 0.69103,
            "speaker": null
        },
        {
            "text": "Miko",
            "start": 5809,
            "end": 6449,
            "confidence": 0.73803,
            "speaker": null
        },
        {
            "text": "loved",
            "start": 6497,
            "end": 6785,
            "confidence": 0.99991,
            "speaker": null
        },
        {
            "text": "adventures,",
            "start": 6825,
            "end": 7481,
            "confidence": 0.85001,
            "speaker": null
        },
        {
            "text": "especially",
            "start": 7593,
            "end": 8105,
            "confidence": 0.99932,
            "speaker": null
        },
        {
            "text": "treasure",
            "start": 8225,
            "end": 8609,
            "confidence": 0.99657,
            "speaker": null
        },
        {
            "text": "hunts.",
            "start": 8657,
            "end": 9281,
            "confidence": 0.67824,
            "speaker": null
        },
        {
            "text": "One",
            "start": 9433,
            "end": 9745,
            "confidence": 0.9999,
            "speaker": null
        },
        {
            "text": "day,",
            "start": 9785,
            "end": 10033,
            "confidence": 0.99998,
            "speaker": null
        },
        {
            "text": "he",
            "start": 10089,
            "end": 10329,
            "confidence": 0.66452,
            "speaker": null
        },
        {
            "text": "stumbled",
            "start": 10377,
            "end": 10729,
            "confidence": 0.99376,
            "speaker": null
        },
        {
            "text": "upon",
            "start": 10777,
            "end": 11025,
            "confidence": 0.99986,
            "speaker": null
        },
        {
            "text": "an",
            "start": 11065,
            "end": 11217,
            "confidence": 0.99995,
            "speaker": null
        },
        {
            "text": "old",
            "start": 11241,
            "end": 11449,
            "confidence": 0.99999,
            "speaker": null
        },
        {
            "text": "treasure",
            "start": 11497,
            "end": 11833,
            "confidence": 0.50879,
            "speaker": null
        },
        {
            "text": "map.",
            "start": 11889,
            "end": 12409,
            "confidence": 0.79807,
            "speaker": null
        },
        {
            "text": "His",
            "start": 12537,
            "end": 12825,
            "confidence": 0.99978,
            "speaker": null
        },
        {
            "text": "quest",
            "start": 12865,
            "end": 13137,
            "confidence": 0.99998,
            "speaker": null
        },
        {
            "text": "led",
            "start": 13201,
            "end": 13425,
            "confidence": 0.9919,
            "speaker": null
        },
        {
            "text": "him",
            "start": 13465,
            "end": 13641,
            "confidence": 0.99998,
            "speaker": null
        },
        {
            "text": "through",
            "start": 13673,
            "end": 13841,
            "confidence": 0.84383,
            "speaker": null
        },
        {
            "text": "a",
            "start": 13873,
            "end": 13993,
            "confidence": 0.99986,
            "speaker": null
        },
        {
            "text": "river",
            "start": 14009,
            "end": 14297,
            "confidence": 0.99996,
            "speaker": null
        },
        {
            "text": "guarded",
            "start": 14361,
            "end": 14745,
            "confidence": 0.99941,
            "speaker": null
        },
        {
            "text": "by",
            "start": 14785,
            "end": 14913,
            "confidence": 0.99997,
            "speaker": null
        },
        {
            "text": "a",
            "start": 14929,
            "end": 15033,
            "confidence": 0.99979,
            "speaker": null
        },
        {
            "text": "grumpy",
            "start": 15049,
            "end": 15425,
            "confidence": 0.52827,
            "speaker": null
        },
        {
            "text": "crocodile.",
            "start": 15465,
            "end": 16285,
            "confidence": 0.59256,
            "speaker": null
        },
        {
            "text": "Then",
            "start": 16825,
            "end": 17233,
            "confidence": 0.9997,
            "speaker": null
        },
        {
            "text": "he",
            "start": 17289,
            "end": 17457,
            "confidence": 0.99964,
            "speaker": null
        },
        {
            "text": "had",
            "start": 17481,
            "end": 17593,
            "confidence": 0.99981,
            "speaker": null
        },
        {
            "text": "to",
            "start": 17609,
            "end": 17737,
            "confidence": 0.99676,
            "speaker": null
        },
        {
            "text": "outsmart",
            "start": 17761,
            "end": 18265,
            "confidence": 0.6361,
            "speaker": null
        },
        {
            "text": "a",
            "start": 18305,
            "end": 18433,
            "confidence": 0.99982,
            "speaker": null
        },
        {
            "text": "sneaky",
            "start": 18449,
            "end": 18913,
            "confidence": 0.60231,
            "speaker": null
        },
        {
            "text": "snake.",
            "start": 18969,
            "end": 19537,
            "confidence": 0.9902,
            "speaker": null
        },
        {
            "text": "Finally,",
            "start": 19681,
            "end": 20257,
            "confidence": 0.99972,
            "speaker": null
        },
        {
            "text": "he",
            "start": 20321,
            "end": 20521,
            "confidence": 0.99968,
            "speaker": null
        },
        {
            "text": "found",
            "start": 20553,
            "end": 20745,
            "confidence": 0.99991,
            "speaker": null
        },
        {
            "text": "the",
            "start": 20785,
            "end": 20985,
            "confidence": 0.99966,
            "speaker": null
        },
        {
            "text": "treasure.",
            "start": 21025,
            "end": 21465,
            "confidence": 0.61012,
            "speaker": null
        },
        {
            "text": "A",
            "start": 21545,
            "end": 21737,
            "confidence": 0.97689,
            "speaker": null
        },
        {
            "text": "chest",
            "start": 21761,
            "end": 22017,
            "confidence": 0.77704,
            "speaker": null
        },
        {
            "text": "full",
            "start": 22081,
            "end": 22233,
            "confidence": 0.99955,
            "speaker": null
        },
        {
            "text": "of",
            "start": 22249,
            "end": 22401,
            "confidence": 0.99998,
            "speaker": null
        },
        {
            "text": "bananas.",
            "start": 22433,
            "end": 23329,
            "confidence": 0.92386,
            "speaker": null
        },
        {
            "text": "Miko",
            "start": 23497,
            "end": 24177,
            "confidence": 0.85726,
            "speaker": null
        },
        {
            "text": "shared",
            "start": 24241,
            "end": 24497,
            "confidence": 0.99996,
            "speaker": null
        },
        {
            "text": "his",
            "start": 24521,
            "end": 24729,
            "confidence": 0.99993,
            "speaker": null
        },
        {
            "text": "treasure,",
            "start": 24777,
            "end": 25209,
            "confidence": 0.9513,
            "speaker": null
        },
        {
            "text": "proving",
            "start": 25297,
            "end": 25665,
            "confidence": 0.99992,
            "speaker": null
        },
        {
            "text": "that",
            "start": 25705,
            "end": 25905,
            "confidence": 0.99996,
            "speaker": null
        },
        {
            "text": "friendship",
            "start": 25945,
            "end": 26385,
            "confidence": 0.99994,
            "speaker": null
        },
        {
            "text": "is",
            "start": 26425,
            "end": 26553,
            "confidence": 0.99986,
            "speaker": null
        },
        {
            "text": "the",
            "start": 26569,
            "end": 26697,
            "confidence": 0.99985,
            "speaker": null
        },
        {
            "text": "greatest",
            "start": 26721,
            "end": 27073,
            "confidence": 0.99992,
            "speaker": null
        },
        {
            "text": "treasure",
            "start": 27129,
            "end": 27465,
            "confidence": 0.62236,
            "speaker": null
        },
        {
            "text": "of",
            "start": 27505,
            "end": 27657,
            "confidence": 0.99988,
            "speaker": null
        },
        {
            "text": "all........",
            "start": 27681,
            "end": 27745,
            "confidence": 0.99972,
            "speaker": null
        }
    ]
}

const page = () => {
  const [prompt, setPrompt] = useState([]);
  const [data,setData]=useState([]);
  const [load,setLoad]=useState(false);
  const [open,setOpen]=useState(false);
  const [test, setTest] = useState({
    images: [],
    audioUrl: "",
    scripts:[],
  });



  const[id,setId]=useState(0);
  
  
  useEffect(() => {
    if(test.scripts.length>0){
      Generateimage();
    }
  }, [test.scripts]);

  useEffect(() => {
    console.log("Final Data ->test state : ", test);
    if(test.images.length>0){
      setOpen(true);
    }
  }, [test]);
  const handleSelectionChange = (data, value) => {
    console.log(data, value);
    setPrompt((prev) => ({ ...prev, [data]: value }));
  };

  const createScript = async () => {
    const final = `write a script to generate ${prompt.Duration} s video on topic with complete sentences : ${prompt.value} along with AI image prompt in ${prompt.style} format for each scene and give me result on JSON formate with image prompt and content text as field`;
    try {
      const data=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/script`,{prompt:final});
      //console.log("Data : ",data);
      
      // getting data Scripts
      setLoad(true);
      const userId=uuidv4();
      //console.log("User Id : ",userId);
      setId(userId);
      setData(data.data);
      const audioText=getAudioText(data.data.message);
      //console.log("Audio Text : ",audioText);
      
      // get audio file
      
      const generateAudio=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/audiogeneration`,{text:audioText,id:userId});
       //console.log("generated Audio :" , generateAudio);
     
     // get Transcripts
     
       const transcribe=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Transcripts`,{audioFile:generateAudio.data.url,id:userId});
       //console.log("Transcribe : ",transcribe);
      
      
      // get images by promts

      // const generateImage=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/GenerateImage`,{prompt:data.data.message});
      setTest( (prevTest) => ({ ...prevTest, "audioUrl":generateAudio.data.url,"scripts":transcribe.data.message }));
      
      // save image
       //Generateimage();
      
    } catch (error) {
      console.log(error);
    }
  };

  const getAudioText = (text) => {
    console.log("Text : ", text);
    let finalText = "";
    text.forEach((element) => {
      finalText += element.content_text + " ";
    });

    console.log("Final Text : ", finalText);
    return finalText;
  };

  const Generateimage = async () => {
    try {
      let images = [];
      console.log("Test", test);
  
      // Use Promise.all to wait for all image generation requests to complete
      const imagePromises = data.message.map(async (element) => {
        const generateImage = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/GenerateImage`,
          {
            prompt: element.image_prompt,
            id: id
          }
        );

        console.log("generateImage : ", generateImage.data.result);
        if(generateImage.data.result!=null){
        images.push(generateImage.data.result);
        }
        else{
            images.push("https://res.cloudinary.com/dpc29aatx/image/upload/v1733495210/bu8im2stk96srjyuuptd.png");
        }
        setLoad(false);
      });
  
      // Wait for all promises to resolve
      await Promise.all(imagePromises);
  
      // Update the state after all images are generated

      console.log("Images-> before : ", images);
      setTest((prevTest) => ({ ...prevTest, "images": images }));
      const saveImages=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/saveImages`,{"images":images,id:id});
      console.log("Save Images ->after : ",saveImages);
    } catch (error) {
      console.error("Error generating images: ", error);
    }
  };



  
  return (
    <>
    <div className=" m-5 p-5 shadow-lg ">
      <div>
        <div className=" text-3xl font-semibold font-rubik text-purple-500 ">
          Content
        </div>
        <div className=" text-lg font-ubuntu  ">
          What is the topic of your video 📽️
        </div>

        
        <DropdownOptions onUserSelect={handleSelectionChange} />
       
        <div className=" text-3xl pt-5 font-semibold font-rubik text-purple-500 ">
          Style
        </div>
        <div className=" text-lg font-ubuntu  ">
          Select a style of your video
        </div>
        <StyleOptions onUserSelect={handleSelectionChange} />
      </div>

     
      <div className=" text-3xl pt-5 font-semibold font-rubik text-purple-500 ">
        Duration
      </div>
      <DurationOption onUserSelect={handleSelectionChange} />

      <div className=" flex items-center justify-center py-5 ">
        <Button
          onClick={createScript}
          className=" bg-purple-500  font-ubuntu p-5 text-white md:w-[20%] w-[80%] m-auto "
        >
          Make Video
        </Button>
      </div>
    </div>
    {
    open && <PlayerModel data={test} open={open} setData={setTest} setOpen={setOpen}/>
    }
    {
        load && <Loading load={load} />
    }
    </>
  );
};

export default page;
