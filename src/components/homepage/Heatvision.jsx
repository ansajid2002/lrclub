import React from 'react'
import Image from 'next/image'
import moment from 'moment';

import { TbArrowBigRightLineFilled } from 'react-icons/tb'
import Link from 'next/link';

const Heatvision = ({ data }) => {

    return (
        <div className='md:flex mb-10 '>
            {
                data?.map((single, index) => {
                    const imagesObject = single.firstData?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
                  
                  
                    return (
                        <div className={`  text-center  ${index === 0 ? "md:border-r border-black border-3 px-4" : "px-4"}`} >
                            <h1 className={` text-3xl mt-6 md:text-4xl tracking-wider mb-0 font-bold ${index === 0 ? "text-[rgb(100,66,172)]" : "text-[rgb(0,128,0)]"} `} >{single.name}</h1>
                            <p className='italic text-base mb-3' >Random subtitle to be implemented afterwards</p>

                            <div className='   '>
                             <Link href={`/Blog/${single.firstData.id}`}>

                                <div>

                                    <div className='  border-b border-dashed border-gray-600 pb-2' >
                                        <div className={`border border-black ${index === 0 ? "hover:bg-[rgb(100,66,172)]" : "hover:bg-[rgb(0,128,0)]"} `}>
                                            <div className='border border-black m-1.5'>
                                                <Image
                                                    src={imagesObject?.large?.source_url}
                                                    width={600}
                                                    height={315}
                                                    alt="Your image alt text"
                                                />
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <p className={` text-sm font-bold  ${index === 0 ? "text-[rgb(100,66,172)]" : "text-[rgb(0,128,0)]"} py-1 mt-1.5`}>{moment(single.firstData?.date).format('DD-MM-yyyy')}</p>
                                            <h1 className=' px-1 text-xl  md:text-2xl font-medium py-1 line-clamp-4'>{single.firstData?.title?.rendered}</h1>

                                            <p className=' text-gray-800 my-1'>{`d${single.firstData?.excerpt?.rendered}`}</p>

                                        </div>
                                    </div>
                                </div>
                                </Link>
                                <div className=' '>
                                    {
                                        single?.data?.map((single, i) => {
                                            return (
                                                <div className='text-center border-b border-gray-600 border-dashed mt-4 mb-2 pb-4' key={i} style={{ marginRight: '10px' }}>
                                                       <Link href={`/Blog/${single?.id}`}>
                                                    <div>
                                                        <p className={`text-sm mt-2  font-bold ${index === 0 ? "text-[rgb(100,66,172)]" : "text-[rgb(0,128,0)]"} `}>{moment(single?.date).format('DD-MM-yyyy')}</p>
                                                        <h1 className='line-clamp-3 text-xl md:text-2xl font-medium py-1'>{single?.title?.rendered}</h1>
                                                    </div>
                                                    </Link>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <div className='group flex items-center justify-center space-x-2 cursor-pointer'>
                                    <h1 className='font-medium hover:font-bold text-lg'>VIEW ALL</h1>
                                    <TbArrowBigRightLineFilled size="25px" className={` group-hover:text-red-600 ${index === 0 ? "text-[rgb(100,66,172)]" : "text-[rgb(0,128,0)]"}`} />
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Heatvision