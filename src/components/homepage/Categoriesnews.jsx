// import React from 'react'
// import Image from 'next/image'
// import { TbArrowBigRightLineFilled } from "react-icons/tb";
// import Categoryfeed from './categoryfeed/Categoryfeed';
// import Categoryfeedtwothree from './categoryfeed/Categoryfeedtwothree';
// import Categoryfeedfour from './categoryfeed/Categoryfeedfour';




// const Categoriesnews = ({data}) => {


//   return (
//     <div className=''>
//         {
//             data?.map((single,index) => {
//                 return (
//                     <div key={index} className='my-10 border-t  border-gray-400'>
//                         <div className='flex  items-center justify-between mx-2 sm:mx-4'>
//                         <h1 className=' text-xl sm:text-3xl uppercase font-medium italic my-4'>{single.name}</h1>
//                         <h1 className='text-base italic text-gray-600 cursor-pointer hover:text-gray-400 tracking-wider font-bold hidden md:block '>SEE ALL</h1>
//                             </div>
//                             {
//                                 index === 0 &&
//                     <Categoryfeed categoryInfo = {single}/>
//                             }
//                             {
//                                 index===1 || index===2  &&
                                
//                     <Categoryfeedtwothree categoryInfo={single} />
//                             }
                            
//                             {index===3 && 
//                     <Categoryfeedfour categoryInfo={single} />
                        
//                             }
//                     <div className='flex space-x-2 items-center justify-center md:hidden cursor-pointer mt-2 bg-gradient-to-r from-red-200 via-red-600 to-red-200 hover:bg-gradient-to-r hover:from-white hover:via-red-400 hover:to-white hover:text-gray-900 text-white px-1.5 border hover:border-gray-400 py-1 rounded-md font-bold'>
//                     <h1 className=' ' >SHOW MORE</h1>
//                     <TbArrowBigRightLineFilled size="20px" />
                    
//                         </div>
//                         </div>
//                 )
//             })
//         }
//     </div>
//   )
// }

// export default Categoriesnews

