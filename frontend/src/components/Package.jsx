import React, { useState } from 'react';
import { FaCheck, FaStar, FaArrowRight, FaHome, FaBuilding, FaCrown, FaGem } from 'react-icons/fa';

function Package() {
  const [data] = useState([
    {
      title: "1 BHK Flat",
      subtitle: "Perfect for Singles & Couples",
      price: "5.5",
      currency: "Lakh",
      period: "Starting From",
      icon: <FaHome className="text-4xl text-[#D3AA62]" />,
      popular: false,
      description: [
        "Full Wooden Furniture",
        "Full POP Work",
        "Electrical Work with Lighting",
        "Best Branded Materials (ISI Certified)",
        "10 Year Warranty on Furniture and Workmanship",
        "Professional Installation and Setup",
        "Integrated Lighting for Modern Look",
        "Custom Designs for Living, Dining, and Bedrooms",
        "Premium Materials with 10 Year Warranty",
      ]
    },
    {
      title: "2 BHK Flat",
      subtitle: "Ideal for Small Families",
      price: "7",
      currency: "Lakh",
      period: "Starting From",
      icon: <FaBuilding className="text-4xl text-[#D3AA62]" />,
      popular: true,
      description: [
        "Full Wooden Furniture",
        "Full POP Work",
        "Electrical Work with Lighting",
        "Best Branded Materials (ISI Certified)",
        "10 Year Warranty on Furniture and Workmanship",
        "Professional Installation and Setup",
        "Integrated Lighting for Modern Look",
        "Custom Designs for Living, Dining, and Bedrooms",
        "Premium Materials with 10 Year Warranty",
      ]
    },
    {
      title: "3 BHK Flat",
      subtitle: "Perfect for Growing Families",
      price: "11",
      currency: "Lakh",
      period: "Starting From",
      icon: <FaCrown className="text-4xl text-[#D3AA62]" />,
      popular: false,
      description: [
        "Full Wooden Furniture",
        "Full POP Work",
        "Electrical Work with Lighting",
        "Best Branded Materials (ISI Certified)",
        "10 Year Warranty on Furniture and Workmanship",
        "Professional Installation and Setup",
        "Integrated Lighting for Modern Look",
        "Custom Designs for Living, Dining, and Bedrooms",
        "Premium Materials with 10 Year Warranty",
      ]
    },
    {
      title: "4 BHK Flat",
      subtitle: "Luxury Living Experience",
      price: "13.5",
      currency: "Lakh",
      period: "Starting From",
      icon: <FaGem className="text-4xl text-[#D3AA62]" />,
      popular: false,
      description: [
        "Full Wooden Furniture",
        "Full POP Work",
        "Electrical Work with Lighting",
        "Best Branded Materials (ISI Certified)",
        "10 Year Warranty on Furniture and Workmanship",
        "Professional Installation and Setup",
        "Integrated Lighting for Modern Look",
        "Custom Designs for Living, Dining, and Bedrooms",
        "Premium Materials with 10 Year Warranty",
      ]
    }
  ]);

  return (
    <div className="py-20 px-4 bg-gradient-to-b from-[#1A1A1A] via-[#0A0A0A] to-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 slide-up">
          <h1 className="heading-lg gradient-text mb-6">Our Packages</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect package for your space. All packages include premium materials, professional installation, and comprehensive warranty.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.map((item, index) => (
            <div 
              key={index} 
              className={`card-modern card-hover relative overflow-hidden ${
                item.popular ? 'ring-2 ring-[#D3AA62] scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {item.popular && (
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-[#D3AA62] to-[#F4D03F] text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <FaStar className="text-xs" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center p-6">
                {/* Icon */}
                <div className="mb-6">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="heading-sm text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{item.subtitle}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-4xl font-black text-[#D3AA62] mb-1">
                    ₹{item.price} {item.currency}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {item.period} 
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8 text-left">
                  {item.description.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <FaCheck className="text-[#D3AA62] text-sm mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  item.popular 
                    ? 'bg-gradient-to-r from-[#D3AA62] to-[#F4D03F] text-black hover:shadow-lg hover:scale-105' 
                    : 'bg-transparent border-2 border-[#D3AA62] text-[#D3AA62] hover:bg-[#D3AA62] hover:text-black'
                }`}>
                  Get Quote
                  <FaArrowRight className="inline-block ml-2 text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center slide-up">
          <div className="card-modern max-w-4xl mx-auto p-8">
            <h3 className="heading-md text-white mb-4">
              All Packages Include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-16 h-16 bg-[#D3AA62]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl text-[#D3AA62]" />
                </div>
                <h4 className="text-white font-semibold mb-2">Free Consultation</h4>
                <p className="text-gray-400 text-sm">Professional design consultation at no extra cost</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-[#D3AA62]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl text-[#D3AA62]" />
                </div>
                <h4 className="text-white font-semibold mb-2">10 Year Warranty</h4>
                <p className="text-gray-400 text-sm">Comprehensive warranty on all furniture and workmanship</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-[#D3AA62]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-2xl text-[#D3AA62]" />
                </div>
                <h4 className="text-white font-semibold mb-2">After-Sales Support</h4>
                <p className="text-gray-400 text-sm">Dedicated support team for maintenance and repairs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Package;
