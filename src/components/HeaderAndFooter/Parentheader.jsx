import React from 'react'
import NewHeader from './NewHeader';
import { ADMINURL } from '@/app/page';



export async function getAllCategories() {
    try {
      const response = await fetch(
        `${ADMINURL}/wp-json/wp/v2/categories`,
        { next: { revalidate: 30 } }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch latest data: ${response.status}`);
      }
      const allCategories = await response.json();
      return allCategories.slice(0,8);
    } catch (error) {
      console.error("Error fetching latest data:", error);
      throw error; // Re-throw the error to handle it at a higher level if needed
    }
  }

  

const Parentheader = async() => {
    const allcategories = await getAllCategories()
  return (
    <div><NewHeader data = {allcategories}/></div>
  )
}

export default Parentheader