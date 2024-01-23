import { AdminUrl } from '@/app/layout';
import { NextResponse } from 'next/server';

async function fetchWebStoryId(category, page) {
    try {
        if (!category) {
            console.error('Customer ID is missing');
            return null; // Return an appropriate value when customer ID is missing
        }

        const urlWithCustomerId = `${AdminUrl}/wp-json/web-stories-api/v1/stories?category_id=${category}&per_page=4&page=${page}`;
        
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

export async function GET(request, { params }) {
    const { category_id, page } = params;

    const webStoryId = await fetchWebStoryId(category_id, page);

    return NextResponse.json({ webStoryId });
}
