import React from 'react'
import { Input } from 'antd'
import Latestnews from './Latestnews'
import { ADMINURL } from '@/app/page';
import Mustread from './Mustread';




const Sidecontent = () => {
 
    
  return (
    <div className='lg:w-[30%]  '>
    <div className='h-[500px] mx-2  bg-gray-100 border text-gray-600 flex  justify-center'>
      <h1>advertisement</h1>
    </div>
    <Mustread />
    <div className='my-6   border border-black'>
      <div className='m-1 py-6 px-4 border border-black'>
        <h1 className='font-bold text-2xl text-center italic' >LRC NEWSLETTERS</h1>
        <h2 className='text-[14px] text-center tex-gray-600 px-2 my-6' >Sign up for LR CLUB news straight to your inbox every day</h2>
        <div className='border-b border-black'>
          <Input placeholder="Enter Email" className='border-none' />
        </div>
        <div className='flex justify-center my-6'>
          <button className='border mx-auto px-4 py-2 font-bold border-black hover:bg-gray-200 hover:text-gray-800'>SUBSCRIBE TODAY</button>

        </div>
        <p className='text-[12px]'>By providing your information, you agree to our <b>Terms of Use</b> and our <b>Privacy Policy</b>. We use vendors that may also process your information to help provide our services.</p>

      </div>
    </div>
    <Latestnews  />
    <div className='h-[300px] bg-gray-100 border text-gray-600 flex  justify-center'>
      <h1>advertisement</h1>
    </div>

  </div>
  )
}

export default Sidecontent