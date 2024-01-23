
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment'; 
import { ADMINURL } from '../page';
import Fourwebstories from './Fourwebstories';
import Remainingwebstories from './Remainingwebstories';

export const Story = (story) => {
    return ( 
        <Link href={`https://stg.lazzyreaders.com/web-stories/${story?.slug}`} target='_blank'>
    <div className="flex flex-col sm:w-auto cursor-pointer shadow-md rounded-md overflow-hidden ">
        <div className='transform scale-1 hover:scale-105 transition ease-in-out duration-300 overflow-hidden'>
            <img src={`${story?.story_poster?.url}`} alt={story?.title} className="" />
        </div>
        <div className=" shadow-lg p-2  mt-2">
            {/* <h1 className='font-medium italic'>WEBSTORIES</h1> */}
            <h1 className=" text-[12px] sm:text-sm lg:text-base tracking-wide  capitalize line-clamp-2 font-semibold">{story?.title}</h1>
            <div className='flex justify-between items-center mt-1.5'>
            <p className='text-[10px] md:text-sm font-bold text-gray-400'>{moment(story?.date).format('LL')}</p>
                <Image src={'/logoLr.png'} width={30} height={30} className="rounded-full" />
            </div>
        </div>
    </div>
</Link>

    )
}

export async function getp1categorywebstores() {
    try {
        
        const urlWithCustomerId = `${ADMINURL}/wp-json/web-stories-api/v1/stories?per_page=8&category_per_page=4`;
        
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(urlWithCustomerId, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const webStoryId = await response.json();
        return webStoryId;
    } catch (error) {
        console.error('Error fetching web story ID:', error);
        return null; // Return an appropriate value in case of an error
    }
}



const WebStory = async() => {

    const ponewebstoriesdata = await getp1categorywebstores()

    return (


        <div className='max-w-[1200px] mx-auto'>
            <Fourwebstories data={ponewebstoriesdata} />
            <Remainingwebstories/>
            </div>
     
    );
};

export default WebStory;
