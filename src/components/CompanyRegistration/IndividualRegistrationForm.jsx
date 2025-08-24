import React, { useState } from "react";
import "./IndividualRegistrationForm.css";

export default function IndividualRegistrationForm({ onSwitch }) {
  const [step, setStep] = useState(1);

  // Single state to hold all form values
  const [form, setForm] = useState({
    // Step 1
    fullName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    website: "",
    industry: "",
    // Step 2
    idUpload: null,
    // Step 3
    country: "",
    city: "",
    postalCode: "",
    street: "",
    nr: "",
    roomNr: "",
    additionalInfo: "",
    // Step 4
    email: "",
    phone: "",
    socialProfile: "",
    profiles: [],
    // Step 5 (for review)
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function addProfile() {
    if (form.socialProfile.trim() !== "") {
      setForm(prev => ({
        ...prev,
        profiles: [...prev.profiles, prev.socialProfile],
        socialProfile: "",
      }));
    }
  }

  function nextStep(e) {
    if (e) e.preventDefault();
    setStep((s) => Math.min(s + 1, 5));
  }

  function prevStep(e) {
    if (e) e.preventDefault();
    setStep((s) => Math.max(s - 1, 1));
  }

  function submitForm(e) {
    e.preventDefault();
    alert("Submitted individual: " + JSON.stringify(form, null, 2));
  }

  const stepConfig = [
    { title: "Personal Information", icon: "👤" },
    { title: "ID Verification", icon: "🪪" },
    { title: "Address", icon: "🏡" },
    { title: "Contact & Social", icon: "📞" },
    { title: "Review & Submit", icon: "✔️" },
  ];

  return (
    <div className="company-register-container">
      <div className="switch-link">
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>
          Switch to Company
        </a>
      </div>
      <div className="form-header">
        <span className="form-icon">{stepConfig[step - 1].icon}</span>
        <h2>{stepConfig[step - 1].title}</h2>
        <span className="step-indicator">{step}/5</span>
      </div>
      <form className="company-register-form" onSubmit={step === 5 ? submitForm : nextStep}>
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <>
            <div className="form-group">
              <input type="text" name="fullName" placeholder="Full Name *" value={form.fullName} onChange={handleChange} required />
              <small>As on your passport/ID</small>
            </div>
            <div className="form-group dob-group">
              <label>Date of Birth</label>
              <div className="dob-inputs">
                <input type="text" name="dobDay" placeholder="Day" value={form.dobDay} onChange={handleChange} maxLength={2}/>
                <input type="text" name="dobMonth" placeholder="Month" value={form.dobMonth} onChange={handleChange} maxLength={2}/>
                <input type="text" name="dobYear" placeholder="Year" value={form.dobYear} onChange={handleChange} maxLength={4}/>
              </div>
            </div>
            <div className="form-group">
              <input type="url" name="website" placeholder="Website (Portfolio)" value={form.website} onChange={handleChange} />
            </div>
            <div className="form-group industry-input">
              <input type="text" name="industry" placeholder="Industry" value={form.industry} onChange={handleChange}/>
              <span className="search-icon" role="img" aria-label="search">🔍</span>
            </div>
            <div className="form-actions">
              <button type="submit">Next</button>
            </div>
          </>
        )}

        {/* Step 2: ID Verification */}
        {step === 2 && (
          <>
            <div className="form-group">
              <label>Upload a government-issued ID</label>
              <input type="file" name="idUpload" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} />
            </div>
            <div className="form-actions">
              <button type="button" className="secondary-button" onClick={prevStep}>Back</button>
              <button type="submit">Next</button>
            </div>
          </>
        )}

        {/* Step 3: Address */}
        {step === 3 && (
          <>
            <div className="form-group industry-input">
              <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange} required/>
              <span className="search-icon" role="img" aria-label="search">🔍</span>
            </div>
            <div className="form-group" style={{display: "flex", gap: "20px"}}>
              <div style={{flex:2, position:"relative"}}>
                <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required style={{width:"100%"}}/>
                <span className="search-icon" style={{ right: '12px', top: '13px' }} role="img" aria-label="search">🔍</span>
              </div>
              <input type="text" name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required style={{flex:1}}/>
            </div>
            <div className="form-group" style={{display: "flex", gap:"20px"}}>
              <input type="text" name="street" placeholder="Street" value={form.street} onChange={handleChange} style={{flex:3}} required/>
              <input type="text" name="nr" placeholder="Nr" value={form.nr} onChange={handleChange} style={{flex:1}} />
              <input type="text" name="roomNr" placeholder="Room Nr" value={form.roomNr} onChange={handleChange} style={{flex:1}} />
            </div>
            <div className="form-group">
              <input type="text" name="additionalInfo" placeholder="Additional Information" value={form.additionalInfo} onChange={handleChange}/>
            </div>
            <div className="form-actions">
              <button type="button" className="secondary-button" onClick={prevStep}>Back</button>
              <button type="submit">Next</button>
            </div>
          </>
        )}

        {/* Step 4: Contacts & Social */}
        {step === 4 && (
          <>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <input type="url" name="socialProfile" placeholder="Social Media Profile or Portfolio URL" value={form.socialProfile} onChange={handleChange}/>
              <button type="button" className="profile-add-button" onClick={addProfile}>+ Add Profile</button>
            </div>
            {form.profiles.length > 0 && (
              <ul className="added-profiles-list">
                {form.profiles.map((profile, idx) => (<li key={idx}>{profile}</li>))}
              </ul>
            )}
            <div className="form-actions">
              <button type="button" className="secondary-button" onClick={prevStep}>Back</button>
              <button type="submit">Next</button>
            </div>
          </>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <div style={{
              background: "rgba(252,222,205,0.26)", borderRadius: "16px", maxWidth: "400px", width: "100%", padding: "26px 26px 22px 26px", margin: "0 auto"
            }}>
              <div style={{fontWeight:"bold", color:"#ad8652", fontSize:"1.25rem", marginBottom:"10px"}}>
                <span role="img" aria-label="review">✔️</span> Review & Submit
              </div>
              <div style={{color:"#333", fontSize:"0.98rem", marginBottom:"16px"}}>
                Please review your information before submitting!
              </div>
              <div style={{marginBottom:"8px"}}>
                <strong>Name:</strong> {form.fullName}<br/>
                <strong>DOB:</strong> {form.dobDay}/{form.dobMonth}/{form.dobYear}<br/>
                <strong>Email:</strong> {form.email} | <strong>Phone:</strong> {form.phone}<br/>
                <strong>Address:</strong> {form.street}, {form.nr}, {form.roomNr}, {form.city}, {form.country}, {form.postalCode}
              </div>
              <div>
                <strong>Website:</strong> {form.website}<br/>
                <strong>Industry:</strong> {form.industry}
              </div>
              <div style={{marginTop:"10px"}}>
                <strong>Social Profiles:</strong>
                <ul style={{margin:"5px 0 10px 15px"}}>
                  {form.profiles.map((url, idx) => <li key={idx}>{url}</li>)}
                </ul>
              </div>
              <button type="submit"
                style={{marginTop:"13px", width:"100%", background:"#f28743", color:"white", border:"none", borderRadius:"6px", fontSize:"1rem", padding:"12px 0", cursor:"pointer"}}
              >
                Submit for verification
              </button>
            </div>
            <div style={{marginTop:"18px"}}>
              <button type="button" className="secondary-button" onClick={prevStep}>Back</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
