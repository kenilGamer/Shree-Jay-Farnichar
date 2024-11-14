import React, { useState } from 'react';
import Crad from '../partials/Crad';

function Package() {
  const [data] = useState([
    {
      title: "1 BHK Flat – Only ₹4.5 Lakh",
      price: "4.5 Lakh",
      description: [
        "Full Wooden Furniture",
        "Full POP Work",
        "Electrical Work with Lighting",
        "Best Branded Materials (ISI Certified)",
        "Lifetime Warranty on Furniture and Workmanship",
        "Professional Installation and Setup"
      ]
    },
    {
      title: "2 BHK Flat – Only ₹7 Lakh",
      price: "7 Lakh",
      description: [
        "Complete Interior Design with Customizable Furniture",
        "High-Quality Wood and Finishes",
        "Full Color Work & POP Designs",
        "Electrical and Lighting Solutions",
        "Lifetime Warranty and Post-Installation Support"
      ]
    },
    {
      title: "3 BHK Flat – Only ₹9 Lakh",
      price: "9 Lakh",
      description: [
        "Full Furnishing with Wooden Furniture",
        "Color POP Work and Electrical Setup",
        "Integrated Lighting for Modern Look",
        "Custom Designs for Living, Dining, and Bedrooms",
        "Premium Materials with Lifetime Guarantee"
      ]
    },
    {
      title: "4 BHK Flat – Only ₹10.9 Lakh",
      price: "10.9 Lakh",
      description: [
        "Fully Furnished with Designer Wooden Furniture",
        "Customized POP Work and Lighting Solutions",
        "High-End Electrical and Plumbing Installations",
        "Space Optimization with Premium Materials",
        "Lifetime Warranty and Ongoing Support"
      ]
    }
  ]);

  return (
    <div className="min-h-screen p-3 bg-[#202020] text-white">
      <h1 className="text-2xl md:text-3xl font-black uppercase text-center mt-3 mb-6">Our Packages</h1>
      <div className="flex flex-wrap justify-center  mx-auto gap-10">
        {data.map((item, index) => (
          <Crad
            key={index}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Package;
