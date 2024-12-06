import { Button } from '@nextui-org/react'
import React from 'react'

const EmptyVideo = () => {
  return (
    <div>
        <div className='flex justify-center flex-col gap-4 items-center h-60 border-spacing-4 border-2 mt-5  '>
            <div className='text-xl font-ubuntu '>No Short video has been created </div>
            <Button className=' bg-purple-500 text-white font-ubuntu' href='/new'>Create New Video</Button>
        </div>
    </div>
  )
}

export default EmptyVideo