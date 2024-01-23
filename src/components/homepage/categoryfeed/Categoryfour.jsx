import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Categoryfour = ({ data }) => {
  const imagesObject1 =  data[0]?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
  const imagesObject2 =  data[1]?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
  const imagesObject3 =  data[2]?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
  const imagesObject4 =  data[3]?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
  return (
    <div className='md:flex md:space-x-4'>

          <div className={` my-3 md:my-5 pb-5  mx-2 md:w-[50%] `} style={{  marginRight: '10px' }}>
          <Link href={`/Blog/${data[0]?.id}`}> 
            <div className='border border-black'>
              <div className='border border-black m-1.5'>
              <Image
              src={imagesObject1?.medium?.source_url}
              width={600}
              height={600}
              alt="Your image alt text"
            />
              </div>
            </div>
            
            <div className='mt-2'>
            <h1 className='text-2xl font-medium  line-clamp-4'>{data[0]?.title?.rendered}</h1>
            
            <p className='text-sm font-bold mt-3'>{`By ${data[0]?._embedded.author[0].name}`}</p>
            
              </div>
          </Link>
          </div>
          <div className='mx-2 md:w-[50%]'>
      
      <div className='flex space-x-2 border-b border-black border-dashed'>
      <Link href={`/Blog/${data[1]?.id}`}> 
      <div className={` my-3 md:my-5 `} style={{  marginRight: '10px' }}>
            <Image
              src={imagesObject2?.medium?.source_url}
              width={250}
              height={120}
              alt="Your image alt text"
            />
            <div className='mt-2'>
            <h1 className='text-base md:text-xl font-medium  line-clamp-4'>{data[1]?.title?.rendered}</h1>
            
            <p className='text-[12px]  font-bold mt-3'>{`By ${data[1]?._embedded.author[0].name}`}</p>
            
              </div>
          </div>
              </Link>
          <Link href={`/Blog/${data[2]?.id}`}> 
          <div className={` my-3 md:my-5  `} style={{  marginRight: '10px' }}>
            <Image
              src={imagesObject3?.medium?.source_url}
              width={250}
              height={120}
              alt="Your image alt text"
            />
            <div  className='mt-2'>
            <h1 className='text-base md:text-xl font-medium  line-clamp-4'>{data[2]?.title?.rendered}</h1>
            
            <p className='text-[12px] font-bold mt-3'>{`By ${data[2]?._embedded.author[0].name}`}</p>
            
              </div>
          </div>      
              </Link>
          </div>
    

      <Link href={`/Blog/${data[3]?.id}`}> 
      <div className={`flex space-x-2 items-start my-3 md:my-5 pb-5 `} >
            <Image
              src={imagesObject4?.thumbnail?.source_url}
              width={400}
              height={400}
              alt="Your image alt text"
            />
            <div>
            <h1 className=' text-base md:text-xl font-medium  line-clamp-4'>{data[3]?.title?.rendered}</h1>
            
            <p className='text-sm font-bold  mt-3'>{`By ${data[3]?._embedded.author[0].name}`}</p>
            
              </div>
          </div> 
              </Link>

          </div>
    </div>
  )
}

export default Categoryfour