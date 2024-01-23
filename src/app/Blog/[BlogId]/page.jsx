
import React from 'react'
import Heading from './Heading';
import Content from './Content';
import { ADMINURL } from '@/app/page';
import Morefromus from './Morefromus';
import Sidecontent from './Sidecontent';
import { useAmp } from 'next/amp';
// import { useAmp } from 'next/amp';



export async function getLatestblogs() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=1&page=3`,
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




const page = async ({ params }) => {

  const blogdata = await getLatestblogs()

  // const isAmp = useAmp();

  return (
    <div>

      <Heading params={params.BlogId} />

      <section className='lg:flex lg:space-x-4 ' >
        <div className='lg:w-[70%] p-4 '>
          <Content params={params.BlogId} />
        </div>
        <Sidecontent />
      </section>
      <section>
        <Morefromus />
      </section>
    </div>
  )
}

export default page