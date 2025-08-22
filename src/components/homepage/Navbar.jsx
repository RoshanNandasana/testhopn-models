import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import SignUpModal from "./SignUpModal";
import EmailSignUpModal from "./EmailSignUpModal";
import ClientAccountTypeModal from "./ClientAccountTypeModal";
import OTPModal from "./OTPModal";
import RegisterModel from "../registremodel/registermodel";

const Navbar = () => {
  const navigate = useNavigate();

  // Menu and language dropdown states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangOptions, setShowLangOptions] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  // Modal states
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [emailSignupOpen, setEmailSignupOpen] = useState(false);
  const [clientAccountModalOpen, setClientAccountModalOpen] = useState(false);

  // OTP state
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpType, setOtpType] = useState("");
  const [otpTo, setOtpTo] = useState("");

  // Refs for detecting outside clicks
  const menuRef = useRef(null);
  const langRef = useRef(null);

  // Language selector
  const handleLangSelect = (lang, e) => {
    e.preventDefault();
    setSelectedLang(lang);
    setShowLangOptions(false);
  };

  // Close menu/language dropdown if user clicks outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
    if (langRef.current && !langRef.current.contains(event.target)) {
      setShowLangOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <header className="navbar">
        {/* Brand */}
        <div className="navbar__brand">
          <div>HOPn</div>
          <div>Models</div>
        </div>

        {/* Hamburger menu (mobile) */}
        <div className="navbar__hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span><span></span><span></span>
        </div>

        {/* Navigation links */}
        <nav className={`navbar__links ${isMenuOpen ? "open" : ""}`} ref={menuRef}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Models</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>

          {/* Language dropdown */}
          <div
            className="navbar__lang"
            onClick={() => setShowLangOptions((prev) => !prev)}
            ref={langRef}
          >
            <div className="selected">
              {selectedLang}
              <span className="dropdown-arrow"></span>
            </div>
            <ul className="options" style={{ display: showLangOptions ? "block" : "none" }}>
              <li onClick={(e) => handleLangSelect("English", e)}>English</li>
              <li onClick={(e) => handleLangSelect("Deutsch", e)}>Deutsch</li>
              <li onClick={(e) => handleLangSelect("العربية", e)}>العربية</li>
            </ul>
          </div>

          {/* Auth buttons */}
          <Link to="#" className="navbar__auth" onClick={(e) => { e.preventDefault(); setLoginOpen(true); }}>Login</Link>
          <Link to="#" className="navbar__register" onClick={(e) => { e.preventDefault(); setRegisterOpen(true); }}>Register</Link>
        </nav>
      </header>

      {/* --- Modals --- */}
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />

      <RegisterModal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onModelClick={() => {
          setRegisterOpen(false);
          setSignUpModalOpen(true);
        }}
        onClientClick={() => {
          setRegisterOpen(false);
          setClientAccountModalOpen(true);
        }}
        onOpenLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />

      <SignUpModal
        open={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        onSignUpWithEmail={() => {
          setSignUpModalOpen(false);
          setEmailSignupOpen(true);
        }}
      />

      <ClientAccountTypeModal
        open={clientAccountModalOpen}
        onClose={() => setClientAccountModalOpen(false)}
        onIndividualClick={() => {
          setClientAccountModalOpen(false);
          setEmailSignupOpen(true);
        }}
        onCompanyClick={() => {
          setClientAccountModalOpen(false);
          setEmailSignupOpen(true);
        }}
      />

      <EmailSignUpModal
        open={emailSignupOpen}
        onClose={() => setEmailSignupOpen(false)}
        onEmailSignup={(email) => {
          setEmailSignupOpen(false);
          setOtpType("email");
          setOtpTo(email);
          setOtpOpen(true);
        }}
      />

      <OTPModal
        open={otpOpen}
        type={otpType}
        to={otpTo}
        onClose={() => setOtpOpen(false)}
        onSubmit={(otp) => {
          console.log("OTP entered:", otp);
          setOtpOpen(false);
          navigate("/register-company");
        }}
      />
    </>
  );
};

export default Navbar;
