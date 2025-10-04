import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaAward, FaLeaf, FaCog, FaPalette } from 'react-icons/fa';

function Page1() {
    const features = [
        {
            icon: <FaStar className="text-4xl text-[#D3AA62]" />,
            title: "Handcrafted Luxury",
            subTitle: "Artisanal Excellence",
            description: "Handcrafted, luxurious furniture with a touch of artistry, adding elegance to any room."
        },
        {
            icon: <FaAward className="text-4xl text-[#D3AA62]" />,
            title: "Timeless Elegance",
            subTitle: "Crafted with Precision",
            description: "Timeless elegance with modern sophistication, designed to last a lifetime."
        },
        {
            icon: <FaPalette className="text-4xl text-[#D3AA62]" />,
            title: "Modern Design",
            subTitle: "Contemporary Chic",
            description: "Sleek and modern furniture that blends functionality with contemporary aesthetics."
        },
        {
            icon: <FaLeaf className="text-4xl text-[#D3AA62]" />,
            title: "Eco-Friendly",
            subTitle: "Sustainable Luxury",
            description: "Eco-friendly furniture made from sustainable materials, promoting a greener lifestyle."
        },
        {
            icon: <FaCog className="text-4xl text-[#D3AA62]" />,
            title: "Customizable",
            subTitle: "Tailored to Perfection",
            description: "Customizable furniture to meet your unique style and needs, ensuring a perfect fit."
        }
    ];

    return (
        <div className="py-20 px-4 bg-gradient-to-b from-black via-[#0A0A0A] to-[#1A1A1A]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 slide-up">
                    <h2 className="heading-lg gradient-text mb-6">
                        Why Choose Shree Jay Furniture?
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We combine decades of experience with innovative design to create spaces that reflect your unique style and personality.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="card-modern card-hover group"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="text-center">
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="heading-sm text-white mb-3 group-hover:text-[#D3AA62] transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-[#D3AA62] font-semibold mb-4 uppercase tracking-wider">
                                    {feature.subTitle}
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center slide-up">
                    <div className="card-modern max-w-4xl mx-auto p-8">
                        <h3 className="heading-md text-white mb-4">
                            Ready to Transform Your Space?
                        </h3>
                        <p className="text-gray-300 mb-8 text-lg">
                            Let our expert team create the perfect interior solution for your home or office.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/services" className="btn-primary inline-flex items-center gap-2">
                                Explore Our Services
                                <FaArrowRight className="text-sm" />
                            </Link>
                            <Link to="/contact" className="btn-secondary">
                                Get Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page1;
