import React, { useState } from "react";
import "./CompanyRegistrationForm.css";

export default function CompanyRegistrationForm() {
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    website: "",
    industry: "",
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Form submitted!");
  }

  return (
    <div className="company-register-container">
      {/* Switch link */}
      <div className="switch-link">
        <a href="#">Switch to Individual</a>
      </div>

      {/* Registration form */}
      <form className="company-register-form" onSubmit={handleSubmit}>
        
        {/* Heading */}
        <div className="form-header">
          <h2>Main Company Information</h2>
        </div>

        {/* Full Name */}
        <div className="form-group">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name *"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <small>Contact person name</small>
        </div>

        {/* Company Name */}
        <div className="form-group">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name *"
            value={form.companyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Website */}
        <div className="form-group">
          <input
            type="url"
            name="website"
            placeholder="Website *"
            value={form.website}
            onChange={handleChange}
            required
          />
        </div>

        {/* Industry */}
        <div className="form-group industry-input">
          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={form.industry}
            onChange={handleChange}
          />
          <img
            src="/images/icons/cregister.jpg"
            alt="search"
            className="search-icon"
          />
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}
