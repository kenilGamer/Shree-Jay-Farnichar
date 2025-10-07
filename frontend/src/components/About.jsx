import React from 'react';
import { FaAward, FaUsers, FaCogs, FaKey, FaBuilding, FaLightbulb, FaHeart, FaRocket, FaShieldAlt, FaHandshake, FaStar, FaTrophy, FaPaintBrush, FaHome, FaCog, FaCheckCircle } from 'react-icons/fa';

const About = () => {
  const expertise = [
    {
      icon: <FaPaintBrush className="text-2xl text-[#D3AA62]" />,
      title: "Interior Design",
      description: "Creating stylish and functional spaces tailored to your needs with innovative design solutions."
    },
    {
      icon: <FaHome className="text-2xl text-[#D3AA62]" />,
      title: "Spatial Planning",
      description: "Optimizing the use of space for maximum efficiency and comfort in every project."
    },
    {
      icon: <FaCog className="text-2xl text-[#D3AA62]" />,
      title: "Furniture Curation",
      description: "Custom furniture solutions designed to enhance your space with premium materials."
    },
    {
      icon: <FaKey className="text-2xl text-[#D3AA62]" />,
      title: "Turnkey Projects",
      description: "End-to-end services including design, electrical, plumbing, and installation."
    }
  ];

  const whyChooseUs = [
    {
      icon: <FaUsers className="text-2xl text-[#D3AA62]" />,
      title: "Experienced Professionals",
      description: "A dedicated team of skilled craftsmen and designers with years of expertise."
    },
    {
      icon: <FaShieldAlt className="text-2xl text-[#D3AA62]" />,
      title: "High-Quality Materials",
      description: "Only premium, ISI-certified materials for durability and aesthetic appeal."
    },
    {
      icon: <FaTrophy className="text-2xl text-[#D3AA62]" />,
      title: "Lifetime Warranty",
      description: "Offering lifetime warranties on all furniture and services for your peace of mind."
    },
    {
      icon: <FaHandshake className="text-2xl text-[#D3AA62]" />,
      title: "Client-Centric Approach",
      description: "We work closely with you to ensure your vision becomes a beautiful reality."
    }
  ];

  const stats = [
    { number: "5+", label: "Years of Experience", icon: <FaAward className="text-3xl text-[#D3AA62]" /> },
    { number: "50+", label: "Projects Completed", icon: <FaBuilding className="text-3xl text-[#D3AA62]" /> },
    { number: "100%", label: "Client Satisfaction", icon: <FaStar className="text-3xl text-[#D3AA62]" /> },
    { number: "24/7", label: "Customer Support", icon: <FaCogs className="text-3xl text-[#D3AA62]" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] pt-32">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 slide-up">
          <h1 className="heading-lg gradient-text mb-6">
            About Lumelight Interior - Leading Interior Design Company in Ahmedabad, Gujarat
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Lumelight Interior is Ahmedabad's premier interior design company, transforming spaces with excellence. We are passionate creators dedicated to bringing your interior design dreams to life with innovative solutions, spatial planning expertise, and unmatched craftsmanship in furniture curation.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="card-modern text-center group p-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                  <p className="text-gray-300 font-medium">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Our Expertise Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-md gradient-text mb-4">Our Expertise</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We specialize in comprehensive interior design solutions that transform spaces into beautiful, functional environments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <div key={index} className="card-modern card-hover group p-4">
                <div className="text-center space-y-4">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-md gradient-text mb-4">Why Choose Us?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our commitment to excellence and client satisfaction sets us apart in the interior design industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="card-modern card-hover group p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="card-modern p-4">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto">
                <FaRocket className="text-2xl text-black" />
              </div>
              <h3 className="heading-sm text-white">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To provide our clients with the highest quality interior designs and solutions that exceed expectations, 
                while maintaining the highest standards of craftsmanship and customer service. We strive to create 
                spaces that inspire, comfort, and reflect the unique personality of each client.
              </p>
            </div>
          </div>

          <div className="card-modern p-4">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center mx-auto">
                <FaLightbulb className="text-2xl text-black" />
              </div>
              <h3 className="heading-sm text-white">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become the foremost name in Gujarat for distinctive and innovative interior design solutions. 
                We envision a future where every space we touch becomes a masterpiece of functionality and beauty, 
                setting new standards in the industry and inspiring others to dream bigger.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <div className="card-modern max-w-4xl mx-auto p-4">
            <div className="space-y-6">
              <h3 className="heading-md gradient-text">Ready to Transform Your Space?</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Let us bring your interior design vision to life with our expertise, quality materials, and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="/contact" className="btn-primary">
                  Get Free Quote
                </a>
                <a href="/gallery" className="btn-secondary">
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;