import React, { useState } from 'react';
import { FaPlay, FaExpand, FaTimes } from 'react-icons/fa';

function Page3() {
    const [selectedMedia, setSelectedMedia] = useState(null);
    
    const data = [
        { src: `/img1.jpg`, alt: "Modern Living Room Design", category: "Living Room" },
        { src: `/img2.jpg`, alt: "Contemporary Kitchen Design", category: "Kitchen" },
        { src: `/img3.jpg`, alt: "Elegant Bedroom Interior", category: "Bedroom" },
        { src: `/img4.jpg`, alt: "Luxury Dining Space", category: "Dining" },
        { src: `/img5.jpg`, alt: "Office Interior Design", category: "Office" },
        { src: `/img6.jpg`, alt: "Bathroom Renovation", category: "Bathroom" },
        { video: `/web/vid (1).mp4`, alt: "Project Showcase 1", category: "Showcase" },
        { video: `/web/vid (2).mp4`, alt: "Project Showcase 2", category: "Showcase" },
        { video: `/web/vid (3).mp4`, alt: "Project Showcase 3", category: "Showcase" },
        { video: `/web/vid (5).mp4`, alt: "Project Showcase 4", category: "Showcase" },
        { video: `/web/vid (8).mp4`, alt: "Project Showcase 5", category: "Showcase" },
        { video: `/web/vid (6).mp4`, alt: "Project Showcase 6", category: "Showcase" },
        { video: `/web/vid (9).mp4`, alt: "Project Showcase 7", category: "Showcase" },
        { video: `/web/vid (10).mp4`, alt: "Project Showcase 8", category: "Showcase" },
        { video: `/web/vid (11).mp4`, alt: "Project Showcase 9", category: "Showcase" },
        { video: `/web/vid (12).mp4`, alt: "Project Showcase 10", category: "Showcase" },
        { video: `/web/vid (13).mp4`, alt: "Project Showcase 11", category: "Showcase" },
        { src: `/web/img2 (1).jpg`, alt: "Custom Furniture Design", category: "Furniture" },
        { src: `/web/img2 (2).jpg`, alt: "Interior Design Project", category: "Interior" },
        { src: `/web/img2 (3).jpg`, alt: "Space Planning Solution", category: "Planning" },
        { src: `/web/img2 (4).jpg`, alt: "Color Scheme Design", category: "Design" },
        { src: `/web/img2 (5).jpg`, alt: "Lighting Design", category: "Lighting" },
        { src: `/web/img2 (6).jpg`, alt: "Material Selection", category: "Materials" },
        { src: `/web/img2 (7).jpg`, alt: "Final Project Delivery", category: "Delivery" },
    ];

    const categories = [...new Set(data.map(item => item.category))];

    const openModal = (item, index) => {
        setSelectedMedia({ ...item, index });
    };

    const closeModal = () => {
        setSelectedMedia(null);
    };

    return (
        <div className="py-20 px-4 bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A]" id="services">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 slide-up">
                    <h1 className="heading-lg gradient-text mb-6">Our Portfolio</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Explore our diverse range of interior design projects and see how we transform spaces into beautiful, functional environments.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button className="btn-ghost">All Projects</button>
                    {categories.map((category, index) => (
                        <button key={index} className="btn-ghost">
                            {category}
                        </button>
                    ))}
                </div>

                {/* Masonry Gallery */}
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {data.map((item, index) => (
                        <div 
                            key={index} 
                            className="card-modern card-hover group cursor-pointer break-inside-avoid"
                            onClick={() => openModal(item, index)}
                        >
                            <div className="relative overflow-hidden rounded-xl">
                                {item.src ? (
                                    <img 
                                        src={item.src} 
                                        alt={item.alt} 
                                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                ) : (
                                    <div className="relative">
                                        <video 
                                            src={item.video} 
                                            className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                                            muted
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors duration-300">
                                            <FaPlay className="text-4xl text-white group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    </div>
                                )}
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-bold mb-1">{item.alt}</h3>
                                        <p className="text-sm text-[#D3AA62] font-semibold">{item.category}</p>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <FaExpand className="text-white text-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedMedia && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        <div className="relative max-w-4xl max-h-[90vh] w-full">
                            <button 
                                onClick={closeModal}
                                className="absolute -top-12 right-0 text-white text-2xl hover:text-[#D3AA62] transition-colors duration-300"
                            >
                                <FaTimes />
                            </button>
                            
                            <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden">
                                {selectedMedia.src ? (
                                    <img 
                                        src={selectedMedia.src} 
                                        alt={selectedMedia.alt} 
                                        className="w-full h-auto max-h-[70vh] object-cover" 
                                    />
                                ) : (
                                    <video 
                                        src={selectedMedia.video} 
                                        controls 
                                        className="w-full h-auto max-h-[70vh] object-cover"
                                        autoPlay
                                    />
                                )}
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{selectedMedia.alt}</h3>
                                    <p className="text-[#D3AA62] font-semibold">{selectedMedia.category}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page3;
