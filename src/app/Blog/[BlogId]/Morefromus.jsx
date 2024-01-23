import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import { ADMINURL } from '@/app/page';

export async function getMustread() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=6&page=3`,
      { next: { revalidate: 30 } }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch latest data: ${response.status}`);
    }
    const latestblogs = await response.json();
    return latestblogs;
  } catch (error) {
    console.error("Error fetching latest data:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

const Morefromus = async() => {
  const data = await getMustread()
  return (
    <div className='border shadow-lg border-black my-12' >
      <div className='border m-0.5 p-2 bg-white border-gray-600'>

      <h1 className=' text-xl sm:text-3xl italic font-bold'>MORE FROM LAZZYREADERS</h1>
      <div className='grid  grid-cols-2 sm:grid-cols-3 items-center space-x-1 my-8'>
        {data?.map((single, index) => {
          const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;

          return (
            <div  key={index}  className='pb-4 mb-4' >
              <Image
                src={imagesObject?.large?.source_url}
                width={400}
                height={250}
                alt="Your image alt text"
              />
              <div>
                <h1 className='line-clamp-4 lg:line-clamp-2 text-base tracking-wide sm:text-base mr-2 my-2 '>{single?.title?.rendered}</h1>
                <p className='text-base mt-1 font-bold text-gray-700'>{moment(single?.date).format('DD-MM-YYYY')}</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  )
}

export default Morefromus