import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedin, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaMobileScreenButton } from 'react-icons/fa6';

function Topbar() {
  const data = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com", label: "Facebook" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/shreejayfurnitures", label: "Instagram" },
    { icon: <FaYoutube />, link: "https://www.youtube.com/@nrendrababahai", label: "YouTube" },
    { icon: <FaWhatsapp />, link: "https://wa.me/9624538770", label: "WhatsApp" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/shree-jay-furniture-83567333b/", label: "LinkedIn" },
    { icon: <FaTwitter />, link: "https://www.twitter.com", label: "Twitter" }
  ];

  return (
    <div className="bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-b border-white/10 relative z-40">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs md:text-sm">
            <div className="flex items-center gap-2 text-gray-300 hover:text-[#D3AA62] transition-colors duration-300">
              <FaMobileScreenButton className="text-[#D3AA62] text-sm" /> 
              <a href="tel:+9228104285" className="hover:underline">+91 92281 04285</a>
            </div>
            <div className="flex items-center gap-2 text-gray-300 hover:text-[#D3AA62] transition-colors duration-300">
              <FaEnvelope className="text-[#D3AA62] text-sm" /> 
              <a href="mailto:shreejayfarnichar@gmail.com" className="hover:underline text-xs md:text-sm">shreejayfarnichar@gmail.com</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs hidden sm:block">Follow Us:</span>
            <div className="flex items-center gap-1">
              {data.map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#D3AA62] hover:bg-[#D3AA62]/10 transition-all duration-300 group"
                  aria-label={item.label}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300 text-sm">
                    {item.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
