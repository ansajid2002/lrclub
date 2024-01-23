import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Categorytwo = ({data}) => {
  return (
    <div>
      <div className='flex items-center justify-between border-b border-black pb-3 mb-1'>
      <h1 className='text-red-600 text-2xl font-medium italic tracking-wider '>CELEBRITY NEWS</h1>
      <h1 className='text-base cursor-pointer hover:text-gray-700 tracking-wider font-bold hidden md:block '>SEE ALL</h1>

        </div>
      {
       data.map((single, index) => {
                  const imagesObject =  single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
        
                  return (
                    <Link href={`/Blog/${single?.id}`}> 
                    <div className={`flex space-x-2 items-start my-3 md:my-5 pb-5 ${index === data?.length-1 ? "" : "border-b border-dashed border-black" } `} key={index} style={{  marginRight: '10px' }}>
                      <Image
                        src={imagesObject?.thumbnail?.source_url}
                        width={130}
                        height={120}
                        alt="Your image alt text"
                      />
                      <div>
                      <h1 className=' text-lg sm:text-xl font-medium  line-clamp-4'>{single?.title?.rendered}</h1>
                      
                      <p className='text-sm font-medium  mt-3'>{`By ${single?._embedded.author[0].name}`}</p>
                      
                        </div>
                    </div>
                      </Link>
                  );
                })
      }
    </div>
  )
}

export default Categorytwo