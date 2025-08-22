import React, { useState } from "react";
import "./CompanyRegistrationForm.css";

export default function CompanyContactStep({ setStep }) {
  const [formData, setFormData] = useState({
    eventType: "",
    portfolioUrl: "",
    officialEmail: "",
    officialPhone: "",
    additionalEmail: "",
    additionalPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.eventType || !formData.portfolioUrl || !formData.officialEmail || !formData.officialPhone) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Contact Info:", formData);
    setStep(5); // Next step
  };

  return (
    <div className="company-register-container">
      <div className="form-header">
        <h2>Contacts & Social Media</h2>
        <span className="step-indicator">Step 4/5</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Type *</label>
          <input type="text" name="eventType" value={formData.eventType} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Portfolio / Social Media URL *</label>
          <input type="url" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Official Email (Verified) *</label>
          <input type="email" name="officialEmail" value={formData.officialEmail} onChange={handleChange} disabled />
        </div>

        <div className="form-group">
          <label>Official Phone (Verified) *</label>
          <input type="tel" name="officialPhone" value={formData.officialPhone} onChange={handleChange} disabled />
        </div>

        <p className="note">
          Official contacts cannot be changed here for security reasons. New contacts must be verified before use.
        </p>

        <div className="form-group">
          <label>Additional Email</label>
          <input type="email" name="additionalEmail" value={formData.additionalEmail} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Additional Phone</label>
          <input type="tel" name="additionalPhone" value={formData.additionalPhone} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => setStep(3)}>Back</button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}
