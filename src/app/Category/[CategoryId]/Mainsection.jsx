"use client"
import CategoryWebStory from '@/app/WebStories/[category]/page';
import { Story } from '@/app/WebStories/page';
import { ADMINURL } from '@/app/page';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Mainsection = ({ params }) => {

  const [blogsdata, setBlogsdata] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)


  useEffect(() => {
    async function getLatestblogs() {
      try {
        const response = await fetch(
          `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=10&page=${page}&categories=${params.CategoryId}`,
          { next: { revalidate: 30 } }
        );
        if (!response.ok) {
          setHasMore(false)
          throw new Error(`Failed to fetch latest data: ${response.status}`);
        }
        const latestblogs = await response.json();
        if (latestblogs?.length === 0) {
          setHasMore(false)
        }
        else {
          setBlogsdata(latestblogs);
        }
        // return latestblogs;
      } catch (error) {
        console.error("Error fetching latest data:", error);
        // Handle the error if needed
      }
    }

    getLatestblogs();
  }, [page, params.CategoryId]);


  return (
    <section className='  lg:w-[70%] '>
      {
        blogsdata ?
        <div className='flex items-center justify-center mb-4  '>
          <span className='border h-1 w-full mt-5 border-gray-700 mx-2 flex-1 '></span>
          <h1 className='text-4xl font-medium italic m-6 mx-2 mb-0 uppercase text-center flex-1 ' >{blogsdata[0]._embedded['wp:term'][0][0].name}</h1> 
          <span className='border h-1 w-full mt-5 border-gray-700  mx-2 flex-1' ></span>
        </div> : 
          <h1 className='h-8 w-[200px] m-6 mb-0'></h1>
      }
      {blogsdata ?
        blogsdata?.map((single, index) => {

          const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes

          if (index === 0 ) {
            return (
              <Link href={`/Blog/${single?.id}`} >
                    <h1 className=' text-xl sm:text-4xl mb-2 mt-8 mx-2'>{single?.title?.rendered}</h1>
                <div className={`md:flex flex-row-reverse items-start justify-center md:space-x-4 mb-5 pt-2 px-5 ${index !== 0 ? "border-t my-5" : ""} `} key={index}>
                <div className='md:w-[55%] md:min-w-[300px] md:border border-black'>
                    <div className='md:border m-2 border-black '>
                    <Image
                      src={imagesObject?.large?.source_url}
                      width={535} // Specify the width of your image
                      height={415} // Specify the height of your image
                      // layout="responsive"
                      alt="Your image alt text"
                      />
                      </div>
                  </div>
                  <div className='md:w-[45%]'>
                    {/* <p className=' text-[14px] sm:text-base my-2  line-clamp-6'>{single.excerpt.rendered}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: single.excerpt.rendered }} />
  
                    <h2 className='text-base font-semibold text-red-800 hover:text-red-500 mt-1'>{`By ${single?._embedded.author[0].name}`}</h2>
                  </div>
                  
  
                </div>
              </Link>
  
            )
          
          }

          return (
            <Link href={`/Blog/${single?.id}`} >
              <div className={`md:flex items-start justify-center md:space-x-4 mb-5 pt-10 px-5 ${index !== 0 ? "border-t my-5 border-black border-dashed" : ""} `} key={index}>
                <div className='md:w-[35%] md:min-w-[300px]'>
                  <Image
                    src={imagesObject?.large?.source_url}
                    width={535} // Specify the width of your image
                    height={415} // Specify the height of your image
                    // layout="responsive"
                    alt="Your image alt text"
                  />
                </div>
                <div className='md:w-[60%]'>
                  <div className='flex text-[14px] sm:text-base items-center space-x-2 '>
                    {/* <h1  className='font-bold text-red-600 uppercase my-1'>{single?.category}</h1> */}
                    <p className='font-bold uppercase my-1 text-red-600'>{`${single?._embedded['wp:term'][0][0].name} NEWS`}</p>
                    <p className='font-bold  text-gray-700 uppercase my-1'>{moment(single?.date).format('  h:mm A')}</p>
                  </div>
                  {/* <h1 className=' text-xl sm:text-2xl'>{single?.title?.rendered}</h1> */}
                  <div dangerouslySetInnerHTML={{ __html: single?.title?.rendered }} className='text-lg md:text-2xl font-semibold text-gray-900'></div>

                  {/* <p className=' text-[14px] sm:text-base my-2  line-clamp-6'>{single.excerpt.rendered}</p> */}
                  <div dangerouslySetInnerHTML={{ __html: single.excerpt.rendered }} />

                  <h2 className='text-base font-semibold text-red-800 hover:text-red-500 '>{`By ${single?._embedded.author[0].name}`}</h2>
                </div>

              </div>
            </Link>

          )
        }) :
        [1, 2, 3, 4, 5, 6].map((single) => {
          return (
            <div className={`md:flex items-start justify-center md:space-x-4 my-5 pt-10 px-5  `}>
              <div className='md:w-[35%] md:min-w-[300px] h-[200px] animate-pulse bg-gray-300'>

              </div>
              <div className='md:w-[60%]'>
                <div className='flex bg-gray-300 h-4 animate-pulse  items-center space-x-2 '>
                  {/* <h1  className='font-bold text-red-600 uppercase my-1'>{single?.category}</h1> */}
                  <p className=' my-1  '></p>
                  <p className=' my-1.5   '></p>
                </div>
                <p className=' my-2 bg-gray-300 animate-pulse  h-14  md:h-32'></p>
                <h1 className='  h-3 my-1 bg-gray-300  animate-pulse'></h1>
                <h2 className=' h-4 bg-gray-300 animate-pulse'></h2>
              </div>

            </div>
          )
        })

      }
      <div className='flex items-center justify-between m-4 md:m-10'>
        <div>
          {
            page !== 1 &&

            <button
              className='bg-red-600 hover:bg-red-400 text-white hover:text-gray-200 w-[120px] md:w-[150px] text-center px-2 py-1 tracking-wider text-base md:text-xl font-bold rounded-sm italic'
              onClick={() => setPage((prev) => {
                // Use ternary operator to ensure the correct value is returned
                window.scrollTo({ top: 0, behavior: "smooth" });
                setHasMore(true)
                return prev > 1 ? prev - 1 : 1;
              })}
            >
              PREVIOUS
            </button>
          }
        </div>
        <div>

          {
            hasMore &&
            <button className={`${hasMore ? "bg-red-600 hover:bg-red-400 hover:text-gray-200" : " bg-red-600/35"}  text-white w-[120px]  md:w-[150px] text-center px-2 py-1 tracking-wider text-base  md:text-xl font-bold rounded-sm italic`} onClick={() => {
              if (hasMore) {
                setPage((prev) => prev + 1)
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}>Load More</button>

          }

        </div>
      </div>
      {/* <CategoryWebStory params={{ category: blogsdata && blogsdata[0]?._embedded['wp:term'][0][0]?.slug }} showBanner={false} /> */}

    </section>
  )
}

export default Mainsection