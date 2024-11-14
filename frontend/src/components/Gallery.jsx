import React, { useEffect, useState } from 'react'
import Navbar from '../partials/Navbar'
import Topbar from '../partials/Topbar'
import axios from 'axios';

function Gallery() {
    const [data, setData] = useState([
        { src: "/img1.jpg", alt: "Image 1" },
        { src: "/img2.jpg", alt: "Image 2" },
        { src: "/img3.jpg", alt: "Image 3" },
        { src: "/img4.jpg", alt: "Image 4" },
        { src: "/img5.jpg", alt: "Image 5" },
        { src: "/img6.jpg", alt: "Image 6" },
    ])
    const [gallery, setGallery] = useState([]);
    const fetchData = async ()=>{
        const data = await axios.get(`http://localhost:3000/show`);
        console.log(data);
        setGallery(data.data.map(item=>item.image));
    }
    useEffect(()=>{
        fetchData();
    },[]);
  return (
    <div className='h-screen '>
        <Topbar/>
        <Navbar/>
        <h1 className='text-white text-3xl font-black uppercase text-center mb-10'>Gallery</h1>
        <div className='flex items-center justify-center md:gap-20 gap-10 flex-wrap'>
            {gallery.map((item, index)=>(
                console.log(item),
                <div key={index} className='w-[400px] h-[300px] bg-[#1D1D1D] p-4 flex flex-col  gap-[14px] relative rounded-lg border-4 border-[#282828] '>
                    <img src={`http://localhost:3000/uploads/${item}`} alt={item.alt} className='w-full h-full object-cover' />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Gallery