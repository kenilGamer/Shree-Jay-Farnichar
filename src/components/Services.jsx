import React from 'react';
import TopNav from '../partials/Topbar';
import Navbar from '../partials/Navbar';
function Services() {
  const services = [
    {
      title: "Living Room Design",
      image: "/public/img1.jpg",
      description: "Transform your living room with custom furniture, lighting, and layout solutions.",
    },
    {
      title: "Bedroom Interiors",
      image: "/public/img2.jpg",
      description: "Stylish and cozy bedroom designs tailored to your taste and comfort.",
    },
    {
      title: "Modular Kitchens",
      image: "/public/img3.jpg",
      description: "Efficient and modern kitchen layouts with high-quality finishes.",
    },
    {
      title: "Office Spaces",
      image: "/public/img4.jpg",
      description: "Functional and professional office designs to enhance productivity.",
    },
    {
      title: "Commercial Interiors",
      image: "/public/img5.jpg",
      description: "Elegant and efficient designs for showrooms, shops, and more.",
    },
    {
      title: "Outdoor Furniture",
      image: "/public/img6.jpg",
      description: "Durable and stylish outdoor setups for your patios and gardens.",
    },
  ];

  return (
    <div>
    <TopNav/>
    <Navbar/> 
    <div className="min-h-screen py-2 px-6" >
      
      <h1 className="text-white text-3xl font-black uppercase text-center mb-10">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div key={index} className="bg-[#1D1D1D] p-4 rounded-lg border-4 border-[#282828] shadow-lg">
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-md" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-[#D3AA62] mb-2">{service.title}</h2>
              <p className="text-white text-md">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Services;
