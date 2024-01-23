"use client"
import React, { useState, useEffect } from 'react'

import "./homepage.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';


const Trendingnews = ({ data }) => {
    const settings = {
        dots: true,
        infinite: false,
        slidesToShow: 4,
        autoplay: true, 
        pauseOnHover: true,
        speed: 500,
        autoplaySpeed: 1000,
        swipeToSlide: true,
        cssEase: "linear",
        responsive: [
            {
              breakpoint: 640, // Corrected breakpoint value
              settings: {
                slidesToShow: 1,
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
        <div className='mb-16 mt-10'>
            <h1 className=' text-xl sm:text-3xl font-bold italic my-4 uppercase' >Featured News</h1>
            

            <Slider {...settings}>

               {data?.map((single, index) => {
                    return (
                        <div   key={index} className=' '>
                          <Link href={`/Blog/${single?.id}`}>
                          
                                <div className=" mx-1.5 px-1.5 py-3 border rounded-md shadow-md flex  space-x-2">

                                    <h1 className="text-[40px] italic text-red-800  ">{`${index + 1}.`}</h1>
                                    <div className="">
                                        <h1 className='line-clamp-3'>{single?.title?.rendered}</h1>

                                        <h1 className='font-bold text-[14px] text-red-600  uppercase my-1'>{`BY ${single?._embedded.author[0].name}`}</h1>
                                    </div>
                                </div>
                         
                            </Link>
                        </div>
                    );
                })}
      </Slider>
        </div>
    )
}

export default Trendingnews