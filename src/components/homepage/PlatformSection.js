import React from "react";
import "./PlatformSection.css";
import { Link } from 'react-router-dom';


const PlatformSection = () => (
  <section className="platform-section">
    <div className="platform-section__inner">
      <div className="platform-text">
        <h2>
          A Platform Tailored<br />
          for Professional Models
        </h2>
        <p>
          HOPN Models offers a simple and efficient way to present your work.
          Create a profile with embedded videos and social links – no uploads required.
          Your content stays on your terms. Connect with clients, receive booking requests,
          and share your profile via QR code – anywhere, anytime.
        </p>
        <Link to="/gallery">
          <button>View Models</button>
        </Link>
      </div>
      <div className="platform-img-wrap">
        <img
          src="/images/homepagemodel.jpg"
          alt="Professional Model"
          className="platform-img"
        />
      </div>
    </div>
  </section>
);

export default PlatformSection;