import React, { useEffect, useState } from 'react'
import Navbar from '../partials/Navbar'
import Topbar from '../partials/Topbar'
import axios from 'axios';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '/loader.json';
function Gallery() {
    const [isLoading, setIsLoading] = useState(false);
    const [gallery, setGallery] = useState([]);
    const fetchData = async ()=>{
        const data = await axios.get(`https://shree-jay-farnichar.onrender.com/gallery`);
        console.log(data);
        setGallery(data.data.map(item=>item.image));
        if(data.data.length>0){
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
    },[]);
  return (
    gallery.length>0 ? <div className='h-screen flex justify-center items-center'><Lottie animationData={groovyWalkAnimation} /></div> :
    <div className='h-screen '>
        <Topbar/>
        <Navbar/>
        <h1 className='text-white text-3xl font-black uppercase text-center mb-10'>Gallery</h1>
        <div className='flex items-center justify-center md:gap-20 gap-10 flex-wrap'>
            {gallery.map((item, index)=>(
                console.log(item),
                <div key={index} className='w-[400px] h-[300px] bg-[#1D1D1D] p-4 flex flex-col  gap-[14px] relative rounded-lg border-4 border-[#282828] '>
                    <img src={`https://shree-jay-farnichar.onrender.com/uploads/${item}`} alt={item.alt} className='w-full h-full object-cover' />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Gallery