import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import About from "./components/About";
import Services from "./components/Services";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Updateanddelete from "./components/Updateanddelete";
function App() {
  return (
    <div className="bg-black  w-full " >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/updateanddelete" element={<Updateanddelete />} />
      </Routes>
    </div>
  );
}

export default App;
