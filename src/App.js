import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import "./App.css";

// Components
import Navbar from "./components/homepage/Navbar";
import HeroSection from "./components/homepage/HeroSection";
import PlatformSection from "./components/homepage/PlatformSection";
import Footer from "./components/homepage/Footer";

// Pages
import Gallery from "./components/gallery/view";
import RegisterModel from "./components/registremodel/registermodel";
import ModelProfile from "./components/gallery/ModelProfile";
import RegistrationPage from "./components/CompanyRegistration/RegistrationPage"; // <-- Use your switcher here

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          {/* Homepage */}
          <Route 
            path="/" 
            element={
              <main>
                <HeroSection />
                <PlatformSection />
              </main>
            } 
          />
          {/* Routes */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<RegisterModel />} />
          <Route path="/model-profile" element={<ModelProfile />} />
          {/* Use RegistrationPage for company registration */}
          <Route path="/register-company" element={<RegistrationPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
