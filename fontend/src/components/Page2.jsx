import React from "react";
import { RiFileList3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Page2() {
  return (
    <div className="container mx-auto min-h-screen bg-[#202020] p-5 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-2xl md:text-3xl font-black uppercase text-center text-white mt-5 md:mt-10">
          Interior Designer, Decorators, Turnkey Solutions in Ahmedabad
        </h1>
        <p className="text-base md:text-xl w-full md:w-[80%] mt-4 text-center md:text-left">
          As Ahmedabad's largest{" "}
          <a
            href="https://www.google.com/search?q=home+decorating+services+in+ahmedabad"
            className="text-[#D3AA62]"
          >
            home decorating service provider
          </a>
          , we bring expert design and transformation to spaces across the entire city.
        </p>
        <p className="text-sm md:text-md mt-6 md:mt-10 text-center md:text-left">
          We are a team of highly experienced interior designers, decorators,
          and turnkey solution providers based in Ahmedabad, Gujarat. Our
          expertise in spatial planning, furniture curation, and customized
          design solutions ensures each project we undertake transforms into a
          space of unparalleled beauty and functionality...
        </p>
      </div>

      {/* Card Section */}
      <div className="flex flex-col h-auto md:h-[100vh] md:flex-row items-center max-w-6xl mx-auto gap-10 mt-10 md:-mt-20 p-4">
        {/* Left Card */}
        <div className="w-full md:w-[50%] h-auto md:h-[300px] bg-[#1D1D1D] p-4 flex flex-col gap-4 relative rounded-lg border-4 border-[#282828]">
          <h1 className="text-lg md:text-xl font-bold text-white">
            Standing Out in Interior Design: PSD's Vision for the Future
          </h1>
          <p className="text-base md:text-xl text-white w-[70%]">
            We differentiate ourselves by crafting innovative designs that address both present needs and future demands...
          </p>
          <div className="flex items-center gap-2 bg-[#282828] rounded-lg p-2 text-sm md:text-xl mt-10 w-[70%]">
            <RiFileList3Fill />
            <Link to="/" className="text-[#feca6f] italic hover:text-[#D3AA62] transition-all duration-300  font-bold">
              shreejayfarnichar@gmail.com
            </Link>
          </div>
          <div className="absolute top-[50%] right-[-5%] md:top-[30%] md:right-[-5%] w-[30%] h-[150px] bg-[#1D1D1D] rounded-lg flex flex-col items-center justify-center text-center border-4 border-[#282828]">
            <h1 className="text-lg md:text-xl font-bold text-white">Years of Experience</h1>
            <span className="text-lg md:text-xl py-2 px-1 text-center block w-[45px] mx-auto bg-[#292929] font-bold text-[#D3AA62] rounded-full mt-4">
              10+
            </span>
          </div>
        </div>

        {/* Right Card */}
        <div className="w-full md:w-[50%] h-auto md:h-[300px] bg-[#1D1D1D] p-4 flex flex-col items-center gap-4 relative rounded-lg border-4 border-[#282828]">
          <h1 className="text-lg md:text-xl font-bold text-white text-center">
            We provide clients with the highest possible level of services in Ahmedabad by our interior designers.
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 rounded-lg p-2 w-full md:w-[80%] mx-auto text-base md:text-xl">
            <div className="flex items-center justify-center text-center gap-2 flex-col">
              <img src="/Interior-150x150.png" alt="" className="w-[50px] h-[50px] rounded-full" />
              <h1 className="text-white font-bold">Interior Designer</h1>
            </div>
            <div className="w-[80%] md:w-[1px] h-[1px] md:h-[100px] bg-[#5f5f5f]" />
            <div className="flex items-center justify-center text-center gap-2 flex-col">
              <img src="/6406gggg3-Converted-Recovered-01-1536x1536.png" alt="" className="w-[50px] h-[50px] rounded-full" />
              <h1 className="text-white font-bold">Interior Decorator</h1>
            </div>
            <div className="w-[80%] md:w-[1px] h-[1px] md:h-[100px] bg-[#5f5f5f]" />
            <div className="flex items-center justify-center text-center gap-2 flex-col">
              <img src="/sketch.png" alt="" className="w-[50px] h-[50px] rounded-full" />
              <h1 className="text-white font-bold">Turnkey Solutions</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2;
