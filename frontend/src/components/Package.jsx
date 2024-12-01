import React, { useState } from 'react';
import Crad from '../partials/Crad';

function Package() {
  const [data] = useState([
    {
      title: "1 BHK Flat – Starting ₹5.5 Lakh",
      price: "5.5 Lakh",
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
      title: "2 BHK Flat – Starting ₹7 Lakh",
      price: "7 Lakh",
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
      title: "3 BHK Flat – Starting ₹11 Lakh",
      price: "11 Lakh",
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
      title: "4 BHK Flat – Starting ₹13.5 Lakh",
      price: "13.5 Lakh",
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
