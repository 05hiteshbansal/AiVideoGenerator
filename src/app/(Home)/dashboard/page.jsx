"use client"
import { Button } from '@nextui-org/react';
import React from 'react'
import { PlusIcon } from '@heroicons/react/outline';
import EmptyVideo from '@/components/dashboard/EmptyVideo';
const page = () => {
  const [videolist, setVideolist] = React.useState([]);
  return (
    <div>
    <div className=' flex justify-between p-5 '>
    <div className=' font-ubuntu text-purple-600 text-2xl font-bold  '>
      Dashboard
    </div>

    <Button className='  bg-purple-500 font-ubuntu text-white' href='/new'><PlusIcon className=' size-4  text-white' /> Create New </Button>
    </div>  
    {videolist.length===0?(<EmptyVideo/>):(<div>Videos</div>)}

    </div>
  )
}

export default page