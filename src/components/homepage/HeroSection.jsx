import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection = () => (
  <section className="hero-section">
    {/* Hero Card 1 */}
    <div className="hero-card">
      <img
        src="/images/cardmodel.jpg"
        alt="Source Verified Talent"
        className="hero-img"
      />
      <div className="hero-overlay">
        <h3>Source Verified Talent</h3>
        <p>
          Access a curated network of models, talents, and influencers for
          promotional work, expert spaces, photoshoots, ads, and digital
          content creation.
        </p>
        <Link to="/gallery">
          <button>View Models</button>
        </Link>
      </div>
    </div>

    {/* Hero Card 2 */}
    <div className="hero-card">
      <img
        src="/images/cardmodel2.jpg"
        alt="Explore Opportunities"
        className="hero-img"
      />
      <div className="hero-overlay">
        <h3>Explore Modeling Opportunities</h3>
        <p>
          Find modeling work that fits your style and experience. Let our
          platform connect you with trusted clients and real opportunities.
          Join us for your growth.
        </p>
        <Link to="/register">
          <button>Become a Model</button>
        </Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
