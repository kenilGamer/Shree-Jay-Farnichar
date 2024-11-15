import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import About from "./components/About";
import Services from "./components/Services";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Updateanddelete from "./components/Updateanddelete";
import groovyWalkAnimation from "../public/Animation - 1731667421897.json";
import Lottie from "lottie-react";
import { useState, useEffect } from "react";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsAnimationComplete(true);
    }, 2100);
  }, []);

  return (
    <div
      className="bg-black w-full"
      onLoad={() => setIsLoading(false)}
      onAnimationEnd={() => setIsAnimationComplete(true)}
      // onLoadCapture={() => setIsLoading(false)}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie
            animationData={groovyWalkAnimation}
            onComplete={() => setIsAnimationComplete(true)}
          />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updateanddelete" element={<Updateanddelete />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
