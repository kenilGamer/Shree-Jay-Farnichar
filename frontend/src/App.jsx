import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import About from "./components/About";
import Services from "./components/Services";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Updateanddelete from "./components/Updateanddelete";
import Topbar from "./partials/Topbar";
import Navbar from "./partials/Navbar";
import LocomotiveScroll from "locomotive-scroll";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import AuthGuard from "./components/AuthGuard";
import NotFound from "./components/NotFound";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, []);


  return (
    <div className="bg-black w-full">
      {isLoading ? (
        <div className="flex absolute top-0 left-0 w-full h-screen justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={
              <>
                <Topbar />
                <Navbar />
                <Gallery />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Topbar />
                <Navbar />
                <Contact />
              </>
            } />
            <Route path="/about" element={
              <>
                <Topbar />
                <Navbar />
                <About />
              </>
            } />
            <Route path="/services" element={
              <>
                <Topbar />
                <Navbar />
                <Services />
              </>
            } />
            <Route path="/login" element={
              <>
                <Topbar />
                <Navbar />
                <Login />
              </>
            } />
            <Route path="/dashboard" element={
              <>
                <Topbar />
                <Navbar />
                <AuthGuard><Dashboard /></AuthGuard>
              </>
            } />
            <Route path="/updateanddelete" element={
              <>
                <Topbar />
                <Navbar />
                <AuthGuard><Updateanddelete /></AuthGuard>
              </>
            } />
            <Route path="*" element={
              <>
                <Topbar />
                <Navbar />
                <NotFound />
              </>
            } />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
