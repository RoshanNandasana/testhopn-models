import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import "./App.css";
import Navbar from "./components/homepage/Navbar";
import HeroSection from "./components/homepage/HeroSection";
import PlatformSection from "./components/homepage/PlatformSection";
import Footer from "./components/homepage/Footer";
import Gallery from './components/gallery/view';
import Registermodel from "./components/registremodel/registermodel";
import ModelProfile from "./components/gallery/ModelProfile";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={
            <main>
              <HeroSection />
              <PlatformSection />
            </main>
          } />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<Registermodel />} />
          <Route path="/ModelProfile" element={<ModelProfile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}