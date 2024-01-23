"use client";

import { ADMINURL } from '@/app/page';
import AmpImage from '@/components/homepage/AmpImage';
import Image from 'next/image';
import { useAmp } from 'next/amp'; // Import useAmp hook
import React, { useEffect, useState } from 'react';

const Content = ({ params }) => {
    const isAmp = useAmp(); // Check if the page is rendered as AMP

    const [data, setData] = useState(null);
    const [related, setRelated] = useState(null);

    async function getLatestblogs() {
        try {
            const response = await fetch(
                `${ADMINURL}/wp-json/wp/v2/posts/${Number(params)}?_embed`,
                { next: { revalidate: 30 } }
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch latest data: ${response.status}`);
            }
            const latestblogs = await response.json();
            setData(latestblogs);
        } catch (error) {
            console.error("Error fetching latest data:", error);
            throw error;
        }
    }

    async function getRelated() {
        try {
            const response = await fetch(
                `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=2&page=3`,
                { next: { revalidate: 30 } }
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch latest data: ${response.status}`);
            }
            const latestblogs = await response.json();
            setRelated(latestblogs);
        } catch (error) {
            console.error("Error fetching latest data:", error);
            throw error;
        }
    }

    useEffect(() => {
        if (!data) {
            getLatestblogs();
        }
        if (data && !related) {
            getRelated();
        }
    }, [data, related]);

    const imagesObject = data?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;

    const renderContent = () => {
        const paragraphs = data?.content?.rendered.split('</p>');

        return paragraphs?.map((paragraph, index) => (
            <React.Fragment key={index}>
                <div suppressHydrationWarning={true} className="text-lg">
                    <div dangerouslySetInnerHTML={{ __html: paragraph }} />

                    {index === 1 && isAmp && (
                        <div className='h-[300px] bg-gray-100 border text-gray-600 flex justify-center my-2'>
                            <h1>Advertisement</h1>
                        </div>
                    )}

                    {index === 3 && isAmp && (
                        <>
                            <div className='h-[300px] bg-gray-100 border text-gray-600 flex justify-center my-2'>
                                <h1>Advertisement 2</h1>
                            </div>
                            <div className='border-t border-b border-black my-4 py-4'>
                                <h1 className='text-xl sm:text-2xl underline font-bold italic p-2'>MUST READ</h1>
                                <div className='flex'>
                                    {related?.map((single, index) => {
                                        const imagesObject = single?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes;
                                        return (
                                            <div key={index} className=' flex space-x-3 border-b p-4 mb-3 shadow-lg'>
                                                <div className=''>
                                                    {isAmp ? (
                                                        <AmpImage
                                                            src={imagesObject?.medium?.source_url}
                                                            alt="Your image alt text"
                                                            width={280}
                                                            height={105}
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={imagesObject?.medium?.source_url}
                                                            width={280}
                                                            height={105}
                                                            alt="Your image alt text"
                                                        />
                                                    )}
                                                </div>
                                                <div className=''>
                                                    <p className='font-bold text-[13px] uppercase text-red-600'>{`${single?._embedded['wp:term'][0][0].name}`}</p>
                                                    <h1 className='text-base'>{single?.title?.rendered}</h1>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {index === 7 && isAmp && (
                        <div className='h-[300px] bg-gray-100 border text-gray-600 flex justify-center my-2'>
                            <h1>Advertisement 3</h1>
                        </div>
                    )}

                    {index === 12 && isAmp && (
                        <div className='h-[300px] bg-gray-100 border text-gray-600 flex justify-center my-2'>
                            <h1>Advertisement 4</h1>
                        </div>
                    )}
                </div>
                <div key={`blank-${index}`} className="mb-4"></div>
            </React.Fragment>
        ));
    };

    return (
        <div>
            <div>
                <div>
                    {isAmp ? (
                        <AmpImage
                            src={imagesObject?.medium_large?.source_url}
                            alt="Description of the image"
                            width={600}
                            height={400}
                        />
                    ) : (
                        <Image
                            src={imagesObject?.medium_large?.source_url}
                            alt="Description of the image"
                            width={768}
                            height={512}
                        />
                    )}
                </div>

                {(
                    <div className='text-sm font-medium flex items-center space-x-3 mt-1 mb-3'>
                        <div dangerouslySetInnerHTML={{ __html: data?._embedded?.['wp:featuredmedia']?.[0]?.caption?.rendered }} />
                        <div className='text-gray-600 font-light uppercase' dangerouslySetInnerHTML={{ __html: data?._embedded?.['wp:featuredmedia']?.[0]?.title?.rendered }} />
                    </div>
                )}
            </div>

            {renderContent()}
        </div>
    );
};

export default Content;
