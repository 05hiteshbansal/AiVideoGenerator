"use client"
import React, { useEffect, useState } from 'react'
import {Button} from '@nextui-org/react'
import { Input } from "@nextui-org/react";
import login from "@/media/r1.jpg"
import Image from "next/image"
import ImageUpload from "@/components/ImageUpload"

import axios from "axios";
import {Toaster, toast} from 'react-hot-toast';
const Page = () => {

  const [image,setimage]=useState(login);
  const[user,setuser]=useState({
    location:"",
  })
useEffect(()=>{
  const fetchData= async()=>{
    const prevuserdata= await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profileinfo`)
    console.log(prevuserdata)
    if(prevuserdata.data.user){
      const previmage =prevuserdata.data.user.userPhoto || login
      const prevloc={location:prevuserdata.data.user.location|| " "}
      setimage(previmage)
      console.log(user.location)
       setuser({...user, location:prevloc.location})
    }
  }
  fetchData();
},[])
const saveData=async()=>{
  try{

    toast.loading("loading");
  
      const verifyData={
        ...user,
        userPhoto:image
      }
      console.log(verifyData)
       const data= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profileupdate` ,verifyData)
      console.log(data.data.message);
      toast.dismiss()
      console.log(data.data)
      if(data.data.success){
        toast.success(data.data.message)
        
      }
      else{
        toast.error(data.data.message)
      }
  }
   catch (error) {
    console.log(error) 
    toast.error(error.message)   
  }
}

  const upload = async (e) => {
    console.log(e);
    const dataupload = await ImageUpload(e);
    console.log(dataupload);
    setimage(dataupload);
  };
  return (
    <>
<Toaster/>
    <div className=' w-full min-h-screen flex flex-col justify-center items-center ' >
    <div className='md:w-3/5 w-full h-full flex flex-col gap-10 justify-evenly items-center'>
        <div className='text-lg md:text-2xl lg:text-4xl font-bold font-sans'>Welcome! Let's create Your Profile</div>
        <div className='text-md md:text-md lg:text-lg font-sans text-gray-400'>Let other get you know better you can do these later</div>
        <div className='w-full flex items-center flex-col'>
            <div className='w-1/2 text-md md:text-lg lg:text-xl text-left font-bold font-sans mb-4 '>Add An Avatar</div>
            <div className=' flex w-full flex-col gap-3 md:flex-row justify-evenly items-center'>
            <Image 
          src={image}
          width={login.width}
          height={login.height}
          alt="click to change"
          className="w-[200px] h-[200px] object-cover rounded-full"
        >    
        </Image>  
            <div>
            <div className="file-input">
              <input
                type="file"
                id="file"
                onChange={upload}
                accept="image/*"
                className=" hidden"
              />
              <label htmlFor="file" className="cursor-pointer px-4 py-1 rounded-xl hover:border-red-700 hover:border-2 hover:bg-red-200 hover:text-red-800 bg-slate-400">
                Upload
              </label>
            </div>
            </div>
            </div>
        </div>
        <div className='flex flex-col gap-2 w-3/5'>
            <div className='text-md md:text-lg lg:text-xl text-left font-bold font-sans mb-4 '>Add Your Location</div>
            <Input  type="location"
              label="Location"
              variant="underlined"
              size='lg'
              defaultValue={user.location}
              placeholder="USA"
              onChange={(e)=>setuser({...user, location:e.target.value})}
              className="w-full  selection:text-white selection:bg-black "/>
        </div>

        <Button size="lg" color="danger" variant="ghost" className="w-1/5 " onClick={saveData}>Save</Button>
    </div>
    </div>
    </>
  )
}

export default Page