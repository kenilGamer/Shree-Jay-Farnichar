import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedin, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaMobileScreenButton } from 'react-icons/fa6';

function Topbar() {
  const data = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com" },
    { icon: <FaInstagram />, link: "https://www.instagram.com" },
    { icon: <FaYoutube />, link: "https://www.youtube.com" },
    { icon: <FaWhatsapp />, link: "https://wa.me/9228104285" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com" },
    { icon: <FaTwitter />, link: "https://www.twitter.com" }
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-2 bg-black text-white">
      {/* Contact Information */}
      <div className="flex flex-col md:flex-row items-center gap-4 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <FaMobileScreenButton /> <p>9228104285</p>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope /> <p>shreejayfarnichar@gmail.com</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4 text-lg mt-2 md:mt-0">
        {data.map((item, index) => (
          <a 
            key={index} 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-[#e7dc41] transition duration-300"
            aria-label={`Link to ${item.link}`}
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Topbar;
