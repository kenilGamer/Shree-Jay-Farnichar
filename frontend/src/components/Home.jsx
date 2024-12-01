import React, { useState } from 'react';
import Navbar from '../partials/Navbar';
import Topbar from '../partials/Topbar';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Package from './Package';
import Footer from './Footer';
import LocomotiveScroll from 'locomotive-scroll';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      autoResize: true,
      smoothScrolling: true,
      // wrapper: window,
      // content: document.documentElement,
      lerp: 0.7,
      firefoxMultiplier: 10,
      resetNativeScroll: true,
      duration: 4.2,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1.3,
      touchMultiplier: 2,
      normalizeWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    },
  });
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
         <div className='mt-[300vh]'>
         <Footer/>
         </div> 
        </div>
      </div>
    </>
  );
}

export default Home;
