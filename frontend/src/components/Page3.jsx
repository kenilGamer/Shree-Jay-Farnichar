import React from 'react';

function Page3() {
    const data = [
        { src: `/img1.jpg`, alt: "Service 1" },
        { src: `/img2.jpg`, alt: "Service 2" },
        { src: `/img3.jpg`, alt: "Service 3" },
        { src: `/img4.jpg`, alt: "Service 4" },
        { src: `/img5.jpg`, alt: "Service 5" },
        { src: `/img6.jpg`, alt: "Service 6" },
        { video: `/web/vid (1).mp4`, alt: "video 1" },
        { video: `/web/vid (2).mp4`, alt: "video 2" },
        { video: `/web/vid (3).mp4`, alt: "video 3" },
        { video: `/web/vid (5).mp4`, alt: "video 4" },
        { video: `/web/vid (8).mp4`, alt: "video 5" },
        { video: `/web/vid (6).mp4`, alt: "video 6" },
        { video: `/web/vid (9).mp4`, alt: "video 9" },
        { video: `/web/vid (10).mp4`, alt: "video 10" },
        { video: `/web/vid (11).mp4`, alt: "video 11" },
        { video: `/web/vid (12).mp4`, alt: "video 12" },
        { video: `/web/vid (13).mp4`, alt: "video 13" },
        { src: `/web/img2 (1).jpg`, alt: "Service 7" },
        { src: `/web/img2 (2).jpg`, alt: "Service 8" },
        { src: `/web/img2 (3).jpg`, alt: "Service 9" },
        { src: `/web/img2 (4).jpg`, alt: "Service 10" },
        { src: `/web/img2 (5).jpg`, alt: "Service 11" },
        { src: `/web/img2 (6).jpg`, alt: "Service 12" },
        { src: `/web/img2 (7).jpg`, alt: "Service 13" },
    ];

  return (
    <div className="h-[80vh] max-md:mb-96 p-20" id="services">
        <h1 className="text-white text-3xl font-black uppercase text-center mb-10">Our Services</h1>
        <div className="flex items-center justify-center gap-8 flex-wrap">
            {data.map((item, index) => (
                <div key={index} className="w-full sm:w-[45%] md:w-[30%] h-[300px] bg-[#1D1D1D] p-4 rounded-lg border-4 border-[#282828]">
                    {item.src ? (
                        <img src={item.src} alt={item.alt} className="w-full h-full object-cover rounded-md" />
                    ) : (
                        <video src={item.video} controls alt={item.alt} className="w-full h-full object-cover rounded-md" />
                    )}
                </div>
            ))}
        </div>
    </div>
  );
}

export default Page3;
