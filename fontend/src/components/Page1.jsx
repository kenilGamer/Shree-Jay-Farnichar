import React from 'react';
import Crad from '../partials/Crad';
import { Link } from 'react-router-dom';

function Page1() {
    const data = [
        {
            title: "Handcrafted Luxury with a Touch of Artistry",
            subTitle: "Artisanal Luxe Furnishings",
            description: "Handcrafted, luxurious furniture with a touch of artistry, adding elegance to any room."
        },
        {
            title: "Timeless Elegance Collection",
            subTitle: "Crafted with Precision",
            description: "Timeless elegance with a touch of modern sophistication, designed to last a lifetime."
        },
        {
            title: "Sleek Modern Design",
            subTitle: "Contemporary Chic",
            description: "Sleek and modern furniture that blends functionality with contemporary aesthetics."
        },
        {
            title: "Eco-Friendly Materials",
            subTitle: "Sustainable Luxury",
            description: "Eco-friendly furniture made from sustainable materials, promoting a greener lifestyle."
        },
        {
            title: "Customizable Options",
            subTitle: "Tailored to Perfection",
            description: "Customizable furniture to meet your unique style and needs, ensuring a perfect fit."
        }
    ];

    return (
        <div className="flex flex-col justify-center items-center w-full gap-8 p-6 h-screen">
            {/* Heading */}
            <div className="text-center px-4 -mt-44 lg:px-0">
                <h1 className="text-2xl md:text-4xl font-black text-[#D3AA62]">
                    Transforming Spaces with Timeless Elegance
                </h1>
                <p className="text-sm md:text-md mt-2">
                    Vadodara’s Premier Interior Designers - Expertise in Spatial Planning & Furniture Curation
                </p>
                <Link to="/services" className="bg-[#D3AA62] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#D3AA62]/80 transition duration-300 block w-fit mx-auto">Explore Our Work</Link>
            </div>
        </div>
    );
}

export default Page1;
