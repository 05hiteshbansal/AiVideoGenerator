"use client";
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
const StyleOption = [
    {
        name: "StoryBoard",
        image: '/storyBoard.png',
    },
    {
        name: "Comic",
        image: '/comic.png',
    },
    {
        name: "Creative",
        image: '/creative.png',
    },
    {
        name: "Imaginative",
        image: '/imaginative.png',
    },
    {
        name: "Painting",
        image: '/painting.png',
    },
    {
        name: "Realistic",
        image: '/realistic.png'
    }
]
const StyleOptions = ({onUserSelect}) => {
const [selected, setSelected] = useState("")


  return (
    <div className=' w-full gap-5 pl-3 pr-3 mt-6 grid grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  '>
    {StyleOption.map((item,index) => (
        <div key={index} className={`h-52 relative hover:scale-105 transition-all hover:border-4 hover:border-purple-600 ${item.name===selected?"border-4 border-purple-600":""
        } `}>
        <Image 
        src={item.image}
        alt='image'
        fill
        priority={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
         onClick={()=>{
            setSelected(item.name)
            onUserSelect("style",item.name)
         }
         }
         />
         <div className=' bg-black text-white text-center absolute bottom-0 p-1 font-ubuntu w-full'>{item.name}</div>
        </div>
    ))}
        
    </div>
  )
}

export default StyleOptions