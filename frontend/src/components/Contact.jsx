import React, { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'
import Topbar from '../partials/Topbar'
import Navbar from '../partials/Navbar'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  // Get package parameter from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const packageParam = urlParams.get('package');
    if (packageParam) {
      setSelectedPackage(packageParam);
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in the ${packageParam} package. Please provide more details.`
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] pt-20">
        <Topbar />
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card-modern p-12">
              <FaCheckCircle className="text-6xl text-[#D3AA62] mx-auto mb-6" />
              <h2 className="heading-lg text-white mb-4">Thank You!</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A] pt-20">
      
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="heading-lg gradient-text mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your space? Contact us for a free consultation and let's bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card-modern p-8">
              <h2 className="heading-md text-white mb-6">Send Us a Message</h2>
              {selectedPackage && (
                <div className="mb-6 p-4 bg-gradient-to-r from-[#D3AA62]/20 to-[#F4D03F]/20 rounded-xl border border-[#D3AA62]/30">
                  <p className="text-[#D3AA62] font-semibold">
                    📦 Interested in: <span className="text-white">{selectedPackage}</span>
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-gray-400 focus:border-[#D3AA62] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-gray-400 focus:border-[#D3AA62] focus:outline-none transition-colors duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-gray-400 focus:border-[#D3AA62] focus:outline-none transition-colors duration-300"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-4 rounded-xl bg-[#1A1A1A] border border-white/10 text-white placeholder-gray-400 focus:border-[#D3AA62] focus:outline-none transition-colors duration-300 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
                </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card-modern p-8">
                <h3 className="heading-md text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-black text-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Phone</h4>
                      <a href="tel:+919226104269" className="text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300">
                        +91 92261 04269
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-black text-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email</h4>
                      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bhumiinteriorsolution@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#D3AA62] hover:text-[#F4D03F] transition-colors duration-300 break-all">
                        bhumiinteriorsolution@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D3AA62] to-[#F4D03F] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-black text-lg" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Location</h4>
                      <p className="text-gray-300">Ahmedabad, Gujarat, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-modern p-8">
                <h3 className="heading-md text-white mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=bhumiinteriorsolution@gmail.com&su=Free Quote Request"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary text-center block"
                  >
                    Get Free Quote
                  </a>
                  <a 
                    href="tel:+919226104269"
                    className="w-full btn-secondary text-center block"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
            </div>
        </div>
    </div>
  )
}

export default Contact