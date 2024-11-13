import React, { useState } from 'react'
import Navbar from '../partials/Navbar'
import Topbar from '../partials/Topbar'

function Gallery() {
    const [data, setData] = useState([
        { src: "/public/img1.jpg", alt: "Image 1" },
        { src: "/public/img2.jpg", alt: "Image 2" },
        { src: "/public/img3.jpg", alt: "Image 3" },
        { src: "/public/img4.jpg", alt: "Image 4" },
        { src: "/public/img5.jpg", alt: "Image 5" },
        { src: "/public/img6.jpg", alt: "Image 6" },
    ])

  return (
    <div className='h-screen '>
        <Topbar/>
        <Navbar/>
        <h1 className='text-white text-3xl font-black uppercase text-center mb-10'>Gallery</h1>
        <div className='flex items-center justify-center md:gap-20 gap-10 flex-wrap'>
            {data.map((item, index)=>(
                <div key={index} className='w-[400px] h-[300px] bg-[#1D1D1D] p-4 flex flex-col  gap-[14px] relative rounded-lg border-4 border-[#282828] '>
                    <img src={item.src} alt={item.alt} className='w-full h-full object-cover' />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Gallery