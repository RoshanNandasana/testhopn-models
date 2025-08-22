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
import CompanyRegistrationForm from "./components/CompanyRegistration/CompanyRegistrationForm";
import CompanyTypeStep from './components/CompanyRegistration/CompanyTypeStep';
import CompanyRegisterFlow from './components/CompanyRegistration/CompanyRegisterFlow';


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
          <Route path="/register-company" element={<CompanyRegistrationForm />} />
          <Route path="/register/company/type" element={<CompanyTypeStep setStep={() => {}} />} />
            <Route path="/register/company/type" element={<CompanyRegisterFlow />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
