
import React from 'react'
import { Story } from './page'
import Link from 'next/link'

const Fourwebstories = ({data}) => {
  
  return (
    <div>
        
        {
            data?.map((s) => {
    
                return (
                    <div className='my-12'>
                        <div className='flex items-center justify-between px-4 border-b mb-4 shadow-md my-3 '>
                        <h1 className='text-lg md:text-2xl font-semibold py-2  uppercase tracking-wide'>{s?.category?.name}</h1>
                        <Link href={`/WebStories/${s?.category?.slug}`}>
                        <p className='text-base cursor-pointer hover:text-gray-700 tracking-wider font-bold '>SEE ALL</p>
                        </Link>
                            </div>
                            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4'>
                                {
                                    s?.stories?.map((single) => {
                                        return (
                                            <div className='m-2'>{Story(single)}</div>
                                        )
                                    })
                                }
                                </div>
                        </div>
                )
            })
        }
    </div>
  )
}

export default Fourwebstories