import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { TbArrowBigRightLineFilled } from 'react-icons/tb'

const Latestnews = ({ data }) => {
    return (
        <div>
            <h1 className='text-xl sm:text-3xl font-bold italic my-4' >LATEST NEWS</h1>
            
            <div>
                {
                    data?.map((single, index) => {
                        const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes

                        return (
                            <div key={index} className=' border-b pb-3 mb-3'>
                                <div className='lg:hidden'>
                                    <Image
                                        src={imagesObject?.medium?.source_url}
                                        width={185} // Specify the width of your image
                                        height={105} // Specify the height of your image
                                        alt="Your image alt text"
                                    />
                                </div>
                                <div className='flex items-center space-x-2'>
                                    {/* <h1  className='font-bold text-red-600 uppercase my-1'>{single?.category}</h1> */}
                                    <p className='font-bold tracking-wide text-[12px] uppercase my-1 text-red-600'>{`${single?._embedded['wp:term'][0][0].name}`}</p>
                                    <p className='font-bold text-[12px] text-gray-700 uppercase my-1'>{moment(single?.date).format('  h:mm A')}</p>
                                </div>
                                <h1 className='text-base'>{single?.title?.rendered}</h1>
                            </div>
                        )
                    })
                }
                <div className=' flex space-x-2 items-center justify-center  cursor-pointer mt-5 bg-gradient-to-r from-red-400 via-red-600 to-red-400  hover:bg-white hover:text-gray-900 text-white px-1.5 border hover:border-gray-400 py-1  rounded-md font-bold '>
                    <h1 className=' ' >SHOW MORE</h1>
                    <TbArrowBigRightLineFilled size="20px" />
                    
                        </div>
            </div>
        </div>
    )
}

export default Latestnews