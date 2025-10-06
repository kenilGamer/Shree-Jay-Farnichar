import React, { useState } from 'react';
import { 
  FaHome, 
  FaBuilding, 
  FaPaintBrush, 
  FaCouch, 
  FaLightbulb, 
  FaTools, 
  FaCheckCircle, 
  FaArrowRight, 
  FaStar,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaClock,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
// import Topbar from '../partials/Topbar';
// import Navbar from '../partials/Navbar';

function Services() {
  const [activeService, setActiveService] = useState(0);

  const mainServices = [
    {
      icon: <FaHome className="text-4xl" />,
      title: "Residential Interior Design",
      description: "Transform your home into a personalized sanctuary with our comprehensive residential design services.",
      features: [
        "Living Room Design & Styling",
        "Bedroom Interior Solutions",
        "Kitchen Design & Renovation",
        "Bathroom Remodeling",
        "Space Planning & Optimization",
        "Color Scheme Consultation"
      ],
      color: "from-[#D3AA62] to-[#F4D03F]",
      bgColor: "from-[#D3AA62]/10 to-[#F4D03F]/10"
    },
    {
      icon: <FaBuilding className="text-4xl" />,
      title: "Commercial Interior Design",
      description: "Create professional, functional, and inspiring workspaces that boost productivity and reflect your brand.",
      features: [
        "Office Space Design",
        "Retail Store Layout",
        "Restaurant & Cafe Interior",
        "Hotel & Hospitality Design",
        "Corporate Branding Integration",
        "Workplace Wellness Solutions"
      ],
      color: "from-[#F4D03F] to-[#D3AA62]",
      bgColor: "from-[#F4D03F]/10 to-[#D3AA62]/10"
    },
    {
      icon: <FaCouch className="text-4xl" />,
      title: "Custom Furniture Design",
      description: "Handcrafted furniture pieces designed specifically for your space, style, and functional needs.",
      features: [
        "Custom Sofa & Seating",
        "Built-in Storage Solutions",
        "Dining Table & Chairs",
        "Bedroom Furniture Sets",
        "Office Desks & Cabinets",
        "Outdoor Furniture Design"
      ],
      color: "from-[#D3AA62] to-[#8B4513]",
      bgColor: "from-[#D3AA62]/10 to-[#8B4513]/10"
    },
    {
      icon: <FaPaintBrush className="text-4xl" />,
      title: "Complete Renovation",
      description: "End-to-end renovation services that transform your space from concept to completion.",
      features: [
        "Structural Modifications",
        "Electrical & Plumbing Work",
        "Flooring Installation",
        "Wall Treatments & Paint",
        "Lighting Design & Installation",
        "Final Styling & Accessories"
      ],
      color: "from-[#8B4513] to-[#D3AA62]",
      bgColor: "from-[#8B4513]/10 to-[#D3AA62]/10"
    }
  ];

  const additionalServices = [
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Lighting Design",
      description: "Strategic lighting solutions that enhance ambiance and functionality"
    },
    {
      icon: <FaTools className="text-2xl" />,
      title: "Project Management",
      description: "Complete project oversight from planning to final delivery"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Quality Assurance",
      description: "Rigorous quality checks ensuring highest standards"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Consultation Services",
      description: "Expert advice and design consultation for any project"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We discuss your vision, requirements, and budget to understand your needs.",
      icon: <FaPhone className="text-xl" />
    },
    {
      step: "02", 
      title: "Design & Planning",
      description: "Our team creates detailed designs and 3D visualizations of your space.",
      icon: <FaPaintBrush className="text-xl" />
    },
    {
      step: "03",
      title: "Material Selection",
      description: "We help you choose premium materials that match your style and budget.",
      icon: <FaCheckCircle className="text-xl" />
    },
    {
      step: "04",
      title: "Execution & Installation",
      description: "Professional installation and project management throughout the process.",
      icon: <FaTools className="text-xl" />
    },
    {
      step: "05",
      title: "Final Delivery",
      description: "Complete handover with final touches and quality assurance checks.",
      icon: <FaRocket className="text-xl" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] pt-20">
      
      
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 slide-up">
          <h1 className="heading-lg gradient-text mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            From concept to completion, we offer comprehensive interior design solutions that transform your space into a masterpiece of functionality and beauty.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {mainServices.map((service, index) => (
            <div 
              key={index}
              className={`card-modern card-hover group cursor-pointer transition-all duration-300 ${
                activeService === index ? 'ring-2 ring-[#D3AA62] scale-[1.02]' : ''
              }`}
              onClick={() => setActiveService(index)}
            >
              <div className={`p-6 bg-gradient-to-br ${service.bgColor} rounded-xl`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D3AA62] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <FaCheckCircle className="text-[#D3AA62] text-xs flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex items-center text-[#D3AA62] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn More</span>
                  <FaArrowRight className="ml-2 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-md gradient-text mb-4">Additional Services</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We also provide specialized services to ensure your project is complete and exceeds expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="card-modern card-hover group p-4">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-xl flex items-center justify-center text-black mx-auto group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D3AA62] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-md gradient-text mb-4">Our Process</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We follow a systematic approach to ensure your project is delivered on time, within budget, and exceeds your expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="card-modern card-hover group p-4 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center text-black mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold">{step.step}</span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D3AA62]/20 to-[#F4D03F]/20 rounded-xl flex items-center justify-center text-[#D3AA62] mx-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D3AA62] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-md gradient-text mb-4">Why Choose Our Services?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We combine decades of experience with modern design trends to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-modern p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center text-black mx-auto mb-4">
                <FaStar className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">30+ Years Experience</h3>
              <p className="text-gray-300 leading-relaxed">
                Three decades of expertise in interior design and furniture making, ensuring quality and reliability.
              </p>
            </div>
            
            <div className="card-modern p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center text-black mx-auto mb-4">
                <FaShieldAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lifetime Warranty</h3>
              <p className="text-gray-300 leading-relaxed">
                We stand behind our work with comprehensive lifetime warranties on all our furniture and services.
              </p>
            </div>
            
            <div className="card-modern p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-full flex items-center justify-center text-black mx-auto mb-4">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Client-Centric Approach</h3>
              <p className="text-gray-300 leading-relaxed">
                Your vision is our priority. We work closely with you to ensure every detail meets your expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card-modern max-w-4xl mx-auto p-8">
            <div className="space-y-6">
              <h3 className="heading-md gradient-text">Ready to Start Your Project?</h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Let's discuss your vision and create something extraordinary together. Get a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="/contact" className="btn-primary">
                  Get Free Consultation
                </a>
                <a href="tel:+919226104269" className="btn-secondary">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;