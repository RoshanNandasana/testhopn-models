import React from 'react';
import './ModelProfile.css';

const ModelProfile = () => {
  const tags = [
    "Advertisement", "Runway", "High Fashion",
    "High Fashion", "Editorial", "Brand",
    "Classic", "Luxury", "Elegant", "Edgy", "Natural", "Youthful"
  ];
  const languages = ["English", "German", "Arabic"];

  return (
    <div className="profile-container">
      {/* Top section: image + right panel */}
      <div className="profile-main">
        <div className="profile-photo">
          {/* Replace src with your actual file, or leave as public/default */}
          <img src="/images/gallerymodel1.jpg" alt="Model" />
        </div>
        <div className="profile-main-info">
          <div className="profile-name-rating">
            <span className="profile-name">Tiana Stolz</span>
            <span className="profile-rating">
              <span className="star">&#9733;</span> 4.8
            </span>
            <span className="profile-verified">Verified</span>
          </div>
          {/* Tags */}
          <div className="profile-tags">
            {tags.map(t =>
              <span key={t} className="profile-tag">{t}</span>
            )}
          </div>
          {/* Booking button */}
          <button className="booking-btn">Request Booking</button>
        </div>
      </div>

      {/* Main box with tabs and info */}
      <div className="profile-box">
        <div className="profile-tabs">
          <span className="profile-tab active">General</span>
          <span className="profile-tab">Professional</span>
          <span className="profile-tab">Measurements</span>
          <span className="profile-tab">About Me</span>
          <span className="profile-tab">Availability</span>
          <span className="profile-tab">Reviews</span>
        </div>
        <div className="profile-details-grid">
          <div>
            <div className="profile-detail-label">Age</div>
            <div className="profile-detail-val">31 years</div>
          </div>
          <div>
            <div className="profile-detail-label">Price</div>
            <div className="profile-detail-val">150 EUR / Hour</div>
          </div>
          <div>
            <div className="profile-detail-label">Location</div>
            <div className="profile-detail-val">Berlin, Germany</div>
          </div>
          <div>
            <div className="profile-detail-label">Rating</div>
            <div className="profile-detail-val">4.8 / 5</div>
          </div>
          <div>
            <div className="profile-detail-label">Gender</div>
            <div className="profile-detail-val">Female</div>
          </div>
          <div>
            <div className="profile-detail-label">Languages</div>
            <div>
              {languages.map(l => <span key={l} className="profile-lang">{l}</span>)}
            </div>
          </div>
        </div>
        <button className="booking-btn details">Request Booking</button>
      </div>
    </div>
  );
};

export default ModelProfile;
