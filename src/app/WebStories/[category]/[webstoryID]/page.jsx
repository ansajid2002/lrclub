"use client"
import React, { useEffect, useState } from 'react';

const WebStoryId = ({ params, showBanner = true }) => {
    const { category } = params;

    const [story, setStory] = useState(null);

    const fetchWebStoriesById = async () => {
        try {
            const response = await fetch(
                `https://stg.lazzyreaders.com/wp-json/web-stories/v1/web-story/400`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch web stories');
            }

            const data = await response.json();
            setStory(data);

            // Log the HTML content to the console
   

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch data for the initial page
        category && fetchWebStoriesById();
    }, [category]);

    return (
        <div>
            <h1>Hello</h1>

            {/* You can render the web story content here if needed */}
        </div>
    );
};

export default WebStoryId;
