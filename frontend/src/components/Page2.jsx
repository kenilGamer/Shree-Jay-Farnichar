import React, { useState, useEffect } from "react";
import { RiFileList3Fill, RiAwardFill, RiBuilding4Fill, RiToolsFill, RiKeyFill, RiGovernmentFill } from "react-icons/ri";
import { FaArrowRight, FaQuoteLeft, FaStar, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Page2() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <RiAwardFill className="text-4xl" />,
      title: "Interior Designer",
      description: "Expert spatial planning and design",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <RiBuilding4Fill className="text-4xl" />,
      title: "Builder Contractor",
      description: "Complete construction solutions",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <RiToolsFill className="text-4xl" />,
      title: "Turnkey Solutions",
      description: "End-to-end project management",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <RiKeyFill className="text-4xl" />,
      title: "Key to Key Project",
      description: "Complete project delivery",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <RiGovernmentFill className="text-4xl" />,
      title: "Government Projects",
      description: "Reliable public sector solutions",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: <FaCheckCircle /> },
    { number: "30+", label: "Years Experience", icon: <FaStar /> },
    { number: "100%", label: "Client Satisfaction", icon: <FaCheckCircle /> },
    { number: "24/7", label: "Support Available", icon: <FaCheckCircle /> }
  ];

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D3AA62] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F4D03F] rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D3AA62]/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-[#D3AA62]/10 text-[#D3AA62] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <FaStar className="text-xs" />
            Ahmedabad's Premier Interior Designers
          </div>
          
          <h1 className="heading-xl text-white mb-6 leading-tight">
            Interior Designer, Decorators, Turnkey Solutions in 
            <span className="gradient-text block">Ahmedabad</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            As Ahmedabad's largest{" "}
            <a
              href="https://www.google.com/search?q=home+decorating+services+in+ahmedabad"
              className="text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300 font-semibold underline decoration-[#D3AA62]/50 underline-offset-4"
            >
              home decorating service provider
            </a>
            , we bring expert design and transformation to spaces across the entire city.
          </p>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We are a team of highly experienced interior designers, decorators,
            and turnkey solution providers based in Ahmedabad, Gujarat. Our
            expertise in spatial planning, furniture curation, and customized
            design solutions ensures each project we undertake transforms into a
            space of unparalleled beauty and functionality.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Vision Card */}
          <div className={`card-modern card-hover relative overflow-hidden group transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D3AA62]/20 to-[#F4D03F]/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#F4D03F]/20 to-[#D3AA62]/20 rounded-full translate-y-12 -translate-x-12 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="page2-vision-card relative z-10 p-6 lg:p-8">
              {/* Experience Badge - Repositioned */}
              <div className="page2-experience-badge absolute top-4 right-4 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] text-black p-4 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                  <h3 className="text-xs font-bold mb-1">Years of Experience</h3>
                  <span className="text-2xl font-black">30+</span>
                </div>
              </div>
              
              <div className="page2-vision-header flex items-center gap-3 mb-6 pr-24">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-xl flex items-center justify-center">
                  <RiFileList3Fill className="text-2xl text-black" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white">Our Vision</h2>
                  <p className="text-[#D3AA62] text-sm font-semibold">Standing Out in Interior Design</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg pr-4">
                We differentiate ourselves by crafting innovative designs that address both present needs and future demands. Our approach combines traditional craftsmanship with modern technology to create spaces that are both beautiful and functional.
              </p>
              
              <div className="email-container flex items-center gap-4 bg-[#D3AA62]/10 rounded-xl p-4 w-full group-hover:bg-[#D3AA62]/20 transition-all duration-300 hover:shadow-lg border border-[#D3AA62]/20">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-lg flex items-center justify-center flex-shrink-0">
                  <RiFileList3Fill className="text-[#D3AA62] text-lg" />
                </div>
                <Link 
                  to="/contact" 
                  className="text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300 font-semibold flex items-center gap-2 flex-1 min-w-0"
                >
                  <span>bhumiinteriorsolution@gmail.com</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                </Link>
              </div>
            </div>
            
          </div>

          {/* Services Card */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="card-modern p-8 h-full">
              <div className="text-center mb-8">
                <h2 className="heading-md text-white mb-4">
                  We provide clients with the highest possible level of services
                </h2>
                <p className="text-gray-400">in Ahmedabad by our interior designers</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className={`p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer group hover:shadow-lg ${
                      activeService === index 
                        ? 'border-[#D3AA62] bg-[#D3AA62]/10 shadow-lg transform scale-[1.02]' 
                        : 'border-[#333] bg-[#1A1A1A] hover:border-[#D3AA62]/50 hover:bg-[#D3AA62]/5'
                    }`}
                    onClick={() => setActiveService(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg group-hover:text-[#D3AA62] transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {service.description}
                        </p>
                      </div>
                      <FaArrowRight className={`text-[#D3AA62] transition-all duration-300 ${
                        activeService === index ? 'translate-x-1' : 'group-hover:translate-x-1'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="card-modern card-hover text-center p-6 group relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D3AA62]/5 to-[#F4D03F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-black text-2xl">{stat.icon}</span>
                </div>
                <div className="text-4xl font-black text-[#D3AA62] mb-2 group-hover:scale-105 transition-transform duration-300">{stat.number}</div>
                <div className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <div className={`text-center transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="card-modern max-w-4xl mx-auto p-12 relative">
            <FaQuoteLeft className="text-6xl text-[#D3AA62]/20 absolute top-6 left-6" />
            <blockquote className="text-2xl md:text-3xl text-white font-medium leading-relaxed mb-8 relative z-10">
              "We don't just design spaces, we create experiences that transform the way you live, work, and feel in your environment."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
                  <img src="/logo.png" alt="Bhumi Interior Solution" className="w-full h-full object-contain" />
                </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">Bhumi Interior Solution</div>
                <div className="text-[#D3AA62] text-sm">Interior Designers & Furniture Makers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2;