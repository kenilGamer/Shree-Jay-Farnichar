import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const data = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Services", link: "/services" },
    { name: "Gallery", link: "/gallery" },
    { name: "Blog", link: "/blog" },
    // { name: "Login", link: "/login" },  
    ...(localStorage.getItem('role')==='admin' ? [{ name: "Dashboard", link: "/dashboard" }] : [])
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative container mx-auto px-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto py-4 px-6 bg-[#212121] relative z-10">
        <h1 className="text-white text-2xl font-bold">Shree Jay Farnichar</h1>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 text-white">
          {data.map((item, index) => (
            <Link 
              key={index} 
              to={item.link} 
              className="hover:text-[#e7dc41] duration-300 text-sm uppercase font-semibold font-sans"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#212121] text-white py-4 space-y-4 absolute top-full left-0 w-full z-20">
          {data.map((item, index) => (
            <Link 
              key={index} 
              to={item.link} 
              className="block text-center hover:text-[#e7dc41] duration-300 text-sm uppercase font-semibold font-sans"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
