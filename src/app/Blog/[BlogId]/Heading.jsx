"use client"
import { ADMINURL } from '@/app/page'
import moment from 'moment'
import { useAmp } from 'next/amp'
import React, { useEffect, useState } from 'react'

const Heading = ({ params }) => {
  const isAmp = useAmp()

  console.log(isAmp);
  const [data, setData] = useState(null)


  useEffect(() => {
    async function getLatestblogs() {

      try {
        const response = await fetch(
          `${ADMINURL}/wp-json/wp/v2/posts/${Number(params)}?_embed`,
          { next: { revalidate: 30 } }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch latest data: ${response.status}`);
        }
        const latestblogs = await response.json();
        //   return latestblogs;
        setData(latestblogs)
      } catch (error) {
        console.error("Error fetching latest param blog data:", error);
        throw error; // Re-throw the error to handle it at a higher level if needed
      }
    }
    if (!data) {
      getLatestblogs()
    }
  }, [])

  return (
    <div className='mt-12 mx-4' >

      {
        data ?
          <>
            <h1 className=' text-[28px] sm:text-[36px] leading-[40px] md:text-[54px] md:leading-[60px] '>{data?.title?.rendered}</h1>
            {/* <h2 className=' text-base md:text-xl font-bold text-gray-600 mt-6 mb-2'>{data?.excerpt?.rendered}</h2> */}
            <div className='mt-4 text-gray-500 text-justify'>
              <div dangerouslySetInnerHTML={{ __html: data?.excerpt?.rendered }} />
            </div>

            <div className='sm:flex items-center space-y-1 sm:space-x-3 mt-2'>
              {/* <h1  className='font-bold text-red-600 uppercase my-1'>{single?.category}</h1> */}
              <p className='font-bold text-sm sm:text-base uppercase  text-red-600'>{`By ${data?._embedded.author[0].name}`}</p>
              <p className=' italic text-[12px] sm:text-sm text-black uppercase '> {moment(data?.date).format('MMMM D, YYYY h:mm A')}</p>
            </div>
          </> :
          <>
            <h1 className='text-[36px] leading-[40px] md:text-[54px] md:leading-[54px] '></h1>
            {/* <h2 className=' text-base md:text-xl font-bold text-gray-600 mt-6 mb-2'>{data?.excerpt?.rendered}</h2> */}
            <div className='mt-4 text-gray-500 text-justify'>
              <div dangerouslySetInnerHTML={{ __html: data?.excerpt?.rendered }} />
            </div>

            <div className='flex  items-center space-x-3'>
              {/* <h1  className='font-bold text-red-600 uppercase my-1'>{single?.category}</h1> */}
              <p className='font-bold text-base uppercase my-1 text-red-600'></p>
              <p className=' italic text-base text-black uppercase my-1'></p>
            </div>
          </>
      }
    </div>
  )
}

export default Heading