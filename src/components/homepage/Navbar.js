import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangOptions, setShowLangOptions] = useState(false);
  const menuRef = useRef(null);
  const langRef = useRef(null);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLangSelect = (lang, event) => {
    event.stopPropagation();
    setSelectedLang(lang);
    setShowLangOptions(false);
  };

  const [selectedLang, setSelectedLang] = useState("English");

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div>HOPn</div>
        <div>Models</div>
      </div>
      <div className="navbar__hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`navbar__links ${isMenuOpen ? "open" : ""}`} ref={menuRef}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Models</Link>
        <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
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
        <Link to="/login" className="navbar__auth" onClick={() => setIsMenuOpen(false)}>Login</Link>
        <Link to="/register" className="navbar__register" onClick={() => setIsMenuOpen(false)}>Register</Link>
      </nav>
    </header>
  );
};

export default Navbar;