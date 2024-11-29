import React, { useEffect, useState } from 'react'
import Navbar from '../partials/Navbar'
import Topbar from '../partials/Topbar'
import axios from 'axios';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../../public/loader.json';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [data, setData] = useState([
        { image: `/img1.jpg`, alt: "Service 1" },
        { image: `/img2.jpg`, alt: "Service 2" },
        { image: `/img3.jpg`, alt: "Service 3" },
        { image: `/img4.jpg`, alt: "Service 4" },
        { image: `/img5.jpg`, alt: "Service 5" },
        { image: `/img6.jpg`, alt: "Service 6" },
    ]);
    const navigate = useNavigate();
    const fetchData = async ()=>{
        setIsLoading(true);
        try {
            const data = await axios.get(`https://shree-jay-farnichar.onrender.com/gallery/${page}/${limit}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            if (data.data.length > 0) {
                setGallery(prevState => [...prevState, ...data.data]);
                setPage(page + 1);
            } else {
                setHasMore(false);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching gallery: ", error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        fetchData();
    },[page, limit]);
  return (
   
    <div className='h-screen '>
        <Topbar/>
        <Navbar/>
        <h1 className='text-white text-3xl font-black uppercase text-center mb-10'>Gallery</h1>
        <InfiniteScroll
        dataLength={gallery.length}
        next={fetchData}
        hasMore={hasMore}
        loader={isLoading && <h4>Loading...</h4>}
        >
        <div className='flex items-center justify-center md:gap-20 gap-10 flex-wrap'>
            {data.map((item, index)=>(
                <div key={index} className='w-[400px] h-[300px] bg-[#1D1D1D] p-4 flex flex-col  gap-[14px] relative rounded-lg border-4 border-[#282828] '>
                    {
                        item.image && (
                            <img src={item.image} alt={item.alt} className='w-full h-full object-cover' />
                        )
                    }
                    {
                        item.video && (
                            <video src={item.video} controls className='w-full h-full object-cover' />
                        )
                    }
                </div>
            ))}
        </div>
        </InfiniteScroll>
    </div>
  )
}

export default Gallery