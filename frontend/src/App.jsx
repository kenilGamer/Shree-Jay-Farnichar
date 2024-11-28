import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import About from "./components/About";
import Services from "./components/Services";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Updateanddelete from "./components/Updateanddelete";
import LocomotiveScroll from "locomotive-scroll";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AuthGuard from "./components/AuthGuard";
import NotFound from "./components/NotFound";
  function App() {
    
 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);

    }, 2000);
  }, []);


  return (
    <div
      className="bg-black w-full"
    >
        {isLoading && (
          <div className="flex absolute top-0 left-0 w-full h-screen justify-center items-center ">
            <Loader /> 
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/updateanddelete" element={<AuthGuard><Updateanddelete /></AuthGuard>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </div>
  );
}

export default App;
