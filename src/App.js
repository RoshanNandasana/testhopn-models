import React from "react";
import "./App.css";
import Navbar from "./components/homepage/Navbar";
import HeroSection from "./components/homepage/HeroSection";
import PlatformSection from "./components/homepage/PlatformSection";
import Footer from "./components/homepage/Footer";


export default function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <HeroSection />
        <PlatformSection />
      </main>
      <Footer />
    </div>
  )
}