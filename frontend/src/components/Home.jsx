import React, { useState, useEffect } from 'react';
import Navbar from '../partials/Navbar';
import Topbar from '../partials/Topbar';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Package from './Package';
import Footer from './Footer';
import LocomotiveScroll from 'locomotive-scroll';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        autoResize: true,
        smoothScrolling: true,
        lerp: 0.7,
        firefoxMultiplier: 10,
        resetNativeScroll: true,
        duration: 4.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 1.3,
        touchMultiplier: 2,
        normalizeWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      locomotiveScroll.destroy();
    };
  }, []);

  return (
    <>
      <div className="text-white wallparr min-h-screen relative overflow-hidden">
        {/* Fixed Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Topbar />
        </div>
        
        {/* Navbar - separate for scroll behavior */}
        <Navbar />
        
        {/* Hero Section with Parallax Effect */}
        <div className="relative z-10 pt-32">
          {/* Hero Content */}
          <div className="relative h-screen flex items-center justify-center">
            <div className="text-center px-4 max-w-6xl mx-auto">
              <div className="fade-in">
                <h1 className="heading-xl gradient-text mb-6">
                  Transforming Spaces with
                  <br />
                  <span className="text-white">Timeless Elegance</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Ahmedabad's Premier Interior Designers - Expertise in Spatial Planning & Furniture Curation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="btn-primary">
                    Explore Our Work
                  </button>
                  <button className="btn-secondary">
                    Get Free Quote
                  </button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-20 left-10 w-20 h-20 bg-[#D3AA62]/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#F4D03F]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#D3AA62]/30 rounded-full blur-lg animate-pulse delay-500"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <Page1 />
          <Page2 />
          <Package />
          <Page3 />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
