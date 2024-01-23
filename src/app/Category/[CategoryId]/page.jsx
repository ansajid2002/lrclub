
import { ADMINURL } from '@/app/page';
import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { TbArrowBigRightLineFilled } from 'react-icons/tb'
import Mainsection from './Mainsection';
import Link from 'next/link';
// import { Story } from '@/app/WebStories/page';

export const Story = (story) => {
  return ( 
      <Link href={`https://stg.lazzyreaders.com/web-stories/${story?.stories[0]?.slug}`} target='_blank'>
  <div className="flex flex-col sm:w-auto cursor-pointer shadow-md rounded-md overflow-hidden ">
      <div className='transform scale-1 hover:scale-105 transition ease-in-out duration-300 overflow-hidden'>
          <img src={`${story?.stories[0]?.story_poster?.url}`} alt={story?.title} className="" />
      </div>
      <div className=" shadow-lg p-2  mt-2">
          {/* <h1 className='font-medium italic'>WEBSTORIES</h1> */}
          <h1 className=" text-[12px] sm:text-sm lg:text-base tracking-wide  capitalize line-clamp-2 font-semibold">{story?.stories[0]?.title}</h1>
          <div className='flex justify-between items-center mt-1.5'>
          <p className='text-[10px] md:text-sm font-bold text-gray-400'>{moment(story?.stories[0]?.date).format('LL')}</p>
              <Image src={'/logoLr.png'} width={30} height={30} className="rounded-full" />
          </div>
      </div>
  </div>
</Link>

  )
}

export async function getLatestblogs() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=10&page=3`,
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
export async function getLatestblogs2() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=6&page=2`,
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

const fetchWebStories = async () => {
  try {
    const response = await fetch(`${ADMINURL}/wp-json/web-stories-api/v1/stories?per_page=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData

  } catch (error) {
    console.error("Error processing request:", error);

  }
};

const page = async ({ params }) => {
  const data = await getLatestblogs()
  const data2 = await getLatestblogs()
  const webstoriesdata = await fetchWebStories()

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div>
      <div className='lg:flex  lg:space-x-4 '>
        <Mainsection params={params} />
        <section className='lg:w-[30%] p-2 '>
          <div>
            <h1 className='text-xl sm:text-2xl underline font-bold italic my-4 ' >LATEST NEWS</h1>

            <div>
              {
                data?.map((single, index) => {
                  const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes

                  if (index !== 0) {
                    return (
                      <Link href={`/Blog/${single?.id}`}>
                        <div key={index} className={` border-black border-dashed   flex items-center space-x-2 max-w-[90%] border-b p-2 pb-3 mb-3`}>
                          <div className='flex justify-center max-w-[50%]'>
                            <Image
                              src={imagesObject?.thumbnail?.source_url}
                              width={100} // Specify the width of your image
                              height={100} // Specify the height of your image

                              alt="Your image alt text"
                              className='object-cover'
                            />
                          </div>
                          <div className='flex-1'>
                            {/* <h1 className='text-[15px] line-clamp-3'>{single?.title?.rendered}</h1> */}
                            <div dangerouslySetInnerHTML={{ __html: single?.title?.rendered }} className='text-base line-clamp-3'></div>

                            <div className='flex items-center space-x-2'>
                              {/* <h1  className='font-bold text-red-600 uppercase my-1'>{single?.category}</h1> */}
                              <p className='font-bold text-[13px] uppercase my-1 text-red-600'>{`${single?._embedded['wp:term'][0][0].name}`}</p>
                              <p className='font-bold text-[12px] text-gray-700 uppercase my-1'>{moment(single?.date).format('  h:mm A')}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  }

                  return (
                    <Link href={`/Blog/${single?.id}`}>
                      <div key={index} className='max-w-[90%] border-b border-black border-dashed p-2 mb-3 '>
                        <div className=''>
                          <Image
                            src={imagesObject?.medium?.source_url}
                            width={280} // Specify the width of your image
                            height={105} // Specify the height of your image
                            alt="Your image alt text"
                          />
                        </div>
                        <div className='flex items-center space-x-2 mt-1'>
                          {/* <h1  className='font-bold text-red-600 uppercase my-1'>{single?.category}</h1> */}
                          <p className='font-bold text-[13px] uppercase my-1 text-red-600'>{`${single?._embedded['wp:term'][0][0].name}`}</p>
                          <p className='font-bold text-[12px] text-gray-700 uppercase my-1'>{moment(single?.date).format('  h:mm A')}</p>
                        </div>
                        <h1 className='text-base'>{single?.title?.rendered}</h1>
                      </div>
                    </Link>
                  )
                })
              }
              <div className='max-w-[90%] flex space-x-2 items-center justify-center  cursor-pointer mt-5 bg-gradient-to-r from-red-400 via-red-600 to-red-400 hover:bg-gradient-to-r hover:from-white hover:via-red-400 hover:to-white hover:text-gray-900 text-white px-1.5 border hover:border-gray-400 py-1  rounded-md font-bold duration-500'>
                <h1 className=' ' >SHOW MORE</h1>
                <TbArrowBigRightLineFilled size="20px" />

              </div>
            </div>
          </div>
          {/* <div className='mt-14'>
            <h1 className='text-xl sm:text-2xl underline font-bold italic my-4' >MOST VIEWED</h1>

            <div>
              {
                data2?.map((single, index) => {
                  const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes

                  return (
                    <Link href={`/Blog/${single?.id}`}>
                      <div key={index} className={` border-black border-dotted   flex items-center space-x-2 max-w-[90%] border-b p-2 pb-3 mb-3`}>
                        <div className='flex justify-center max-w-[50%]'>
                          <Image
                            src={imagesObject?.thumbnail?.source_url}
                            width={100} // Specify the width of your image
                            height={100} // Specify the height of your image

                            alt="Your image alt text"
                            className='object-cover'
                          />
                        </div>
                        <div className='flex-1'>
                          <div dangerouslySetInnerHTML={{ __html: single?.title?.rendered }} className='text-base line-clamp-3'></div>

                          <div className='flex items-center space-x-2'>
                            <p className='font-bold text-[13px] uppercase my-1 text-red-600'>{`${single?._embedded['wp:term'][0][0].name}`}</p>
                            <p className='font-bold text-[12px] text-gray-700 uppercase my-1'>{moment(single?.date).format('  h:mm A')}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })
              }
              <div className='max-w-[80%] flex space-x-2 items-center justify-center  cursor-pointer mt-5 bg-gradient-to-r from-red-400 via-red-600 to-red-400 hover:bg-gradient-to-r hover:from-white hover:via-red-400 hover:to-white hover:text-gray-900 text-white px-1.5 border hover:border-gray-400 py-1  rounded-md font-bold duration-500'>
                <h1 className=' ' >SHOW MORE</h1>
                <TbArrowBigRightLineFilled size="20px" />

              </div>
            </div>
          </div> */}
          <div className='bg-gray-200 h-[500px] my-12'>
            <h1 className='text-center text-gray-600'>advertisement</h1>
          </div>
        </section>



      </div>
      <div className='border-t border-b border-black py-6 border-dotted'>

      <div className='flex items-center justify-between mx-4'>
            <h1 className=' text-xl sm:text-3xl font-bold italic my-4 uppercase' >WEB STORIES</h1>
            <Link href="/WebStories">
                <h1 className='text-gray-500 font-bold  italic'>SEE ALL</h1>
            </Link>
                </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-4'>

      {webstoriesdata?.map((single, index) => {
        return (
          <div key={index} className=' '>

            <div className='mx-4'>{Story(single)}</div>


          </div>
        );
      })}
</div>
      </div>
    </div>
  )
}

export default page