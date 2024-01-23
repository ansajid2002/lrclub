import Image from 'next/image';
import Link from 'next/link';
import React from 'react'



const Topnews = ({ data }) => {


  return (
    <div className=' border-b border-black block lg:flex  my-6 gap-4 px-2 lg:mx-auto '>
      {
        data?.map((single, index) => {
          const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes


          return (
            <div
              key={single.id}
              className={` ${index === 1 ? ' w-[100%] lg:w-[40%]' : 'w-[100%] lg:w-[30%]'}   my-2 border-b border-gray-600 pb-2 lg:border-none  `} // Conditionally set width inline and add my-2
            >
            <Link href={`/Blog/${single?.id}`}>
              <h1 className='font-bold text-red-600 uppercase my-1'>{`${single?._embedded['wp:term'][0][0].name}`}</h1>
              <div className={`${index === 1 ? 'p-1 border border-black shadow-md rounded-sm' : ''}`}>
                <Image
                  src={imagesObject?.medium?.source_url}
                  width={735} // Specify the width of your image
                  height={415} // Specify the height of your image
                  alt="Your image alt text"
                />
              </div>
              <div className='my-2'>
                <h1 className='text-lg font-semibold'>{single?.title?.rendered}</h1>
                {/* <p className='text-[14px] my-2 '>{single.excerpt.rendered}</p> */}
                <div dangerouslySetInnerHTML={{ __html: single.excerpt.rendered }} />

              </div>
              <h2 className='text-base font-semibold'>{`BY ${single?._embedded.author[0].name}`}</h2>
            </Link>
            </div>
          );
        })
      }
    </div>

  )
}

export default Topnews