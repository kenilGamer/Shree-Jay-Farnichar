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
    <div className="bg-black w-full">
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
    </div>
  );
}

export default App;
