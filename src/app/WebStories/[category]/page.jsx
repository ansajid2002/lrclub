"use client"
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { Story } from '../page';
import { ADMINURL } from '@/app/page';

const CategoryWebStory = ({ params, showBanner = true }) => {
    const { category } = params;
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!data) {
                try {
                    const response = await fetch(
                        `${ADMINURL}wp-json/web-stories-api/v1/stories?category_name=${params.category}&per_page=8&page=${page}`,
                        { next: { revalidate: 30 } }
                    );

                    if (!response.ok) {
                        throw new Error(`Failed to fetch latest data: ${response.status}`);
                    }

                    const newWebStoryData = await response.json();

                    if (newWebStoryData?.length === 0) {
                        setHasMore(false);
                    } else {
                        setData( newWebStoryData[1]);
                    }
                } catch (error) {
                    console.error("Error fetching latest data:", error);
                    // Handle error if needed
                }
            }
        };

        fetchData();
    }, [data, params.category, page]); // Add dependencies

    
    const fetchStoriesByCatName = async () => {
      
        try {
            const response = await fetch(
                `${ADMINURL}wp-json/web-stories-api/v1/stories?category_name=${params.category}&per_page=8&page=${page}`,
                { next: { revalidate: 30 } }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch latest data: ${response.status}`);
            }

            const newWebStoryData = await response.json();

            if (newWebStoryData?.length === 0) {
                setHasMore(false);
            } else {
                setData(prevData => (prevData ? [...prevData, ...newWebStoryData[1]] : newWebStoryData[1]));
            }
        } catch (error) {
            console.error("Error fetching latest data:", error);
            throw error;
        }
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
        if(page !== 1) {
            fetchStoriesByCatName();
        }
    };
    return (
        <div className="flex flex-col items-center border-b border-black border-dashed pb-10  mb-4">
        <h1 className='text-4xl my-6 uppercase font-bold' >{params?.category}</h1>

        {
            data ? 
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4'>
            { data.map(single => (
                <div key={single.id} className='m-2'>
                    {Story(single)}
                </div>
            ))}
        </div> : 
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4'>
        { [1,2,3,4,5,6,7,8].map(single => (
            <div key={single} className='m-2'>
                <div className='h-[180px] w-[135px] sm:h-[300px] sm:w-[225px] lg:h-[300px] lg:w-[225px] xl:h-[350px] xl:w-[263px]  bg-gray-100 animate-pulse'>
                    </div>
            </div>
        ))}
    </div>
        }
        {hasMore && (
            <button
                className='bg-red-600 hover:bg-red-400 text-white hover:text-gray-200 mx-2 w-[150px] mt-6 text-center px-2 py-1 tracking-wider text-xl font-bold rounded-sm '
                onClick={() => handleLoadMore()}
            >
                LOAD MORE
            </button>
        )}
    </div>
    );
};

export default CategoryWebStory;
