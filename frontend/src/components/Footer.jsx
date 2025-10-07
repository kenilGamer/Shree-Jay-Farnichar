import React from 'react';
import { FiLinkedin, FiFacebook, FiYoutube, FiInstagram, FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp, FaAward, FaUsers, FaCogs, FaHome, FaBuilding } from 'react-icons/fa';

function Footer() {
  const specialties = [
    { icon: <FaHome className="text-[#D3AA62]" />, title: "Flat Furniture & Interiors", desc: "Modern, stylish, and space-saving solutions" },
    { icon: <FaBuilding className="text-[#D3AA62]" />, title: "Bungalow Furniture", desc: "Luxurious designs tailored to your lifestyle" },
    { icon: <FaCogs className="text-[#D3AA62]" />, title: "Office & Shop Furniture", desc: "Ergonomic and professional layouts" },
    { icon: <FaAward className="text-[#D3AA62]" />, title: "Government Projects", desc: "Reliable furniture solutions for public spaces" },
    { icon: <FaUsers className="text-[#D3AA62]" />, title: "Builder & Contractor Partnerships", desc: "Large-scale furniture and interior solutions" }
  ];

  const services = [
    "Furniture Design & Manufacturing",
    "Interior Design & Planning", 
    "POP Work & False Ceiling",
    "Color Scheme & Paint Work",
    "Civil Work & Renovation",
    "Flooring & Tiling",
    "Aluminium Section Work",
    "Electrical & Lighting",
    "All Small Works Accepted"
  ];

  const socialLinks = [
    { icon: <FiInstagram />, href: 'https://www.instagram.com/lumelight_interiers?', label: 'Instagram' },
    { icon: <FiFacebook />, href: 'https://www.facebook.com/', label: 'Facebook' },
    { icon: <FaWhatsapp />, href: 'https://wa.me/919904267635', label: 'WhatsApp' },
    // { icon: <FiYoutube />, href: 'https://www.youtube.com/@nrendrababahai', label: 'YouTube' },
    // { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/shree-jay-furniture-83567333b/', label: 'LinkedIn' }
  ];

  return (
    <div className='bg-gradient-to-b from-[#0A0A0A] to-black py-20 text-white relative overflow-hidden'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#D3AA62] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#F4D03F] rounded-full blur-3xl"></div>
      </div>

      <div className='container mx-auto px-6 md:px-12 relative z-10'>
        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16'>
          {/* Company Info */}
          <div className='lg:col-span-2'>
            <div className='flex items-center gap-3 mb-6'>
              <div className="w-20 h-20 flex items-center justify-center">
                <img src="/logo.png" alt="Lumelight Interior" className="w-20 scale-[2]" />
              </div>
              <div>
                <h1 className='text-3xl font-black gradient-text'>Lumelight Interior</h1>
                <p className='text-gray-400'>Interior Designers & Furniture Makers</p>
              </div>
            </div>
            
            <p className='text-gray-300 mb-8 leading-relaxed text-lg'>
              At Lumelight Interior, we combine 5+ years of experience with unmatched craftsmanship to transform spaces with premium furniture and bespoke interiors. Whether it's your home, office, or commercial project, we deliver designs that are both functional and elegant.
            </p>

            {/* Specialties */}
            <div className='mb-8'>
              <h2 className='text-2xl font-bold mb-6 text-white'>Our Specialties</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {specialties.map((item, index) => (
                  <div key={index} className='flex items-start gap-3 p-4 bg-[#1A1A1A] rounded-xl border border-[#333] hover:border-[#D3AA62]/50 transition-colors duration-300'>
                    <div className='text-2xl mt-1'>{item.icon}</div>
                    <div>
                      <h3 className='font-semibold text-white mb-1'>{item.title}</h3>
                      <p className='text-sm text-gray-400'>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Turnkey Solutions */}
            <div className='card-modern p-6'>
              <h2 className='text-xl font-bold mb-4 text-white'>Turnkey Solutions</h2>
              <p className='text-gray-300 leading-relaxed'>
                From custom furniture creation to interior design execution, we provide key-to-key project delivery with a focus on customer satisfaction and building lasting relationships.
              </p>
            </div>
          </div>

          {/* Contact & Services */}
          <div className='space-y-8'>
            {/* Contact Info */}
            <div>
              <h2 className='text-2xl font-bold mb-6 text-white'>Contact Us</h2>
              <div className='space-y-4'>
                <div className='flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-xl border border-[#333]'>
                  <FiMail className='text-[#D3AA62] text-xl' />
                  <div>
                    <p className='text-sm text-gray-400'>Email</p>
                    <a href='https://mail.google.com/mail/?view=cm&fs=1&to=lumelightinterior@gmail.com' target='_blank' rel='noopener noreferrer' className='text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300'>
                      lumelightinterior@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className='flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-xl border border-[#333]'>
                  <FaWhatsapp className='text-[#D3AA62] text-xl' />
                  <div>
                    <p className='text-sm text-gray-400'>WhatsApp</p>
                    <a href='https://wa.me/9624538770' className='text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300'>
                      +91 99042 67635
                    </a>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-xl border border-[#333]'>
                  <FiPhone className='text-[#D3AA62] text-xl' />
                  <div>
                    <p className='text-sm text-gray-400'>Phone</p>
                    <div className='space-y-1'>
                      <a href='tel:9624538770' className='block text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300'>
                        +91 9624538770
                      </a>
                      <a href='tel:+919904267635' className='block text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300'>
                          +91 99042 67635
                        </a>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-3 p-4 bg-[#1A1A1A] rounded-xl border border-[#333]'>
                  <FiClock className='text-[#D3AA62] text-xl' />
                  <div>
                    <p className='text-sm text-gray-400'>Working Hours</p>
                    <p className='text-white'>9:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className='text-xl font-bold mb-4 text-white'>Our Services</h2>
              <div className='space-y-2'>
                {services.map((service, index) => (
                  <div key={index} className='flex items-center gap-2 text-gray-300 hover:text-[#D3AA62] transition-colors duration-300'>
                    <div className='w-1.5 h-1.5 bg-[#D3AA62] rounded-full'></div>
                    <span className='text-sm'>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className='border-t border-[#333] pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            {/* Social Links */}
            <div className='flex items-center gap-6'>
              <span className='text-gray-400 font-medium'>Follow Us:</span>
              <div className='flex gap-4'>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    target='_blank' 
                    rel='noopener noreferrer' 
                    className='w-10 h-10 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#D3AA62] hover:bg-[#D3AA62]/10 transition-all duration-300'
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className='text-center md:text-right'>
              <p className='text-gray-500 text-sm'>
                © {new Date().getFullYear()} Lumelight Interior. All Rights Reserved.
              </p>
              <p className='text-gray-600 text-xs mt-1'>
                Crafted with ❤️ Created by <a href='https://www.creativitycoder.com' className='text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300'>CreativityCoder</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
