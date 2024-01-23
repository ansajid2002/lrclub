
import Link from "next/link";
import React from "react";


const Menu = ({ showCatMenu, setShowCatMenu, data }) => {

  return (
    <>
      <ul className=" bg-red-600 font-bold tracking-wider text-white hidden lg:flex items-center justify-center gap-1  text-sm ">
        <Link href={"/WebStories"}>
          <li className="cursor-pointer hover:bg-red-200 px-3 transition-all ease-in-out py-2 rounded-full">
            Visual Stories
          </li>
        </Link>
        {data.map((item) => {
          return (
            <React.Fragment key={item.id}>

              <Link href={`/Category/${item.id}`}>
                <li className="cursor-pointer hover:bg-red-200 px-3 transition-all ease-in-out py-2 rounded-full">
                  {item.name}
                </li>
              </Link>
            </React.Fragment>
          );
        })}
        <Link href={"/Advertisment"}>
          <li className="cursor-pointer hover:bg-red-200 px-3 transition-all ease-in-out py-2 rounded-full">
            Advertise With Us
          </li>
        </Link>
      </ul>
    </>
  );
};

export default Menu;
