import React from 'react';

function Crad({ title, price, description }) {
  return (
    <div className="p-6 flex flex-col gap-4 rounded-lg items-start w-full sm:w-[50vh] bg-[#1D1D1D] border-4 border-[#282828]">
      <h1 className="text-xl font-bold text-white">{title}</h1>
      <h1 className="text-3xl font-black text-[#D3AA62]">{price}</h1>
      <div className="text-md text-white space-y-2">
        {description.map((item, index) => (
          <p key={index}>◉ {item}</p>
        ))}
      </div>
    </div>
  );
}

export default Crad;
