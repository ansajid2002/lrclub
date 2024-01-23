import { ADMINURL } from '@/app/page';
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export async function getLatestblogs() {
    try {
        const response = await fetch(
            `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=4&page=3`,
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

const Latestnews = async () => {

    const data = await getLatestblogs()
    return (
        <div className='p-2'>
            <h1 className='text-xl sm:text-2xl underline font-bold italic my-4' >LATEST NEWS</h1>
            {
                data?.map((single, index) => {
                    const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes
                    return (
                        <div key={index} className={` border-black border-dashed flex items-center space-x-2  border-b p-2 mb-3`}>
                            <Link href={`/Blog/${single?.id}`}>
                                <div className='max-w-[150px]'>
                                    {/* <amp-image
                                    src={imagesObject?.thumbnail?.source_url}
                                    width={150} // Specify the width of your image
                                    height={150} // Specify the height of your image
                                    alt="Your image alt text"
                                /> */}
                                    <amp-img
                                        src={imagesObject?.medium?.source_url}
                                        width={150} // Specify the width of your image
                                        height={150} // Specify the height of your image
                                        alt="Your image alt text"
                                    />
                                </div>
                                <div>
                                        <p className='font-bold text-[13px] uppercase my-1 text-red-600'>{`${single?._embedded['wp:term'][0][0].name}`}</p>
                                    <h1 className='text-[15px] line-clamp-3'>{single?.title?.rendered}</h1>
                                    <div className='flex items-center space-x-2'>
                                        {/* <h1  className='font-bold text-red-600 uppercase my-1'>{single?.category}</h1> */}
                                        <p className='font-bold text-[12px] text-gray-700 uppercase my-1'>{`By ${single?._embedded.author[0].name}`}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}

        </div>
    )
}

export default Latestnews