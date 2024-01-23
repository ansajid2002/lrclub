"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Menu from "./Menu";
import { IoIosNotificationsOutline, IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { VscChromeClose } from "react-icons/vsc";
import MenuMobile from "./MenuMobile";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";


const NewHeader = ({data}) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const controlNavBar = () => {
    window.scrollY > 200
      ? window.scrollY > lastScrollY && !mobileMenu
        ? setShow("-translate-y-[100px]")
        : setShow("shadow-sm")
      : setShow("translate-y-0");
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavBar);
    return () => {
      window.removeEventListener("scroll", controlNavBar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={` shadow-md bg-white z-20 sticky top-0 transition-transform duration-300 ${show}`}
    >
      <div className=" px-3 sm:px-5 py-2 xl:px-20 flex items-center justify-between">
        {/* <h1 className=" tracking-wider font-bol d text-red-600 text-[14px] sm:text-lg italic uppercase" >Got a Tip?</h1>   */}
      <Link href={"/"} className="">
        
        <h1 className="font-[500] text-2xl md:text-3xl  font-greatvibes">Lazzyreaders</h1>
      </Link>

      

      <div className="flex items-center gap-2 text-black">

        <div className="w-5 md:w-8 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-gray-200/[0.5] cursor-pointer relative">
          <IoIosNotificationsOutline  className="text-[20px] md:text-[25px]" />
        </div>
        <div className="w-5 md:w-10 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-gray-200/[0.5] cursor-pointer relative">
          <IoIosSearch className="text-[20px] md:text-[25px]" />
        </div>
        {/* Mobile Icon Start */}
        <div className="w-5 md:w-10 h-8 md:h-12 rounded-full flex  justify-center items-center cursor-pointer relative -mr-2">
          {
            mobileMenu ? 
            <RxCross1
            className="text-[20px] md:text-[25px]"
            onClick={() =>{
              setMobileMenu(!mobileMenu)
            }}
            /> : 
            
            <RxHamburgerMenu
            className="text-[20px] md:text-[25px]"
            onClick={() =>{
              setMobileMenu(!mobileMenu)
            }}
            />
          }
          
        </div>
      </div>
      </div>
      <div className="border">
        {
          !mobileMenu &&
      <Menu
      showCatMenu={showCatMenu}
      setShowCatMenu={setShowCatMenu}
      setMobileMenu={setMobileMenu}
      data={data}
      />
    }

      {mobileMenu && (
        <MenuMobile
          showCatMenu={showCatMenu}
          setShowCatMenu={setShowCatMenu}
          setMobileMenu={setMobileMenu}
          data={data}
        />
      )}
      </div>
    </header>
  );
};

export default NewHeader;
