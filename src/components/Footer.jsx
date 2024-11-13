import React from 'react';
import { FiLinkedin, FiFacebook, FiYoutube, FiInstagram } from 'react-icons/fi';

function Footer() {
  return (
    <div className='bg-[#1D1D1D] py-10 text-white max-md:mt-[600px] relative'>
      <div className='container mx-auto px-6 md:px-12'>
        {/* Contact Information */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-10'>
          <div>
            <h1 className='text-2xl font-black uppercase mb-4'>Pranay Shah Designs</h1>
            <p>401-B Mangal Sai Apartment, Opp. Baroda High School, 84 Alkapuri,<br />
              Vadodara - 390007, Gujarat, India.</p>
            <p>Email: <a href='mailto:info@pranayshahdesigns.com' className='text-[#D3AA62]'>info@pranayshahdesigns.com</a></p>
            <p>Phone: <a href='tel:+919998769186' className='text-[#D3AA62]'>+91 9998769186</a></p>
          </div>

          {/* Services */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>Interior Designing Services</h2>
            <ul className='space-y-2'>
              <li>Bungalow Interior</li>
              <li>Flat Interior</li>
              <li>Duplex Interior</li>
              <li>Apartment Interior</li>
              <li>Turnkey Interior</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>Useful Links</h2>
            <ul className='space-y-2'>
              <li><a href='#testimonials' className='hover:text-[#D3AA62]'>Testimonials</a></li>
              <li><a href='#why-psd' className='hover:text-[#D3AA62]'>Why PSD?</a></li>
              <li><a href='#projects' className='hover:text-[#D3AA62]'>Projects</a></li>
              <li><a href='#contact-us' className='hover:text-[#D3AA62]'>Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className='text-center mt-10'>
          <h2 className='text-lg font-semibold mb-4'>We Are Social</h2>
          <div className='flex justify-center gap-6 text-2xl'>
            <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
              <FiInstagram />
            </a>
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer' aria-label='Facebook'>
              <FiFacebook />
            </a>
            <a href='https://www.youtube.com/' target='_blank' rel='noopener noreferrer' aria-label='YouTube'>
              <FiYoutube />
            </a>
            <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'>
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
