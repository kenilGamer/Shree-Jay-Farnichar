import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaUser, FaEnvelope, FaCogs, FaImages, FaSignInAlt, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is admin
  const isAdmin = localStorage.getItem('role') === 'admin';
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); // Refresh to update navbar
  };
  
  // Base navigation items
  const baseItems = [
    { name: "Home", link: "/", icon: <FaHome className="text-sm" /> },
    { name: "About", link: "/about", icon: <FaUser className="text-sm" /> },
    { name: "Services", link: "/services", icon: <FaCogs className="text-sm" /> },
    { name: "Gallery", link: "/gallery", icon: <FaImages className="text-sm" /> },
    { name: "Contact", link: "/contact", icon: <FaEnvelope className="text-sm" /> }
  ];

  // Admin or login items
  const authItems = isAdmin 
    ? [
        { name: "Dashboard", link: "/dashboard", icon: <FaTachometerAlt className="text-sm" /> },
        { name: "Logout", action: handleLogout, icon: <FaSignOutAlt className="text-sm" /> }
      ]
    : [{ name: "Login", link: "/login", icon: <FaSignInAlt className="text-sm" /> }];

  const data = [...baseItems, ...authItems];

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
    <div className={`navbar fixed top-12 left-0 right-0 z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
    } ${
      isScrolled ? 'bg-gradient-to-r from-black/95 via-black/90 to-black/95 backdrop-blur-xl border-b border-[#D3AA62]/30 shadow-2xl' : 'bg-gradient-to-r from-black/50 via-black/40 to-black/50 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center max-w-9xl mx-auto py-3">
          {/* Enhanced Logo */}
          <Link to="/" className=" flex items-center gap-4 group flex-shrink-0">
            <div className="relative">
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src="/logo.png" alt="Bhumi Interior Solution" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white text-xl font-bold group-hover:text-[#D3AA62] transition-colors duration-300 leading-tight">
                Bhumi Interior Solution
              </h1>
              <p className="text-sm text-[#D3AA62] font-medium">Interior Designers</p>
            </div>
            <div className="sm:hidden w-60">
              <h1 className="text-white text-base font-bold group-hover:text-[#D3AA62] transition-colors duration-300 w-40">
                Bhumi Interior Solution
              </h1>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {data.map((item, index) => {
              const isActiveItem = item.link ? isActive(item.link) : false;
              const className = `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 relative group ${
                isActiveItem
                  ? 'bg-[#D3AA62] text-black shadow-lg border border-[#D3AA62]/20'
                  : 'text-white hover:text-[#D3AA62] hover:bg-white/10 hover:shadow-md border border-transparent hover:border-white/20'
              }`;

              if (item.action) {
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className={className}
                  >
                    <span className={`transition-transform duration-300 group-hover:scale-110`}>
                      {item.icon}
                    </span>
                    <span className="relative z-10">{item.name}</span>
                  </button>
                );
              }

              return (
                <Link 
                  key={index} 
                  to={item.link} 
                  className={className}
                >
                  <span className={`transition-transform duration-300 ${isActiveItem ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span className="relative z-10">{item.name}</span>
                  {isActiveItem && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D3AA62] to-[#F4D03F] rounded-lg opacity-20"></div>
                  )}
                </Link>
              );
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden text-white text-xl p-3 rounded-lg transition-all duration-300 relative flex-shrink-0 border border-white/20 ${
              isOpen 
                ? 'bg-[#D3AA62] text-black shadow-lg border-[#D3AA62]/30' 
                : 'hover:bg-white/20 hover:shadow-md hover:border-white/30'
            }`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="transition-transform duration-300">
              {isOpen ? <FaTimes /> : <FaBars />}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
        }`}>
          <div className="bg-black/95 backdrop-blur-xl rounded-2xl p-6 space-y-3 border border-white/30 shadow-2xl">
            {data.map((item, index) => {
              const isActiveItem = item.link ? isActive(item.link) : false;
              const className = `flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group border ${
                isActiveItem
                  ? 'bg-[#D3AA62] text-black shadow-lg transform scale-[1.02] border-[#D3AA62]/30'
                  : 'text-white hover:text-[#D3AA62] hover:bg-white/10 hover:shadow-md hover:transform hover:scale-[1.01] border-transparent hover:border-white/20'
              }`;

              if (item.action) {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    className={className}
                  >
                    <span className={`transition-transform duration-300 group-hover:scale-110`}>
                      {item.icon}
                    </span>
                    <span className="relative z-10">{item.name}</span>
                  </button>
                );
              }

              return (
                <Link 
                  key={index} 
                  to={item.link} 
                  className={className}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={`transition-transform duration-300 ${isActiveItem ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span className="relative z-10">{item.name}</span>
                  {isActiveItem && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D3AA62] to-[#F4D03F] rounded-xl opacity-20"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
