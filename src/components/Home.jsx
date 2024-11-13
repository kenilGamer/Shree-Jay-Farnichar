import React from 'react';
import Navbar from '../partials/Navbar';
import Topbar from '../partials/Topbar';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Package from './Package';
import Footer from './Footer';

function Home() {
  return (
    <>
      <div className="text-white wallparr h-[122vh] ">
        <div className="w-full mx-auto bg-black p-3">
          <Topbar />
          <div className="mt-4">
            <Navbar />
          </div>
        </div>
        <div className='h-screen'>
         <div className='mb-96'>
         <Page1 />
         <Page2/>
         <Package/>
         <Page3/>
         </div>
         <Footer/>
        </div>
      </div>
    </>
  );
}

export default Home;
