import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaEnvelope, FaCogs, FaImages, FaSignInAlt, FaTachometerAlt } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const data = [
    { name: "Home", link: "/", icon: <FaHome className="text-sm" /> },
    { name: "About", link: "/about", icon: <FaUser className="text-sm" /> },
    { name: "Services", link: "/services", icon: <FaCogs className="text-sm" /> },
    { name: "Gallery", link: "/gallery", icon: <FaImages className="text-sm" /> },
    { name: "Contact", link: "/contact", icon: <FaEnvelope className="text-sm" /> },
    { name: "Login", link: "/login", icon: <FaSignInAlt className="text-sm" /> },  
    ...(localStorage.getItem('role')==='admin' ? [{ name: "Dashboard", link: "/dashboard", icon: <FaTachometerAlt className="text-sm" /> }] : [])
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show navbar when scrolling up, hide when scrolling down
          if (currentScrollY < lastScrollY || currentScrollY < 100) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          }
          
          // Background blur effect
          setIsScrolled(currentScrollY > 50);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`fixed top-12 left-0 right-0 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
    } ${
      isScrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-black font-black text-lg">SJ</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold group-hover:text-[#D3AA62] transition-colors duration-300">
                Shree Jay Furniture
              </h1>
              <p className="text-xs text-gray-400">Interior Designers</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {data.map((item, index) => (
              <Link 
                key={index} 
                to={item.link} 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.link)
                    ? 'bg-[#D3AA62] text-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-black/90 backdrop-blur-md rounded-2xl mt-4 p-6 space-y-2 border border-white/10">
            {data.map((item, index) => (
              <Link 
                key={index} 
                to={item.link} 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.link)
                    ? 'bg-[#D3AA62] text-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
