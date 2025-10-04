import React, { useEffect, useState } from 'react';
import { FaPlay, FaExpand, FaTimes, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

function Gallery() {
    const [gallery, setGallery] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [error, setError] = useState(null);
    const REACT_APP_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Try local backend first with pagination
            const response = await axios.get(`${REACT_APP_API_URL}/gallery/1/50`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGallery(response.data || []);
        } catch (error) {
            console.error("Error fetching gallery: ", error);
            setError("Failed to load gallery. Showing sample images.");
            // Fallback to static gallery data using public folder images
            setGallery([
                { id: 1, image: '/frontend/public/img1.jpg', alt: 'Modern Living Room Design', category: 'Living Room' },
                { id: 2, image: '/img2.jpg', alt: 'Contemporary Kitchen Design', category: 'Kitchen' },
                { id: 3, image: '/img3.jpg', alt: 'Elegant Bedroom Interior', category: 'Bedroom' },
                { id: 4, image: '/img4.jpg', alt: 'Luxury Dining Space', category: 'Dining' },
                { id: 5, image: '/img5.jpg', alt: 'Office Interior Design', category: 'Office' },
                { id: 6, image: '/img6.jpg', alt: 'Bathroom Renovation', category: 'Bathroom' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openModal = (item) => {
        setSelectedMedia(item);
    };

    const closeModal = () => {
        setSelectedMedia(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] flex items-center justify-center">
                <div className="text-center">
                    <FaSpinner className="text-4xl text-[#D3AA62] animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg">Loading Gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] pt-32">
            <div className="container mx-auto px-4 py-20">
                {/* Header */}
                <div className="text-center mb-16 slide-up">
                    <h1 className="heading-lg gradient-text mb-6">Our Gallery</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Explore our diverse range of interior design projects and see how we transform spaces into beautiful, functional environments.
                    </p>
                </div>

                {error && (
                    <div className="text-center mb-8">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button 
                            onClick={fetchData}
                            className="btn-primary"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Gallery Grid */}
                {gallery.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {gallery.map((item, index) => (
                            <div 
                                key={item.id || index} 
                                className="card-modern card-hover group cursor-pointer break-inside-avoid"
                                onClick={() => openModal(item)}
                            >
                                <div className="relative overflow-hidden rounded-xl">
                                    {item.image ? (
                                        <img 
                                            src={item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `${REACT_APP_API_URL}/uploads/${item.image}`} 
                                            alt={item.alt || item.title || 'Gallery Image'} 
                                            className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500" 
                                            onError={(e) => {
                                                e.target.src = '/img1.jpg'; // Fallback image
                                            }}
                                        />
                                    ) : item.video ? (
                                        <div className="relative">
                                            <video 
                                                src={item.video.startsWith('http') || item.video.startsWith('/') ? item.video : `${REACT_APP_API_URL}/uploads/${item.video}`} 
                                                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                                                muted
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors duration-300">
                                                <FaPlay className="text-4xl text-white group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    ) : null}
                                    
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white font-bold mb-1">{item.alt || 'Gallery Item'}</h3>
                                            <p className="text-sm text-[#D3AA62] font-semibold">{item.category || 'Interior Design'}</p>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <FaExpand className="text-white text-xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-2xl text-white mb-4">No Gallery Items Found</h3>
                        <p className="text-gray-400 mb-8">Check back later for new projects!</p>
                        <button 
                            onClick={fetchData}
                            className="btn-primary"
                        >
                            Refresh Gallery
                        </button>
                    </div>
                )}

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
                                {selectedMedia.image ? (
                                    <img 
                                        src={selectedMedia.image.startsWith('http') || selectedMedia.image.startsWith('/') ? selectedMedia.image : `${REACT_APP_API_URL}/uploads/${selectedMedia.image}`} 
                                        alt={selectedMedia.alt || selectedMedia.title || 'Gallery Image'} 
                                        className="w-full h-auto max-h-[70vh] object-cover" 
                                        onError={(e) => {
                                            e.target.src = '/img1.jpg'; // Fallback image
                                        }}
                                    />
                                ) : selectedMedia.video ? (
                                    <video 
                                        src={selectedMedia.video.startsWith('http') || selectedMedia.video.startsWith('/') ? selectedMedia.video : `${REACT_APP_API_URL}/uploads/${selectedMedia.video}`} 
                                        controls 
                                        className="w-full h-auto max-h-[70vh] object-cover"
                                        autoPlay
                                    />
                                ) : null}
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{selectedMedia.alt || selectedMedia.title || 'Gallery Item'}</h3>
                                    <p className="text-[#D3AA62] font-semibold">{selectedMedia.category || 'Interior Design'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gallery