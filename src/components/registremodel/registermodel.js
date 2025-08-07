import React, { useState } from 'react';
import './registermodel.css';

const steps = [
  'personal',
  'dob',
  'location',
  'language',
  'contact'
];

const RegisterModel = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    gender: 'male',
    name: '',
    surname: '',
    displayName: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    country: '',
    city: '',
    availableToTravel: false,
    language: '',
    phone: '',
    email: ''
  });

  const countries = ['India', 'United States', 'Canada', 'Germany'];
  const cities = {
    India: ['Mumbai', 'Delhi', 'Bangalore'],
    'United States': ['New York', 'Los Angeles'],
    Canada: ['Toronto', 'Vancouver'],
    Germany: ['Berlin', 'Munich']
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted: ' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="register-container">
      {/* Back arrow only if not first step */}
      {step > 0 && (
        <button
          type="button"
          className="back-arrow-btn"
          onClick={prevStep}
          aria-label="Go back"
        >
          {/* Use an inline SVG for crisp arrow */}
          <svg width="30" height="30" viewBox="0 0 48 48" style={{display:'block'}}>
            <polyline points="28,38 16,24 28,10"
              fill="none" stroke="#C28B6B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="back-text">Back</span>
        </button>
      )}

      <h2 className="register-title">Register as a Model</h2>

      {/* Step 1: Personal Info */}
      {step === 0 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }} className="register-form">
          <div className="section-title">
            <span className="icon">
              <img src="/images/icons/register.jpg" alt="Register Icon" />
            </span>
            Personal Information
          </div>
          {/* ...fields remain unchanged... */}
          <div className="gender-options">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              <span>Male</span>
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              <span>Female</span>
            </label>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname *"
            value={formData.surname}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="text"
            name="displayName"
            placeholder="Stage or Display Name (Optional)"
            value={formData.displayName}
            onChange={handleChange}
            autoComplete="off"
          />
          <p className="note">
            If not entered, name and surname will be displayed by default
          </p>
          <button type="submit" className="next-btn">
            Next
          </button>
        </form>
      )}

      {/* Step 2: Date of Birth */}
      {step === 1 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }} className="register-form">
          <div className="section-title">
            <span className="icon">
              <img src="/images/icons/register2.jpg" alt="Birthday Icon" />
            </span>
            Date of Birth
          </div>
          <div className="dob-row">
            <input
              type="text"
              name="dobDay"
              placeholder="Day *"
              maxLength="2"
              value={formData.dobDay}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="dobMonth"
              placeholder="Month *"
              maxLength="2"
              value={formData.dobMonth}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <input
              type="text"
              name="dobYear"
              placeholder="Year *"
              maxLength="4"
              value={formData.dobYear}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <button type="submit" className="next-btn" style={{ marginLeft: 'auto' }}>Next</button>
        </form>
      )}

      {/* Step 3: Location */}
      {step === 2 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }} className="register-form">
          <div className="section-title">
            <span className="icon">
              <img src="/images/icons/register3.jpg" alt="Location Icon" />
            </span>
            Location
          </div>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            style={{ marginBottom: 12, fontWeight: 300 }}
          >
            <option value="">Country *</option>
            {countries.map(c => (
              <option value={c} key={c}>{c}</option>
            ))}
          </select>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={!formData.country}
            style={{ marginBottom: 12, fontWeight: 300 }}
          >
            <option value="">City *</option>
            {(cities[formData.country] || []).map(city =>
              <option key={city} value={city}>{city}</option>
            )}
          </select>
          <label className="travel-checkbox">
            <input
              type="checkbox"
              name="availableToTravel"
              checked={formData.availableToTravel}
              onChange={handleChange}
              style={{ marginRight: 10 }}
            />
            Available to Travel
          </label>
          <button type="submit" className="next-btn" style={{ marginLeft: 'auto' }}>Next</button>
        </form>
      )}

      {/* Step 4: Language */}
      {step === 3 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }} className="register-form">
          <div className="section-title">
            <span className="icon">
              <img src="/images/icons/register4.jpg" alt="Language Icon" />
            </span>
            Language
          </div>
          <input
            type="text"
            name="language"
            placeholder="Type Search *"
            value={formData.language}
            onChange={handleChange}
            required
            autoComplete="off"
            style={{ marginBottom: 48 }}
          />
          <button type="submit" className="next-btn" style={{ marginLeft: 'auto' }}>Next</button>
        </form>
      )}

      {/* Step 5: Contact */}
      {step === 4 && (
        <form onSubmit={handleFinalSubmit} className="register-form">
          <div className="section-title">
            <span className="icon">
              <img src="/images/icons/register5.jpg" alt="Contact Icon" />
            </span>
            Contacts
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <p className="note">
            we need a phone number, email, and address
          </p>
          <button type="submit" className="next-btn" style={{ marginLeft: 'auto' }}>Submit</button>
        </form>
      )}
    </div>
  );
};

export default RegisterModel;
