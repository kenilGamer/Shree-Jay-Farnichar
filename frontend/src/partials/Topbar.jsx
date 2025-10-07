import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedin, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa';
import { FaMobileScreenButton } from 'react-icons/fa6';

function Topbar() {
  const data = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com", label: "Facebook" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/lumelight_interiers", label: "Instagram" },
    // { icon: <FaYoutube />, link: "https://www.youtube.com/@nrendrababahai", label: "YouTube" },
    { icon: <FaWhatsapp />, link: "https://wa.me/919904267635", label: "WhatsApp" },
    // { icon: <FaLinkedin />, link: "https://www.linkedin.com/in", label: "LinkedIn" },
    // { icon: <FaTwitter />, link: "https://www.twitter.com", label: "Twitter" }
  ];

  return (
    <div className="topbar bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-b border-white/10 relative z-40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col gap-3">
          {/* Contact Information - Centered */}
          <div className="flex  max-sm:flex-col items-center justify-between gap-3 text-xs">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-1.5 text-white hover:text-[#D3AA62] transition-all duration-300 group">
                <FaMobileScreenButton className="text-[#D3AA62] text-sm group-hover:scale-110 transition-transform duration-300" /> 
                <a href="tel:+919904267635" className="hover:underline font-medium text-sm">+91 99042 67635</a>
              </div>
              <div className="flex items-center gap-1.5 text-white hover:text-[#D3AA62] transition-all duration-300 group">
                <FaEnvelope className="text-[#D3AA62] text-sm group-hover:scale-110 transition-transform duration-300" /> 
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lumelightinterior@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm font-medium">lumelightinterior@gmail.com</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs font-medium">Follow:</span>
              <div className="flex items-center gap-1">
                {data.map((item, index) => (
                  <a 
                    key={index} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center text-white hover:text-[#D3AA62] hover:bg-[#D3AA62]/30 transition-all duration-300 group hover:shadow-lg hover:scale-110 border border-white/10"
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
    </div>
  );
}

export default Topbar;
