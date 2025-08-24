import React, { useState } from 'react';
import axios from 'axios';
import './CompanyRegistrationForm.css';

const CompanyTypeStep = ({ setStep }) => {
  const [formData, setFormData] = useState({
    companyType: '',
    registrationNumber: '',
    vatNumber: '',
    website: '',
    socialMedia: '',
    licenseFile: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, licenseFile: e.target.files[0] }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.companyType) newErrors.companyType = 'Company type is required';
    if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
    if (!formData.licenseFile) newErrors.licenseFile = 'Business license is required';

    const hasVerification =
      formData.vatNumber || formData.website || formData.socialMedia;

    if (!hasVerification) {
      newErrors.verification = 'Please provide at least one verification method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      setLoading(true);
      await axios.post('/api/company/type-info', data);
      setStep(3);
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-register-container">
      <div className="form-header">
        <span className="form-icon">🏢</span>
        <h2>Company Type Information</h2>
        <span className="step-indicator">2/5</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Type *</label>
          <select name="companyType" value={formData.companyType} onChange={handleChange}>
            <option value="">Select company type</option>
            <option value="SARL">SARL</option>
            <option value="SA">SA</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
          </select>
          {errors.companyType && <small>{errors.companyType}</small>}
        </div>

        <div className="form-group">
          <label>Company Registration Number *</label>
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} />
          {errors.registrationNumber && <small>{errors.registrationNumber}</small>}
        </div>

        <div className="form-group">
          <small style={{ color: '#a08b76' }}>
            * The following fields are only required for small companies
          </small>
        </div>

        <div className="form-group">
          <label>VAT Number (if available)</label>
          <input type="text" name="vatNumber" value={formData.vatNumber} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Website / Social Media / Portfolio (URL)</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Social Media Link</label>
          <input type="url" name="socialMedia" value={formData.socialMedia} onChange={handleChange} />
          {errors.verification && <small>{errors.verification}</small>}
        </div>

        <div className="form-group">
          <label>Upload Business License (scan of first page) *</label>
          <input type="file" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
          {errors.licenseFile && <small>{errors.licenseFile}</small>}
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => setStep(1)} style={{ marginRight: '10px' }}>
            Back
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyTypeStep;
