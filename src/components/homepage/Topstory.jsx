import React from 'react'
import Image from "next/image";
import Link from 'next/link';


const Topstory = ({ data }) => {
  const single = data[0]
  const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes

  return (
    <Link href={`/Blog/${single?.id}`}>
    <div className='mt-10 lg:mt-0 border-b border-dashed border-black mb-2 pb-4'>
      <div className="relative">
        <Image
          src={imagesObject?.large?.source_url}
          width={850}
          height={515}
          alt="Your image alt text"
        />
        <div className='absolute text-xl font-bold bg-white -top-3 left-1/2 transform -translate-x-1/2 border border-black'>
          <h1 className=' text-[12px] sm:text-base  border border-black m-0.5 sm:m-1.5 px-1.5 sm:px-4 py-1 sm:py-2'>
            TOP STORY
          </h1>
        </div>
      </div>
      <div className=' max-w-[850px]  p-2 text-center'>
        <h1 className=' text-2xl sm:text-3xl lg:text-4xl font-bold capitalize mt-2 mb-4 hover:text-red-600'>{single?.title?.rendered}</h1>
        <p className='text-base my-2'>{single.excerpt.rendered}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: single.excerpt.rendered }} /> */}

        <h2 className='text-base font-bold text-gray-800 my-1'>{`BY ${single?._embedded.author[0].name}`}</h2>
      </div>
    </div>
    </Link>



  )
}

export default Topstory