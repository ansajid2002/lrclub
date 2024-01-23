"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const MenuItem = ({ item, setMobileMenu }) => {
  const [showCatMenu, setShowCatMenu] = useState(false);

  
    return (
      <li className="py-4 px-5 border-b">
        <Link href={item?.url || "#"}
           onClick={() => setMobileMenu(false)}>{item.name}
        </Link>
      </li>
    );
  }


const MenuMobile = ({ data, setMobileMenu }) => {
  return (
    <div className="h-[100vh]  overflow-hidden shadow-md">
    <ul className="flex flex-col md:hidden font-bold absolute top-[80px] left-0 w-full overflow-hidden bg-white border-t text-black">
    <li className="cursor-pointer hover:bg-red-200 px-3 transition-all ease-in-out py-2 rounded-full">
          <Link href={"/WebStories"}  onClick={() => setMobileMenu(false)}>Visual Stories</Link>
        </li> 
      {data.map((item) => (
        <MenuItem key={item.id} item={item} setMobileMenu={setMobileMenu} />
      ))}
      <li className="cursor-pointer hover:bg-red-200 px-3 transition-all ease-in-out py-2 rounded-full">
          <Link href={"/Advertisment"}  onClick={() => setMobileMenu(false)}>Advertise</Link>
        </li> 
    </ul>
  </div>
  
  );
};

export default MenuMobile;
