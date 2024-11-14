import React, { useEffect, useState } from 'react';
import TopNav from '../partials/Topbar';
import Navbar from '../partials/Navbar';
import axios from 'axios'; // Import axios for HTTP requests

function Services() {
  const [data, setData] = useState([]);
  const [services, setServices] = useState([]); // Added state for services

  const fetchData = async () => {
    const response = await axios.get(`https://shree-jay-farnichar.onrender.com/gallery`);
    setData(response.data);
    console.log(response.data);
    setServices(response.data); // Set services state with fetched data
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <TopNav />
      <Navbar />
      <div className="min-h-screen py-2 px-6">
        <h1 className="text-white text-3xl font-black uppercase text-center mb-10">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="bg-[#1D1D1D] p-4 rounded-lg border-4 border-[#282828] shadow-lg">
              <img src={`http://localhost:3000/uploads/${service.image}`} alt={service.title} className="w-full h-48 object-cover rounded-md" />
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
