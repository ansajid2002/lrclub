"use client"
import React, { useState } from 'react'
import { Story } from './page'
import { ADMINURL } from '../page'
import Link from 'next/link'


const Remainingwebstories = () => {
    const [page, setPage] = useState(2)
    const [data, setData] = useState(null)
    const [hasMore, setHasMore] = useState(true)

    async function getp1categorywebstores() {
        try {
            const urlWithCustomerId = `${ADMINURL}/wp-json/web-stories-api/v1/stories?per_page=8&category_per_page=4&page=${page}`;

            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(urlWithCustomerId, requestOptions);

            if (!response.ok) {
                // setHasMore(false);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const newWebStoryData = await response.json();
            if (newWebStoryData?.length === 0) {
                setHasMore(false)
            }
            else {
                // Check if prevData is present, then append, else set newWebStoryData as initial data
                setData(prevData => prevData ? [...prevData, ...newWebStoryData] : newWebStoryData);

            }

        } catch (error) {
            console.error('Error fetching web story ID:', error);
            // Return an appropriate value in case of an error
            return null;
        }
    }

    return (
        <div>
            <div>
                {
                    data ?
                        <div>
                            {
                                data?.map((s) => {
                                    return (
                                        <div className='my-12'>
                                            <div className='flex items-center justify-between px-4 border-b mb-4 shadow-md my-3 '>
                                                <h1 className='text-lg md:text-2xl font-semibold py-2  uppercase tracking-wide'>{s?.category?.name}</h1>
                                                <Link href={`/WebStories/${s?.category?.slug}`}>
                                                    <p className='text-base cursor-pointer hover:text-gray-700 tracking-wider font-bold '>SEE ALL</p>
                                                </Link>
                                            </div>
                                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4'>
                                                {
                                                    s?.stories?.map((single) => {
                                                        return (
                                                            <div className='m-2'>{Story(single)}</div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <></>
                }
            </div>
            {
                hasMore &&
                <button
                    className='bg-red-600 hover:bg-red-400 text-white hover:text-gray-200 mx-2 w-[150px] text-center px-2 py-1 tracking-wider text-base md:text-xl font-bold rounded-sm italic'
                    onClick={() => {
   
                        getp1categorywebstores()
                        setPage((prev) => prev + 1)
                    }}>LOAD MORE</button>
            }

        </div>
    )
}

export default Remainingwebstories