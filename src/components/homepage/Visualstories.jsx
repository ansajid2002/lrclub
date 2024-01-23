"use client"
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
// import Slider from 'react-slick';

// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


export const Story = (story) => {
    return ( 
        <Link href={`https://stg.lazzyreaders.com/web-stories/${story?.stories[0]?.slug}`} target='_blank'>
    <div className="flex flex-col sm:w-auto cursor-pointer shadow-md rounded-md overflow-hidden border ">
        <div className='transform scale-1 hover:scale-105 transition ease-in-out duration-150'>
            <img src={`${story?.stories[0]?.story_poster?.url}`} alt={story?.stories[0]?.title} className="" />
        </div>
        <div className=" shadow-lg p-2  mt-4">
            {/* <h1 className='font-medium italic'>WEBSTORIES</h1> */}
            <h1 className=" text-base tracking-wide mt-1 mb-1 capitalize line-clamp-2 font-semibold">{story?.stories[0]?.title}</h1>
            <div className='flex justify-between items-center mt-1.5'>
            <p className=' text-[11px] sm:text-sm font-bold text-gray-500'>{moment(story?.stories[0]?.date).format('LL')}</p>
                <Image src={'/logoLr.png'} width={30} height={30} className="rounded-full" />
            </div>
        </div>
    </div>
</Link>

    )
}


const Visualstories = ({ data }) => {

    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        autoplay: false, 
        pauseOnHover: true,
        speed: 200,
        autoplaySpeed: 1000,
        swipeToSlide: true,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 640, // Corrected breakpoint value
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 1536,
              settings: {
                slidesToShow: 4,
              }
            },
            {
              breakpoint: 9999,
              settings: {
                slidesToShow: 4,
              }
            },
            // Add more breakpoints and settings as needed
          ]
      };
      
    return (
        <div className=''>
            <div className='flex items-center justify-between mx-4'>
            <h1 className=' text-xl sm:text-3xl font-bold italic my-4 uppercase' >WEB STORIES</h1>
            <Link href="/WebStories">
                <h1 className='text-gray-500 font-bold  italic'>SEE ALL</h1>
            </Link>
                </div>
            <div className=''>

                <Slider {...settings}>

                    {data?.map((single, index) => {
                        return (
                            <div key={index} className=' '>

                                <div className=' mx-1 md:mx-4'>{Story(single)}</div>


                            </div>
                        );
                    })}
                    {data?.map((single, index) => {
                        return (
                            <div key={index} className=' '>

                                <div className='mx-4'>{Story(single)}</div>


                            </div>
                        );
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default Visualstories
