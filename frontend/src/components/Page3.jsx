import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaExpand,
  FaTimes,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpandAlt,
  FaCompress,
  FaStepBackward,
  FaStepForward,
  FaCog,
} from "react-icons/fa";

function Page3() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const videoRef = useRef(null);
  const modalRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const data = [
    {
      src: `/img1.jpg`,
      alt: "Modern Living Room Design",
      category: "Living Room",
    },
    {
      src: `/img2.jpg`,
      alt: "Contemporary Kitchen Design",
      category: "Kitchen",
    },
    { src: `/img3.jpg`, alt: "Elegant Bedroom Interior", category: "Bedroom" },
    { src: `/img4.jpg`, alt: "Luxury Dining Space", category: "Dining" },
    { src: `/img5.jpg`, alt: "Office Interior Design", category: "Office" },
    { src: `/img6.jpg`, alt: "Bathroom Renovation", category: "Bathroom" },
    {
      video: `/web/vid (1).mp4`,
      alt: "Project Showcase 1",
      category: "Showcase",
    },
    {
      video: `/web/vid (2).mp4`,
      alt: "Project Showcase 2",
      category: "Showcase",
    },
    {
      video: `/web/vid (3).mp4`,
      alt: "Project Showcase 3",
      category: "Showcase",
    },
    {
      video: `/web/vid (5).mp4`,
      alt: "Project Showcase 4",
      category: "Showcase",
    },
    {
      video: `/web/vid (8).mp4`,
      alt: "Project Showcase 5",
      category: "Showcase",
    },
    {
      video: `/web/vid (6).mp4`,
      alt: "Project Showcase 6",
      category: "Showcase",
    },
    {
      video: `/web/vid (9).mp4`,
      alt: "Project Showcase 7",
      category: "Showcase",
    },
    {
      video: `/web/vid (10).mp4`,
      alt: "Project Showcase 8",
      category: "Showcase",
    },
    {
      video: `/web/vid (11).mp4`,
      alt: "Project Showcase 9",
      category: "Showcase",
    },
    {
      video: `/web/vid (12).mp4`,
      alt: "Project Showcase 10",
      category: "Showcase",
    },
    {
      video: `/web/vid (13).mp4`,
      alt: "Project Showcase 11",
      category: "Showcase",
    },
    {
      src: `/web/img2 (1).jpg`,
      alt: "Custom Furniture Design",
      category: "Furniture",
    },
    {
      src: `/web/img2 (2).jpg`,
      alt: "Interior Design Project",
      category: "Interior",
    },
    {
      src: `/web/img2 (3).jpg`,
      alt: "Space Planning Solution",
      category: "Planning",
    },
    {
      src: `/web/img2 (4).jpg`,
      alt: "Color Scheme Design",
      category: "Design",
    },
    { src: `/web/img2 (5).jpg`, alt: "Lighting Design", category: "Lighting" },
    {
      src: `/web/img2 (6).jpg`,
      alt: "Material Selection",
      category: "Materials",
    },
    {
      src: `/web/img2 (7).jpg`,
      alt: "Final Project Delivery",
      category: "Delivery",
    },
  ];

  const categories = [
    "All Projects",
    ...new Set(data.map((item) => item.category)),
  ];

  const filteredData =
    activeCategory === "All Projects"
      ? data
      : data.filter((item) => item.category === activeCategory);

  const openModal = (item, index) => {
    setSelectedMedia({ ...item, index });
    setIsPlaying(false);
    setIsMuted(true);
    setCurrentTime(0);
    setDuration(0);
    setVolume(1);
    setPlaybackRate(1);
    setIsFullscreen(false);
    setShowControls(true);
    setShowSettings(false);
  };

  const closeModal = () => {
    console.log("closeModal function called");
    setSelectedMedia(null);
    setIsPlaying(false);
    setIsMuted(true);
    setCurrentTime(0);
    setDuration(0);
    setVolume(1);
    setPlaybackRate(1);
    setIsFullscreen(false);
    setShowControls(true);
    setShowSettings(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    document.body.style.overflow = 'unset';
    document.documentElement.removeAttribute('data-video-modal-open');
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skipTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const hideControls = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    hideControls();
  };

  // Mobile-specific touch handling
  const handleTouchStart = () => {
    showControlsTemporarily();
  };

  const handleTouchEnd = () => {
    // Prevent default touch behavior that might interfere with video controls
  };

  // Handle keyboard events and fullscreen
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && selectedMedia) {
        if (isFullscreen) {
          toggleFullscreen();
        } else {
          closeModal();
        }
      }
      if (e.key === " " && selectedMedia && selectedMedia.video) {
        e.preventDefault();
        togglePlayPause();
        showControlsTemporarily();
      }
      if (e.key === "f" && selectedMedia && selectedMedia.video) {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === "m" && selectedMedia && selectedMedia.video) {
        e.preventDefault();
        toggleMute();
      }
      if (e.key === "ArrowLeft" && selectedMedia && selectedMedia.video) {
        e.preventDefault();
        skipTime(-10);
        showControlsTemporarily();
      }
      if (e.key === "ArrowRight" && selectedMedia && selectedMedia.video) {
        e.preventDefault();
        skipTime(10);
        showControlsTemporarily();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    if (selectedMedia) {
      document.addEventListener("keydown", handleKeyPress);
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.body.style.overflow = "hidden";
      // Hide navbar when video modal is open
      document.documentElement.setAttribute("data-video-modal-open", "true");
    } else {
      document.body.style.overflow = "unset";
      // Show navbar when video modal is closed
      document.documentElement.removeAttribute("data-video-modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.body.style.overflow = "unset";
      document.documentElement.removeAttribute("data-video-modal-open");
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [selectedMedia, isPlaying, isFullscreen]);

  return (
    <div
      className="py-20 px-4 bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A]"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 slide-up">
          <h1 className="heading-lg gradient-text mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse range of interior design projects and see how we
            transform spaces into beautiful, functional environments.
          </p>
        </div>

        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#D3AA62] text-black shadow-lg transform scale-105"
                  : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Enhanced Masonry Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="card-modern card-hover group cursor-pointer break-inside-avoid transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              onClick={() => openModal(item, index)}
            >
              <div className="relative overflow-hidden rounded-xl">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="relative group/video">
                    <video
                      src={item.video}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                      muted
                      preload="metadata"
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors duration-300">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform duration-300">
                        <FaPlay className="text-2xl text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/70 rounded-full px-2 py-1 text-white text-xs font-medium">
                        Video
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold mb-1">{item.alt}</h3>
                    <p className="text-sm text-[#D3AA62] font-semibold">
                      {item.category}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <FaExpand className="text-white text-xl" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Video Modal */}
        {selectedMedia && (
          <div
            ref={modalRef}
            className="video-modal fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                console.log("Modal backdrop clicked - closing modal");
                closeModal();
              }
            }}
            onMouseMove={showControlsTemporarily}
          >
            {/* Close Button - Fixed Position */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-[100]">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Close button clicked!");
                  closeModal();
                }}
                onTouchStart={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Touch start on close button");
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Touch end on close button");
                  closeModal();
                }}
                className="w-14 h-14 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl border-4 border-white cursor-pointer"
                style={{
                  position: "fixed",
                  top: "10px",
                  right: "10px",
                  zIndex: 9999,
                  touchAction: "manipulation",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none"
                }}
              >
                ✕
              </button>
            </div>

            <div className="relative max-w-6xl max-h-[95vh] w-full animate-in zoom-in-95 duration-300 mx-2 sm:mx-0">
              <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                {selectedMedia.src ? (
                  <div className="relative">
                    <img
                      src={selectedMedia.src}
                      alt={selectedMedia.alt}
                      className="w-full h-auto max-h-[75vh] object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 rounded-lg px-3 py-1 text-white text-sm font-medium">
                        Image
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <video
                      ref={videoRef}
                      src={selectedMedia.video}
                      className="w-full h-auto max-h-[75vh] sm:max-h-[75vh] object-cover"
                      muted={isMuted}
                      volume={volume}
                      onEnded={handleVideoEnd}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onClick={togglePlayPause}
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                      playsInline
                      webkit-playsinline="true"
                    />

                    {/* Advanced Video Controls Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        showControls ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {/* Top Controls */}
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-center">
                        <div className="bg-black/50 rounded-lg px-2 sm:px-3 py-1 text-white text-xs sm:text-sm font-medium">
                          Video
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button
                            onClick={() => setShowSettings(!showSettings)}
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-xs sm:text-sm transition-all duration-300 touch-manipulation"
                            aria-label="Settings"
                          >
                            <FaCog />
                          </button>
                          <button
                            onClick={toggleFullscreen}
                            className="w-7 h-7 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-xs sm:text-sm transition-all duration-300 touch-manipulation"
                            aria-label="Toggle fullscreen"
                          >
                            {isFullscreen ? <FaCompress /> : <FaExpandAlt />}
                          </button>
                        </div>
                      </div>

                      {/* Center Play Button */}
                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={togglePlayPause}
                            className="w-16 h-16 sm:w-20 sm:h-20 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl transition-all duration-300 hover:scale-110 touch-manipulation"
                            aria-label="Play video"
                          >
                            <FaPlay className="ml-0.5 sm:ml-1" />
                          </button>
                        </div>
                      )}

                      {/* Bottom Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4">
                        {/* Progress Bar */}
                        <div className="mb-3 sm:mb-4">
                          <div
                            className="w-full h-2 sm:h-1 bg-white/20 rounded-full cursor-pointer touch-manipulation"
                            onClick={handleSeek}
                          >
                            <div
                              className="h-full bg-[#D3AA62] rounded-full transition-all duration-100"
                              style={{
                                width: `${(currentTime / duration) * 100}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-4">
                            <button
                              onClick={() => skipTime(-10)}
                              className="w-7 h-7 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-xs sm:text-sm transition-all duration-300 touch-manipulation"
                              aria-label="Skip back 10 seconds"
                            >
                              <FaStepBackward />
                            </button>
                            <button
                              onClick={togglePlayPause}
                              className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D3AA62] hover:bg-[#F4D03F] rounded-full flex items-center justify-center text-black text-base sm:text-lg transition-all duration-300 touch-manipulation"
                              aria-label={
                                isPlaying ? "Pause video" : "Play video"
                              }
                            >
                              {isPlaying ? (
                                <FaPause />
                              ) : (
                                <FaPlay className="ml-0.5" />
                              )}
                            </button>
                            <button
                              onClick={() => skipTime(10)}
                              className="w-7 h-7 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-xs sm:text-sm transition-all duration-300 touch-manipulation"
                              aria-label="Skip forward 10 seconds"
                            >
                              <FaStepForward />
                            </button>
                            <button
                              onClick={toggleMute}
                              className="w-7 h-7 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white text-xs sm:text-sm transition-all duration-300 touch-manipulation"
                              aria-label={
                                isMuted ? "Unmute video" : "Mute video"
                              }
                            >
                              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <div className="w-16 sm:w-20">
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer slider touch-manipulation"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1 sm:gap-4 text-white text-xs sm:text-sm">
                            <span>{formatTime(currentTime)}</span>
                            <span>/</span>
                            <span>{formatTime(duration)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Settings Panel */}
                      {showSettings && (
                        <div className="absolute top-12 sm:top-16 right-2 sm:right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 min-w-[180px] sm:min-w-[200px]">
                          <h4 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                            Playback Speed
                          </h4>
                          <div className="space-y-1 sm:space-y-2">
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                              <button
                                key={rate}
                                onClick={() => changePlaybackRate(rate)}
                                className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm transition-colors duration-200 touch-manipulation ${
                                  playbackRate === rate
                                    ? "bg-[#D3AA62] text-black"
                                    : "text-white hover:bg-white/10"
                                }`}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Media Info */}
                <div className="p-4 sm:p-6 border-t border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                        {selectedMedia.alt}
                      </h3>
                      <p className="text-[#D3AA62] font-semibold text-sm sm:text-base">
                        {selectedMedia.category}
                      </p>
                    </div>
                    {selectedMedia.video && (
                      <div className="text-gray-400 text-xs sm:text-sm space-y-1 hidden sm:block">
                        <div>
                          Press <kbd>Space</kbd> to play/pause
                        </div>
                        <div>
                          Press <kbd>F</kbd> for fullscreen
                        </div>
                        <div>
                          Press <kbd>M</kbd> to mute
                        </div>
                        <div>
                          Use <kbd>←</kbd> <kbd>→</kbd> to seek
                        </div>
                      </div>
                    )}
                  </div>
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
