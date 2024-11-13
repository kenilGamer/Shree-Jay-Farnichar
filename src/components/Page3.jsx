import React, { useState } from 'react';

function Page3() {
    const [data, setData] = useState([
        { src: `/img1.jpg`, alt: "Service 1" },
        { src: `/img2.jpg`, alt: "Service 2" },
        { src: `/img3.jpg`, alt: "Service 3" },
        { src: `/img4.jpg`, alt: "Service 4" },
        { src: `/img5.jpg`, alt: "Service 5" },
        { src: `/img6.jpg`, alt: "Service 6" },
    ]);

  return (
    <div className="h-[80vh] max-md:mb-96 p-20" id="services">
        <h1 className="text-white text-3xl font-black uppercase text-center mb-10">Our Services</h1>
        <div className="flex items-center justify-center gap-8 flex-wrap">
            {data.map((item, index) => (
                <div key={index} className="w-full sm:w-[45%] md:w-[30%] h-[300px] bg-[#1D1D1D] p-4 rounded-lg border-4 border-[#282828]">
                    <img src={item.src} alt={item.alt} className="w-full h-full object-cover rounded-md" />
                </div>
            ))}
        </div>
    </div>
  );
}

export default Page3;
