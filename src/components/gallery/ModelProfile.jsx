import React, { useState, useEffect, useCallback } from 'react';
import './ModelProfile.css';

const defaultTabs = [
  'General', 'Professional', 'Measurements', 'About Me', 'Availability', 'Reviews'
];

export default function ModelProfile({ model, onClose }) {
  const [activeTab, setActiveTab] = useState('General');
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingType, setBookingType] = useState('daily'); // 'hourly' | 'daily' | 'project'

  // Close modal or profile on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        if (showBookingPopup) setShowBookingPopup(false);
        else onClose();
      }
    },
    [showBookingPopup, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Booking modal content based on step & type
  function renderBookingPopup() {
    if (!showBookingPopup) return null;

    if (bookingStep === 1) {
      return (
        <div className="booking-modal" role="dialog" aria-modal="true">
          <h3 className="modal-title">Choose Booking Type</h3>
          <p className="modal-desc">
            Select how you want to book the talent.<br />
            This will determine the calendar and pricing options.
          </p>

          <div className="booking-type-options">
            {['hourly', 'daily', 'project'].map((type) => (
              <div
                key={type}
                className={`booking-type-card${bookingType === type ? ' selected' : ''}`}
                onClick={() => setBookingType(type)}
              >
                <div className="booking-type-title">
                  {type === 'hourly' ? '⏺ Hourly Booking' : type === 'daily' ? '📅 Daily Booking' : '🗂 Project Booking'}
                </div>
                <div className="booking-type-desc">
                  {type === 'hourly' && <>Book specific hours.<br />Auto price by rate.</>}
                  {type === 'daily' && <>Book full days.<br />Auto price by daily rate.</>}
                  {type === 'project' && (
                    <>
                      Multi-day or flexible projects.<br />
                      Propose a total project rate.<br />
                      The model will confirm or suggest adjustments.
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="booking-popup-actions">
            <button className="booking-cancel" onClick={() => setShowBookingPopup(false)}>
              Back
            </button>
            <button className="booking-continue" onClick={() => setBookingStep(2)}>
              Continue
            </button>
          </div>
        </div>
      );
    }

    if (bookingStep === 2 && bookingType === 'hourly') {
      const slots = [
        '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
        '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00',
        '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00'
      ];
      return (
        <div className="booking-modal" role="dialog" aria-modal="true">
          <h3 className="modal-title">Hourly Booking</h3>
          <div className="booking-calendar-wrapper">
            <div>
              <div className="simple-calendar">Calendar</div>
              <div className="rate-desc">Rate for this model: 150€ / hour</div>
            </div>
            <div style={{ marginLeft: 28 }}>
              <span>Friday, 08 August 2025</span>
              <div className="hour-slots">
                {slots.map((slot) => (
                  <button key={slot} className="hour-slot">{slot}</button>
                ))}
              </div>
              <div className="hour-summary">Total: 300€, 2 hours</div>
            </div>
          </div>
          <div className="booking-popup-actions">
            <button className="booking-cancel" onClick={() => setBookingStep(1)}>Back</button>
            <button className="booking-continue" onClick={() => setShowBookingPopup(false)}>Confirm</button>
          </div>
        </div>
      );
    }

    if (bookingStep === 2 && bookingType === 'daily') {
      return (
        <div className="booking-modal" role="dialog" aria-modal="true">
          <h3 className="modal-title">Daily Booking</h3>
          <div className="booking-calendar-wrapper">
            <div>
              <div className="simple-calendar">Calendar</div>
              <div className="rate-desc">Rate for this model: 200€ / day</div>
            </div>
            <div style={{ marginLeft: 34 }}>
              <b>3 Days Selected:</b>
              <div>18 August 2025</div>
              <div>19 August 2025</div>
              <div>20 August 2025</div>
              <div className="hour-summary" style={{ marginTop: 20 }}>Total: 600€</div>
            </div>
          </div>
          <div className="booking-popup-actions">
            <button className="booking-cancel" onClick={() => setBookingStep(1)}>Back</button>
            <button className="booking-continue" onClick={() => setShowBookingPopup(false)}>Confirm</button>
          </div>
        </div>
      );
    }

    if (bookingStep === 2 && bookingType === 'project') {
      return (
        <div className="booking-modal" role="dialog" aria-modal="true">
          <h3 className="modal-title">Project Booking</h3>
          <div className="booking-calendar-wrapper">
            <div>
              <div className="simple-calendar">Calendar</div>
              <div className="rate-desc">Rate for this model: 200€ / day & 150€ / hour</div>
            </div>
            <div style={{ marginLeft: 34 }}>
              <div><b>08 August 2025</b></div>
              <input className="project-time-input" defaultValue="17:00" /> –
              <input className="project-time-input" defaultValue="20:00" />
              <div><b>09 August 2025</b></div>
              <input className="project-time-input" defaultValue="10:00" /> –
              <input className="project-time-input" defaultValue="20:00" />
              <div className="hour-summary" style={{ marginTop: 16 }}>Total: 15 hours, 3 days</div>
            </div>
          </div>
          <div className="booking-popup-actions">
            <button className="booking-cancel" onClick={() => setBookingStep(1)}>Back</button>
            <button className="booking-continue" onClick={() => setShowBookingPopup(false)}>Confirm</button>
          </div>
        </div>
      );
    }

    return null;
  }

  // Tab content omitted for brevity (use your existing content)

  const tabContent = {
    General: (
      <div className="profile-details-grid">
        <div>
          <div className="profile-detail-label">Age</div>
          <div className="profile-detail-val">{model?.age || '31 years'}</div>
        </div>
        <div>
          <div className="profile-detail-label">Price</div>
          <div className="profile-detail-val">{model?.price || '150 EUR / Hour'}</div>
        </div>
        <div>
          <div className="profile-detail-label">Location</div>
          <div className="profile-detail-val">{model?.location || 'Berlin, Germany'}</div>
        </div>
        <div>
          <div className="profile-detail-label">Rating</div>
          <div className="profile-detail-val">{model?.rating || '4.8 / 5'}</div>
        </div>
        <div>
          <div className="profile-detail-label">Gender</div>
          <div className="profile-detail-val">{model?.gender || 'Female'}</div>
        </div>
        <div>
          <div className="profile-detail-label">Languages</div>
          <div>
            {(model?.languages || ['English', 'German', 'Arabic']).map(l => (
              <span key={l} className="profile-lang">{l}</span>
            ))}
          </div>
        </div>
      </div>
    ),
    Professional: (
      <div style={{ minHeight: 50 }}>
        <p><b>Experience:</b> 4+ years in runways, editorials, commercials</p>
        <p>Worked with major brands (Zara, H&M, MAC), shown at Paris Fashion Week. Available for campaigns, brand content, and editorials.</p>
      </div>
    ),
    Measurements: (
      <div style={{ minHeight: 40 }}>
        <p>{model?.details?.join(', ') || "Height 5'11.5\" / 1.82m, Bust 30.5\" / 76cm, Waist 25.5\" / 64cm, Hips 35\" / 88cm, Dress 2 US / 34 EU, Bra 32B / 70C"}</p>
      </div>
    ),
    'About Me': (
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <b>About Me</b>
          <p>
            I am a professional model with over 4 years of experience in runway, editorial, and commercial work.
            I’ve collaborated with brands like Zara, H&M, and MAC Cosmetics, and worked during Paris Fashion Week.
            My style is natural, elegant, and adaptable—I work comfortably with agencies and direct clients.
            Fluent in English and French; based in Berlin and open to travel.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <b>Preferences</b>
          <p>Do not do swimwear</p>
        </div>
      </div>
    ),
    Availability: (
      <div style={{ minHeight: 50 }}>
        <span>Friday, 08 August 2025</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          {[
            "08:00 - 09:00","09:00 - 10:00","10:00 - 11:00","11:00 - 12:00",
            "12:00 - 13:00","13:00 - 14:00","14:00 - 15:00","15:00 - 16:00",
            "16:00 - 17:00","17:00 - 18:00","18:00 - 19:00","19:00 - 20:00"
          ].map(slot => (
            <span
              key={slot}
              style={{
                background: '#fff',
                border: '1.2px solid #eedeca',
                padding: '6px 15px',
                borderRadius: 7,
                color: '#ad8652',
                fontWeight: 500,
                fontSize: 15
              }}
            >
              {slot}
            </span>
          ))}
        </div>
      </div>
    ),
    Reviews: (
      <div style={{ minHeight: 50 }}>
        <p>No reviews yet.</p>
      </div>
    ),
  };

  return (
    <div className="profile-container" aria-modal="true" aria-label="Model Profile">
      {showBookingPopup && (
        <>
          <div className="booking-backdrop" onClick={() => setShowBookingPopup(false)} />
          <div className="booking-modal-wrapper" onClick={e => e.stopPropagation()}>
            {renderBookingPopup()}
          </div>
        </>
      )}

      <button className="back-link" onClick={onClose} aria-label="Back to gallery">
        ← Back to Gallery
      </button>

      <div className="profile-main">
        <div className="profile-photo">
          <img src={model?.image || '/images/gallerymodel1.jpg'} alt={model?.name || 'Model'} />
        </div>
        <div className="profile-main-info">
          <div className="profile-name-rating">
            <span className="profile-name">{model?.name || 'Tiana Stolz'}</span>
            <span className="profile-rating">
              <span className="star">★</span> {model?.rating != null ? model.rating.toFixed(1) : '4.8'}
            </span>
            <span className="profile-verified">Verified</span>
          </div>
          <div className="profile-tags">
            {(model?.tags || ['Advertisement', 'Runway', 'High Fashion', 'Editorial', 'Brand', 'Classic', 'Luxury', 'Youthful']).map(tag => (
              <span key={tag} className="profile-tag">{tag}</span>
            ))}
          </div>
          <button
            className="booking-btn"
            onClick={() => {
              setShowBookingPopup(true);
              setBookingStep(1);
              setBookingType('daily');
            }}
            aria-label="Request Booking"
          >
            Request Booking
          </button>
        </div>
      </div>

      <div className="profile-box">
        <div className="profile-tabs">
          {defaultTabs.map(tab => (
            <span
              key={tab}
              className={`profile-tab${tab === activeTab ? ' active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
        {tabContent[activeTab]}
        <button
          className="booking-btn details"
          onClick={() => {
            setShowBookingPopup(true);
            setBookingStep(1);
            setBookingType('daily');
          }}
          aria-label="Request Booking"
        >
          Request Booking
        </button>
      </div>
    </div>
  );
}
