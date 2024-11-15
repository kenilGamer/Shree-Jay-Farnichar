import Lottie from 'lottie-react'
import React, { useState, useEffect } from 'react'
import groovyWalkAnimation from '../../public/loader.json'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
function Loader() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);


  useGSAP(() => {
    // GSAP Animation (you can tweak this according to your needs)
    gsap.to(".loader-container", {
        scale: 0,
      opacity: 0, 
      duration: 1, 
      delay: 2, // Delay before fading out the loader
      onComplete: () => setIsAnimationComplete(true)
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex bg-black justify-center items-center  py-4 z-50 loader-container">
      <Lottie
        animationData={groovyWalkAnimation}
        loop={true}  // Optional: You can decide whether to loop the animation
        onComplete={() => setIsAnimationComplete(true)}
      />
      {/* {isAnimationComplete && <p>Animation Complete!</p>} */}
    </div>
  )
}

export default Loader;
