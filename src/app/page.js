import Categoriesnews from "@/components/homepage/Categoriesnews";
import Heatvision from "@/components/homepage/Heatvision";
import Latestnews from "@/components/homepage/Latestnews";
import Mostpopular from "@/components/homepage/Mostpopular";
import Topnews from "@/components/homepage/Topnews";
import Topstory from "@/components/homepage/Topstory";
import Trendingnews from "@/components/homepage/Trendingnews";
import Visualstories from "@/components/homepage/Visualstories";
import Youmayalsolike from "@/components/homepage/Youmayalsolike";
import Categoryfour from "@/components/homepage/categoryfeed/Categoryfour";
import Categoryone from "@/components/homepage/categoryfeed/Categoryone";
import Categorytwo from "@/components/homepage/categoryfeed/Categorytwo";
import Mustread from "./Blog/[BlogId]/Mustread";


export const ADMINURL = "https://stg.lazzyreaders.com/"

export async function getThreeCategoriesAndPosts() {
  try {
    // First API call to fetch three categories
    const responseCategories = await fetch(
      `${ADMINURL}/wp-json/wp/v2/categories?page=1&per_page=3`,
      { next: { revalidate: 30 } }
    );

    if (!responseCategories.ok) {
      throw new Error(`Failed to fetch categories: ${responseCategories.status}`);
    }

    const categoriesData = await responseCategories.json();
    const categoryIds = categoriesData.map((category) => category.id);
    // Array to store promises of fetching posts for each category
    const postPromises = categoryIds.map(async (categoryId) => {
      const secondApiUrl = `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=1&page=1&categories=${categoryId}`;

      // Second API call to fetch posts based on the current category ID
      const responsePosts = await fetch(secondApiUrl);

      if (!responsePosts.ok) {
        throw new Error(`Failed to fetch posts for category ${categoryId}: ${responsePosts.status}`);
      }

      return responsePosts.json();
    });

    // Wait for all promises to resolve
    const postsDataArray = await Promise.all(postPromises);

    // Return an array containing both categories and posts data
    return  postsDataArray.flat()
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

export async function getfourCategoriesAndPosts() {
  try {
    // First API call to fetch four categories
    const responseCategories = await fetch(
      `${ADMINURL}/wp-json/wp/v2/categories?page=1&per_page=4`,
      { next: { revalidate: 30 } }
    );

    if (!responseCategories.ok) {
      throw new Error(`Failed to fetch categories: ${responseCategories.status}`);
    }

    const categoriesData = await responseCategories.json();
    const categoryIds = categoriesData.map((category) => ({ name: category.name, id: category.id }));
    

    // Array to store promises of fetching posts for each category
    const postPromises = categoryIds.map(async (categoryId) => {
      const secondApiUrl = `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=5&page=1&categories=${categoryId.id}`;

      // Second API call to fetch posts based on the current category ID
      const responsePosts = await fetch(secondApiUrl);

      if (!responsePosts.ok) {
        throw new Error(`Failed to fetch posts for category ${categoryId.id}: ${responsePosts.status}`);
      }

      const sectionData = await responsePosts.json(); // await the JSON conversion
      return {
        name: categoryId.name,
        firstData: sectionData[0],  // first element
        data: sectionData.slice(1), // array of elements starting from index 1
      };
    });



// Wait for all promises to resolve
    const postsDataArray = await Promise.all(postPromises);

    // Return an array containing both categories and posts data
    return postsDataArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

//////for category section///////////////////////////////////

export async function getCategoryone() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=5&page=1&categories=1`,
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
export async function getCategorytwo() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=5&page=1&categories=15`,
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
export async function getCategorythree() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=5&page=1&categories=18`,
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
export async function getCategoryfour() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=4&page=1&categories=20`,
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




//////for category section///////////////////////////////////



export async function getLatestblogs() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=20&page=1`,
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

export async function getTopStory() {
  try {
    const response = await fetch(
      // `${ADMINURL}/wp-json/wp/v2/posts?_embed&per_page=1&page=1`, this is not having image
      // `${ADMINURL}/wp-json/wp/v2/posts?_embed&per_page=1&page=2`,
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=5&page=1&categories=20`,

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

export async function getfeaturedblogs() {
  try {
    const response = await fetch(
      `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=9&page=1&categories=21`,
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
export async function getheatnews() {
  try {
    // First API call to fetch four categories
    const responseCategories = await fetch(
      `${ADMINURL}/wp-json/wp/v2/categories?page=1&per_page=2`,
      { next: { revalidate: 30 } }
    );

    if (!responseCategories.ok) {
      throw new Error(`Failed to fetch categories: ${responseCategories.status}`);
    }

    const categoriesData = await responseCategories.json();
    const categoryIds = categoriesData.map((category) => ({ name: category.name, id: category.id }));

    // Array to store promises of fetching posts for each category
    const postPromises = categoryIds.map(async (categoryId) => {
      const secondApiUrl = `${ADMINURL}/wp-json/wp/v2/posts?_embed&order=desc&orderby=date&per_page=3&page=2&categories=${categoryId.id}`;

      // Second API call to fetch posts based on the current category ID
      const responsePosts = await fetch(secondApiUrl);

      if (!responsePosts.ok) {
        throw new Error(`Failed to fetch posts for category ${categoryId.id}: ${responsePosts.status}`);
      }

      const sectionData = await responsePosts.json(); // await the JSON conversion
      return {
        name: categoryId.name,
        firstData: sectionData[0],  // first element
        data: sectionData.slice(1), // array of elements starting from index 1
      };
    });

    // Wait for all promises to resolve
    const postsDataArray = await Promise.all(postPromises);

    // Return an array containing both categories and posts data
    return postsDataArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it at a higher level if needed
  }
}

const fetchWebStories = async () => {
  try {
    const response = await fetch(`${ADMINURL}/wp-json/web-stories-api/v1/stories?per_page=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData
    
  } catch (error) {
    console.error("Error processing request:", error);
   
  }
};






export default async function Home() {

  const topstory = await getTopStory()
  const latestblogs = await getLatestblogs()
  const threecategories = await getThreeCategoriesAndPosts()

  const featuredblogs = await getfeaturedblogs()
  // const categoriessection = await getfourCategoriesAndPosts()
  const categoryone = await getCategoryone()
  const categorytwo = await getCategorytwo()
  const categoryfour = await getCategoryfour()
  const heatnews = await getheatnews()

  const webstoriesData = await fetchWebStories()
 
  
  
  return (
    <div className="m-2">
    <div className="block md:flex">
  <section className="md:w-70% md:max-w-[70%] m-2 md:m-10">
   <Topstory data= {topstory}/>
   <Topnews data={threecategories}/>
   <Heatvision data={heatnews}/>
   </section>
   
  <aside className=" m-2 md:w-30%">
    <Latestnews data={latestblogs}/>
  </aside>
   </div>
   <Trendingnews data={featuredblogs}/>
   <Visualstories data={webstoriesData}/>
   <div className="block lg:flex border-b border-black my-12 lg:space-x-10 pb-6 mb-4  " >
    <section className="lg:w-70% lg:max-w-[70%] m-2  lg:pt-4 ">
      {/* <h1 className="text-[50px] font-bold mb-2">Reviews</h1> */}
      <div className="md:flex md:space-x-5"> 
        <Categoryone data={categoryone}/>
        <Categorytwo data={categorytwo}/>
        </div>
    </section>
    <aside className=" m-2 l md:w-30%">
    <Mustread  />
    </aside>
   </div>
   <h1>BANNER ADD</h1>
   <div className="block md:flex border-b border-black  mb-4">
    <section  className="md:w-70% md:max-w-[70%] m-2  ">
   <Categoryfour data={categoryfour}/>

    </section>
    <aside className=" m-2 md:w-30%">

    </aside>
   </div>
   {/* <Categoriesnews data={categoriessection} /> */}
   
      </div>
  );
}