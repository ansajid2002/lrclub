import Link from 'next/link'
import React from 'react'

const Mostpopular = ({ data }) => {
    return (
        <div>
            <h1 className=' text-xl sm:text-3xl italic font-bold'>MOST POPULAR</h1>
            <div className='my-5'>
                {
                    data?.map((single, index) => {
                        return (
                            <Link href={`/Blog/${single?.id}`}>
                                <div key={index} className={`pb-2 pt-2  mb-1  pr-3 flex  space-x-4 ${index !== 0 && "border-t"} `}>

                                    <h1 className="text-[40px] italic  ">{`${index + 1}.`}</h1>
                                    <div className="">
                                        <h1 className='font-bold text-red-600 uppercase text-sm italic tracking-wider'>{`${single?._embedded['wp:term'][0][0].name}`}</h1>
                                        <h1 className=' text-base lg:text-xl line-clamp-3'>{single?.title?.rendered}</h1>

                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Mostpopular