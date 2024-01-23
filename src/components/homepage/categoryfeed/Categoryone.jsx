// import moment from 'moment';
// import Image from 'next/image'
// import React from 'react'

// const Categoryfeed = ({ categoryInfo }) => {
//   const imagesObject =  categoryInfo.firstData?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;

 
//   return (
//     <div className='lg:flex  space-x-4 space-y-3  '>
//       <div>

//       <div className=' shadow-md pb-2' style={{ marginRight: '10px' }}>
//               <Image
//                 src={imagesObject?.large?.source_url}
//                 width={600}
//                 height={315}
//                 alt="Your image alt text"
//               />
//               <h1 className=' px-1 text-base  md:text-xl line-clamp-4'>{ categoryInfo.firstData?.title?.rendered}</h1>
//               <div className=' px-1 flex items-center space-x-2 text-sm my-2'>
//               <p>{moment( categoryInfo.firstData?.date).format('DD-MM-yyyy')}</p>
//               <p className='font-bold text-red-600'>{`By ${ categoryInfo.firstData?._embedded.author[0].name}`}</p>
//                 </div>
//             </div>
//         </div>
//     <div  className='grid grid-col-1 md:grid-cols-2  '>
//       {
//         categoryInfo?.data.map((single, index) => {
//           const imagesObject =  single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;

//           return (
//             <div className='flex space-x-2 items-start my-3 md:my-0' key={index} style={{  marginRight: '10px' }}>
//               <Image
//                 src={imagesObject?.medium?.source_url}
//                 width={150}
//                 height={120}
//                 alt="Your image alt text"
//               />
//               <div>
//               <h1 className='line-clamp-3 text-[14px] md:text-base'>{single?.title?.rendered}</h1>
              
//               <p className='text-sm mt-2'>{moment(single?.date).format('DD-MM-yyyy')}</p>
//               <p className='text-sm font-bold text-red-600'>{`By ${single?._embedded.author[0].name}`}</p>
              
//                 </div>
//             </div>
//           );
//         })
//       }
//     </div>
//     </div>
//   );
// }

// export default Categoryfeed;

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Categoryone = ({data}) => {
  return (
    <div className='sm:border-r border-black sm:pr-3'>
      <div className='flex items-center justify-between border-b border-black pb-3 mb-1'>
      <h1 className='text-red-600 text-2xl font-medium italic tracking-wider '>ENTERTAINMENT</h1>
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
                      <h1 className='text-lg sm:text-xl font-medium  line-clamp-4'>{single?.title?.rendered}</h1>
                      
                      <p className='text-sm  font-medium  mt-3'>{`By ${single?._embedded.author[0].name}`}</p>
                      
                        </div>
                    </div>
                        </Link>
                  );
                })
      }
    </div>
  )
}

export default Categoryone