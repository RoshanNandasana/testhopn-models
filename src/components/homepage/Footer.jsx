import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      {/* Brand & Language options */}
      <div className="footer__brand">
        <div>HOPn</div>
        <div>Models</div>
        <div className="footer__lang">
          <span>English</span> &nbsp;
          <span>Deutsch</span> &nbsp;
          <span>العربية</span>
        </div>
      </div>

      {/* Footer navigation links */}
      <div className="footer__links">
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/models">Browse Talent</a></li>
            <li><a href="/pricing">Pricing & Plans</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4>For Talents</h4>
          <ul>
            <li><a href="/become-a-talent">Become a Talent</a></li>
            <li><a href="/talent-onboarding">Talent Onboarding</a></li>
            <li><a href="/guidelines">Guidelines & Support</a></li>
            <li><a href="/identity-verification">Identity Verification</a></li>
            <li><a href="/terms">Terms for Talent</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:support@hopn.su">support@hopn.su</a></li>
            <li>
              {/* Social Icons */}
              <div className="navbar__icons">
                <a href="#" title="Facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" title="Instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" title="YouTube" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="#" title="LinkedIn" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Footer bottom */}
    <div className="footer__bottom">
      <span>© 2025 HOPN Models. All rights reserved.</span>
      <span>
        <a href="/privacy">Privacy Policy</a> · 
        <a href="/terms">Terms of Use</a>
      </span>
    </div>
  </footer>
);

export default Footer;
