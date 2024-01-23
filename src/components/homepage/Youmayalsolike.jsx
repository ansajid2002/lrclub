import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
const Youmayalsolike = ({ data }) => {
  return (
    <div className='border shadow-lg border-black '>
      <div className='border m-0.5 p-2 bg-white border-gray-600 '>

        <h1 className=' text-xl sm:text-3xl italic font-bold'>YOU MAY ALSO LIKE</h1>
        {/* <div className='grid  grid-cols-2 sm:grid-cols-4 items-center space-x-1 my-8'>
          {data?.map((single, index) => {
            const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;

            return (
              <Link href={`/Blog/${single?.id}`}>
                <div key={index} className='mb-4' >
                  <Image
                    src={imagesObject?.medium?.source_url}
                    width={150}
                    height={120}
                    alt="Your image alt text"
                  />
                  <div>
                    <p className='text-base uppercase font-bold text-red-600 mt-2'>{`${single?._embedded['wp:term'][0][0].name}`}</p>
                    <h1 className='line-clamp-4 text-[14px] sm:text-base mr-2'>{single?.title?.rendered}</h1>
                    <p className='text-[12px] mt-1 font-bold text-gray-700'>{moment(single?.date).format('DD-MM-YYYY')}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div> */}
        <div className='h-[300px] '></div>
      </div>
    </div>
  );
};

export default Youmayalsolike;
