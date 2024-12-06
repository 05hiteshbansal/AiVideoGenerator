"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {signIn} from "next-auth/react"
import { faGoogle ,faGithub  } from '@fortawesome/free-brands-svg-icons'
import React from 'react'
const googleFunc=()=>{
  signIn('google', { callbackUrl: '/targets'})
}
const githubFunc=()=>{
  signIn('github', { callbackUrl: '/targets'})
  
}

const GoogleProvider = () => {
  return (
    <>
    <div className=' flex flex-1 w-full md:flex-row flex-col gap-2 h-9 mt-5 '>
    <button className='px-2 py-5 h-full w-full bg-red-600 text-white font-bold rounded-md flex items-center gap-2 justify-center ' onClick={googleFunc}><FontAwesomeIcon className='w-6 h-6 items-center' icon={faGoogle} /><div>Sign in Google</div></button>
      <button className='px-2 py-5 h-full w-full bg-black text-white font-bold rounded-md flex items-center gap-2 justify-center' onClick={githubFunc}><FontAwesomeIcon className='w-6 h-6 items-center' icon={faGithub} />Sign in GitHub</button>
    </div>
    </>
  )
}

export default GoogleProvider