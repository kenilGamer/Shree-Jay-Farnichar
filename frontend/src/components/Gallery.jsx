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
    const [data, setData] = useState([]);
    const REACT_APP_API_URL = "https://godcraft.fun";
    const navigate = useNavigate();
    const fetchData = async ()=>{
        setIsLoading(true);
        try {
            const data = await axios.get(`${REACT_APP_API_URL}/gallery/${page}/${limit}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
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
            {gallery.map((item, index)=>(
                <div key={index} className='w-[400px] h-[300px] bg-[#1D1D1D] p-4 flex flex-col  gap-[14px] relative rounded-lg border-4 border-[#282828] '>
                    {
                        item.image && (
                            <img src={`${REACT_APP_API_URL}/uploads/${item.image}`} alt={item.alt} className='w-full h-full object-cover' />
                        )
                    }
                    {
                        item.video && (
                            <video src={`${REACT_APP_API_URL}/uploads/${item.video}`} controls className='w-full h-full object-cover' />
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