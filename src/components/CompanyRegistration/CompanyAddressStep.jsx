import React, { useState } from "react";
import "./CompanyRegistrationForm.css";

export default function CompanyAddressStep({ setStep }) {
  const [address, setAddress] = useState({
    country: "",
    city: "",
    postalCode: "",
    street: "",
    number: "",
    room: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.country || !address.city || !address.postalCode || !address.street || !address.number) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Address Info:", address);
    setStep(4);
  };

  return (
    <div className="company-register-container">
      <div className="form-header">
        <h2>Company Address</h2>
        <span className="step-indicator">Step 3/5</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Country *</label>
          <select name="country" value={address.country} onChange={handleChange}>
            <option value="">Select country</option>
            <option value="Tunisia">Tunisia</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
          </select>
        </div>

        <div className="form-group">
          <label>City *</label>
          <input type="text" name="city" value={address.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Postal Code *</label>
          <input type="text" name="postalCode" value={address.postalCode} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Street *</label>
          <input type="text" name="street" value={address.street} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Number *</label>
          <input type="text" name="number" value={address.number} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Room Number</label>
          <input type="text" name="room" value={address.room} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Additional Info</label>
          <textarea name="additionalInfo" value={address.additionalInfo} onChange={handleChange} rows="3" />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => setStep(2)}>Back</button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}
