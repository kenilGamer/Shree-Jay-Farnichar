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
        { video: `/web/vid (1).mp4`, alt: "video 1" },
        { video: `/web/vid (2).mp4`, alt: "video 2" },
        { video: `/web/vid (3).mp4`, alt: "video 3" },
        { video: `/web/vid (4).mp4`, alt: "video 4" },
        { video: `/web/vid (5).mp4`, alt: "video 5" },
        { video: `/web/vid (6).mp4`, alt: "video 6" },
        { video: `/web/vid (7).mp4`, alt: "video 7" },
        { video: `/web/vid (8).mp4`, alt: "video 8" },
        { video: `/web/vid (9).mp4`, alt: "video 9" },
        { video: `/web/vid (10).mp4`, alt: "video 10" },
        { video: `/web/vid (11).mp4`, alt: "video 11" },
        { video: `/web/vid (12).mp4`, alt: "video 12" },
        { video: `/web/vid (13).mp4`, alt: "video 13" },
        { image: `/web/img2 (1).jpg`, alt: "Service 7" },
        { image: `/web/img2 (2).jpg`, alt: "Service 8" },
        { image: `/web/img2 (3).jpg`, alt: "Service 9" },
        { image: `/web/img2 (4).jpg`, alt: "Service 10" },
        { image: `/web/img2 (5).jpg`, alt: "Service 11" },
        { image: `/web/img2 (6).jpg`, alt: "Service 12" },
        { image: `/web/img2 (7).jpg`, alt: "Service 13" },
        { image: `/web/img2 (8).jpg`, alt: "Service 14" },
        { image: `/web/img2 (9).jpg`, alt: "Service 15" },
        { image: `/web/img2 (10).jpg`, alt: "Service 16" },
        { image: `/web/img2 (11).jpg`, alt: "Service 17" },
        { image: `/web/img2 (12).jpg`, alt: "Service 18" },
        { image: `/web/img2 (13).jpg`, alt: "Service 19" },
        { image: `/web/img2 (14).jpg`, alt: "Service 20" },
        { image: `/web/img2 (15).jpg`, alt: "Service 21" },
        { image: `/web/img2 (16).jpg`, alt: "Service 22" },
        { image: `/web/img2 (17).jpg`, alt: "Service 23" },
        { image: `/web/img2 (18).jpg`, alt: "Service 24" },
        { image: `/web/img2 (19).jpg`, alt: "Service 25" },
        { image: `/web/img2 (20).jpg`, alt: "Service 26" },
        { image: `/web/img2 (21).jpg`, alt: "Service 27" },
        { image: `/web/img2 (22).jpg`, alt: "Service 28" },
        { image: `/web/img2 (23).jpg`, alt: "Service 29" },
        { image: `/web/img2 (24).jpg`, alt: "Service 30" },
        { image: `/web/img2 (25).jpg`, alt: "Service 31" },
        { image: `/web/img2 (26).jpg`, alt: "Service 32" },
        { image: `/web/img2 (27).jpg`, alt: "Service 33" },
        { image: `/web/img2 (28).jpg`, alt: "Service 34" },
        { image: `/web/img2 (29).jpg`, alt: "Service 35" },
        { image: `/web/img2 (30).jpg`, alt: "Service 36" },
        { image: `/web/img2 (31).jpg`, alt: "Service 37" },
        { image: `/web/img2 (32).jpg`, alt: "Service 38" },
        { image: `/web/img2 (33).jpg`, alt: "Service 39" },
        { image: `/web/img2 (34).jpg`, alt: "Service 40" },
        { image: `/web/img2 (35).jpg`, alt: "Service 41" },
        { image: `/web/img2 (36).jpg`, alt: "Service 42" },
        { image: `/web/img2 (37).jpg`, alt: "Service 43" },
        { image: `/web/img2 (38).jpg`, alt: "Service 44" },
        { image: `/web/img2 (39).jpg`, alt: "Service 45" },
        { image: `/web/img2 (40).jpg`, alt: "Service 46" },
        { image: `/web/img2 (41).jpg`, alt: "Service 47" },
        { image: `/web/img2 (42).jpg`, alt: "Service 48" },
        { image: `/web/img2 (43).jpg`, alt: "Service 49" },
        { image: `/web/img2 (44).jpg`, alt: "Service 50" },
        { image: `/web/img2 (45).jpg`, alt: "Service 51" },
        { image: `/web/img2 (46).jpg`, alt: "Service 52" },
        { image: `/web/img2 (47).jpg`, alt: "Service 53" },
        { image: `/web/img2 (48).jpg`, alt: "Service 54" },
        { image: `/web/img2 (49).jpg`, alt: "Service 55" },
        { image: `/web/img2 (50).jpg`, alt: "Service 56" },
        { image: `/web/img2 (51).jpg`, alt: "Service 57" },
        { image: `/web/img2 (52).jpg`, alt: "Service 58" },
        { image: `/web/img2 (53).jpg`, alt: "Service 59" },
        { image: `/web/img2 (54).jpg`, alt: "Service 60" },
        { image: `/web/img2 (55).jpg`, alt: "Service 61" },
        { image: `/web/img2 (56).jpg`, alt: "Service 62" },
        { image: `/web/img2 (57).jpg`, alt: "Service 63" },
        { image: `/web/img2 (58).jpg`, alt: "Service 64" },
        { image: `/web/img2 (59).jpg`, alt: "Service 65" },
        { image: `/web/img2 (60).jpg`, alt: "Service 66" },
        { image: `/web/img2 (61).jpg`, alt: "Service 67" },
        { image: `/web/img2 (62).jpg`, alt: "Service 68" },
        { image: `/web/img2 (63).jpg`, alt: "Service 69" },
        { image: `/web/img2 (64).jpg`, alt: "Service 70" },
        { image: `/web/img2 (65).jpg`, alt: "Service 71" },
        { image: `/web/img2 (66).jpg`, alt: "Service 72" },
        { image: `/web/img2 (67).jpg`, alt: "Service 73" },
        { image: `/web/img2 (68).jpg`, alt: "Service 74" },
        { image: `/web/img2 (69).jpg`, alt: "Service 75" },
        { image: `/web/img2 (70).jpg`, alt: "Service 76" },
        { image: `/web/img2 (71).jpg`, alt: "Service 77" },
        { image: `/web/img2 (72).jpg`, alt: "Service 78" },
        { image: `/web/img2 (73).jpg`, alt: "Service 79" },
        { image: `/web/img2 (74).jpg`, alt: "Service 80" },
        { image: `/web/img2 (75).jpg`, alt: "Service 81" },
        { image: `/web/img2 (76).jpg`, alt: "Service 82" },
        { image: `/web/img2 (77).jpg`, alt: "Service 83" },
        { image: `/web/img2 (78).jpg`, alt: "Service 84" },
        { image: `/web/img2 (79).jpg`, alt: "Service 85" },
        { image: `/web/img2 (80).jpg`, alt: "Service 86" },
        { image: `/web/img2 (81).jpg`, alt: "Service 87" },
        { image: `/web/img2 (82).jpg`, alt: "Service 88" },
        { image: `/web/img2 (83).jpg`, alt: "Service 89" },
        { image: `/web/img2 (84).jpg`, alt: "Service 90" },
        { image: `/web/img2 (85).jpg`, alt: "Service 91" },
        { image: `/web/img2 (86).jpg`, alt: "Service 92" },
        { image: `/web/img2 (87).jpg`, alt: "Service 93" },
        { image: `/web/img2 (88).jpg`, alt: "Service 94" },
        { image: `/web/img2 (89).jpg`, alt: "Service 95" },
        { image: `/web/img2 (90).jpg`, alt: "Service 96" },
        { image: `/web/img2 (91).jpg`, alt: "Service 97" },
        { image: `/web/img2 (92).jpg`, alt: "Service 98" },
        { image: `/web/img2 (93).jpg`, alt: "Service 99" },
        { image: `/web/img2 (94).jpg`, alt: "Service 100" },
        { image: `/web/img2 (95).jpg`, alt: "Service 101" },
        { image: `/web/img2 (96).jpg`, alt: "Service 102" },
        { image: `/web/img2 (97).jpg`, alt: "Service 103" },
        { image: `/web/img2 (98).jpg`, alt: "Service 104" },
        { image: `/web/img2 (99).jpg`, alt: "Service 105" },
        { image: `/web/img2 (100).jpg`, alt: "Service 106" },
        { image: `/web/img2 (101).jpg`, alt: "Service 107" },
        { image: `/web/img2 (102).jpg`, alt: "Service 108" },
        { image: `/web/img2 (103).jpg`, alt: "Service 109" },
        { image: `/web/img2 (104).jpg`, alt: "Service 110" },
        { image: `/web/img2 (105).jpg`, alt: "Service 111" },
        { image: `/web/img2 (106).jpg`, alt: "Service 112" },
        { image: `/web/img2 (107).jpg`, alt: "Service 113" },
        { image: `/web/img2 (108).jpg`, alt: "Service 114" },
        { image: `/web/img2 (109).jpg`, alt: "Service 115" },
        { image: `/web/img2 (110).jpg`, alt: "Service 116" },
        { image: `/web/img2 (111).jpg`, alt: "Service 117" },
        { image: `/web/img2 (112).jpg`, alt: "Service 118" },
        { image: `/web/img2 (113).jpg`, alt: "Service 119" },
        { image: `/web/img2 (114).jpg`, alt: "Service 120" },
        { image: `/web/img2 (115).jpg`, alt: "Service 121" },
        { image: `/web/img2 (116).jpg`, alt: "Service 122" },
        { image: `/web/img2 (117).jpg`, alt: "Service 123" },
        { image: `/web/img2 (118).jpg`, alt: "Service 124" },
        { image: `/web/img2 (119).jpg`, alt: "Service 125" },
        { image: `/web/img2 (120).jpg`, alt: "Service 126" },
        { image: `/web/img2 (121).jpg`, alt: "Service 127" },
        { image: `/web/img2 (122).jpg`, alt: "Service 128" },
        { image: `/web/img2 (123).jpg`, alt: "Service 129" },
        { image: `/web/img2 (124).jpg`, alt: "Service 130" },
        { image: `/web/img2 (125).jpg`, alt: "Service 131" },
        { image: `/web/img2 (126).jpg`, alt: "Service 132" },
        { image: `/web/img2 (127).jpg`, alt: "Service 133" },
        { image: `/web/img2 (128).jpg`, alt: "Service 134" },
        { image: `/web/img2 (129).jpg`, alt: "Service 135" },
        { image: `/web/img2 (130).jpg`, alt: "Service 136" },
        { image: `/web/img2 (131).jpg`, alt: "Service 137" },
        { image: `/web/img2 (132).jpg`, alt: "Service 138" },
        { image: `/web/img2 (133).jpg`, alt: "Service 139" },
        { image: `/web/img2 (134).jpg`, alt: "Service 140" },
    ]);
    const REACT_APP_API_URL = "https://godcraft.fun"
    const navigate = useNavigate();
    const fetchData = async ()=>{
        setIsLoading(true);
        try {
            const data = await axios.get(`${REACT_APP_API_URL}/gallery/${page}/${limit}`, {
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