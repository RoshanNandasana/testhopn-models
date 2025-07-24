import React from "react";
import "./Navbar.css";

const Navbar = () => (
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
      <select className="navbar__lang">
        <option>English</option>
        <option>Deutsch</option>
        <option>عربي</option>
      </select>
      <a href="/login" className="navbar__auth">Login</a>
      <a href="/register" className="navbar__register">Register</a>

    </nav>
  </header>
);

export default Navbar;
