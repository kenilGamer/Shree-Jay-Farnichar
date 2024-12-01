import React from 'react';
import { FiLinkedin, FiFacebook, FiYoutube, FiInstagram } from 'react-icons/fi';

function Footer() {
  return (
    <div className='bg-[#1D1D1D] py-10 text-white max-md:mt-[1600px]  relative'>
      <div className='container mx-auto px-6 md:px-12'>
        {/* Contact Information */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-10'>
          <div>
            <h1 className='text-2xl font-black uppercase mb-4 text-center'>Shree Jay Furniture</h1>
            <div className=' w-[50vw] mb-5'>
            <p>At Shree Jay Furniture, we combine 30 years of experience with unmatched craftsmanship to transform spaces with premium furniture and bespoke interiors. Whether it’s your home, office, or commercial project, we deliver designs that are both functional and elegant.</p>
            <h1 className=' font-semibold mt-3 mb-3 text-2xl'>Our Specialties</h1>
            <ul className='space-y-2'>
              <li>• <span className='font-bold font-sans text-md '>Flat Furniture & Interiors</span>: Modern, stylish, and space-saving solutions.</li> 
              <li>• <span className='font-bold font-sans text-md '>Bungalow Furniture</span>: Luxurious designs tailored to your lifestyle.</li>
              <li>• <span className='font-bold font-sans text-md '>Office & Shop Furniture</span>: Ergonomic and professional layouts.</li>
              <li>• <span className='font-bold font-sans text-md '>Government Projects</span>: Reliable furniture solutions for public spaces.</li>
              <li>• <span className='font-bold font-sans text-md '>Builder & Contractor Partnerships</span>: Large-scale furniture and interior solutions.</li>
            </ul>
            <h1 className=' font-semibold mt-3 mb-3 text-2xl'>Turnkey Solutions</h1>
            <p>From custom furniture creation to interior design execution, we provide key-to-key project delivery with a focus on customer satisfaction and building lasting relationships.</p>
            </div>
            <div className='text-white'>
              <h2 className='text-2xl font-semibold mb-4'>Why Shree Jay Furniture?</h2>
              <ul className='space-y-2'>
                <li>Decades of expertise in designing and crafting quality furniture.</li>
                <li>Versatility across residential, commercial, and government projects.</li>
                <li>Personalized solutions tailored to your needs and budget.</li>
              </ul>
            </div>
            <div className='text-white mt-3'>
              <h2 className='text-2xl font-semibold mb-4'>Contact Us</h2>
              <p>📧 Email: <a href='mailto:info@shreejayfurniture.store' className='text-[#D3AA62]'>info@shreejayfurniture.store</a></p>
              <div className='flex gap-2 flex-col mt-2'>
                <a href='https://wa.me/9624538770' className='text-[#D3AA62]'>📱 WhatsApp: +91 96245 38770</a>
                <a href='tel:+9228104285' className='text-[#D3AA62]'>📞 +91 92281 04285</a>
                <a href='tel:+9909858710' className='text-[#D3AA62]'>📞 +91 99098 58710</a>
              </div>
              <p>Let Shree Jay Furniture bring your vision to life with innovative designs and premium furniture solutions!</p>
            </div>
            {/* <p className='text-center '>Email: <a href='mailto:info@ShreeJayFarnichar.com' className='text-[#D3AA62]'>info@ShreeJayFarnichar.com</a></p>
            <p className='text-center mb-2'>Phone: <a href='tel:+9228104285' className='text-[#D3AA62]'>+91 9228104285</a></p>
            <p className='text-center mb-2'>Phone: <a href='tel:+9624538770' className='text-[#D3AA62]'>+91 9624538770</a></p>
            <p className='text-center mb-2'>Phone: <a href='tel:+9909858710' className='text-[#D3AA62]'>+91 9909858710</a></p> */}
          </div>

          {/* Services */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>Interior Designing Services</h2>
            <ul className='space-y-2'>
              <li>Furniture work</li>
              <li>Pop work</li>
              <li>Colour work</li>
              <li>Civil work</li>
              <li>Flooring work</li>
              <li>Aluminium section work</li>
              <li>All small works are accepted</li>
            </ul>
          </div>
          
        </div>

        {/* Social Media Links */}
        <div className='text-center mt-10'>
          <h2 className='text-lg font-semibold mb-4'>We Are Social</h2>
          <div className='flex justify-center gap-6 text-2xl'>
            <a href='https://www.instagram.com/shreejayfurnitures?igsh=MXNyMjFpdGdjdDNwZQ==' target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
              <FiInstagram />
            </a>
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer' aria-label='Facebook'>
              <FiFacebook />
            </a>
            <a href='https://www.youtube.com/@nrendrababahai' target='_blank' rel='noopener noreferrer' aria-label='YouTube'>
              <FiYoutube />
            </a>
            <a href='https://www.linkedin.com/in/shree-jay-furniture-83567333b/' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'>
              <FiLinkedin />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='text-center mt-6 text-sm text-gray-500'>
          <p>© {new Date().getFullYear()} Pranay Shah Designs. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
