import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const langRef = useRef(null);

  const handleClickOutside = (event) => {
    if (langRef.current && !langRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLangSelect = (lang, event) => {
    event.stopPropagation(); // Prevents toggle from parent
    setSelectedLang(lang);
    setShowOptions(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div>HOPn</div>
        <div>Models</div>
      </div>
      <nav className="navbar__links">
        <a href="/">Home</a>
        <a href="/models">Models</a>
        <a href="/contact">Contact</a>
        <a href="/">About</a>

        <div
          className="navbar__lang"
          onClick={() => setShowOptions((prev) => !prev)}
          ref={langRef}
        >
          <div className="selected">
            {selectedLang}
            <span className="dropdown-arrow"></span>
          </div>

          <ul className="options" style={{ display: showOptions ? "block" : "none" }}>
            <li onClick={(e) => handleLangSelect("English", e)}>English</li>
            <li onClick={(e) => handleLangSelect("Deutsch", e)}>Deutsch</li>
            <li onClick={(e) => handleLangSelect("العربية", e)}>العربية</li>
          </ul>
        </div>

        <a href="/login" className="navbar__auth">Login</a>
        <a href="/register" className="navbar__register">Register</a>
      </nav>
    </header>
  );
};

export default Navbar;
