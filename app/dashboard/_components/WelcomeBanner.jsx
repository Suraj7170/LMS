'use client'
import { useUser } from '@clerk/nextjs';
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
  const { user } = useUser();
  return (
    <div className='p-5 bg-blue-400 w-full text-white rounded-full flex items-center gap-6'>
      <Image  src='/laptop.png' alt='laptop' width={100} height={100}/>
      <div>
        <h2 className='font-bold p-2 text-3xl'>Hello, {user?.fullName}</h2>
        <p>Welcome Back, Its time to get back and start learning new course</p>
      </div>
    </div>
  )
}

export default WelcomeBanner