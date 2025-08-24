import React, { useState } from "react";
import "./CompanyRegistrationForm.css";

export default function CompanyRegistrationForm({ onSwitch }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "", dobDay: "", dobMonth: "", dobYear: "",
    companyName: "", website: "", industry: "",
    country: "", city: "", postalCode: "", street: "", nr: "", roomNr: "", additionalInfo: "",
    eventType: "", socialProfile: "", profiles: [],
    officialEmail: "", officialPhone: "",
    additionalEmail: "", additionalPhone: "",
    idVerification: null, selfie: null
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function addProfile() {
    if (form.socialProfile.trim() !== "") {
      setForm((prev) => ({
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
    alert("Submitted data:\n" + JSON.stringify(form, null, 2));
  }

  const stepConfig = [
    { title: "Main Information", icon: "💼" },
    { title: "Address", icon: "💼" },
    { title: "Contacts & Social Media", icon: "💼" },
    { title: "Verification", icon: "🛡️" },
    { title: "Review & Submit", icon: "✔️" },
  ];

  return (
    <div className="company-register-container">
      <div className="switch-link">
        <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }}>
          Switch to Individual
        </a>
      </div>
      <div className="form-header">
        <span className="form-icon">{stepConfig[step - 1].icon}</span>
        <h2>{stepConfig[step - 1].title}</h2>
        {step < 5 && <span className="step-indicator">{step}/4</span>}
      </div>
      <form className="company-register-form" onSubmit={step === 5 ? submitForm : nextStep}>
        {step === 1 && (
          <>
            <div className="form-group">
              <input type="text" name="fullName" placeholder="Full Name *" value={form.fullName} onChange={handleChange} required />
              <small>Full name (as in passport/ID)</small>
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
              <input type="text" name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="url" name="website" placeholder="Website (if available)" value={form.website} onChange={handleChange} />
            </div>
            <div className="form-group industry-input">
              <input type="text" name="industry" placeholder="Industry" value={form.industry} onChange={handleChange}/>
              <span className="search-icon" role="img" aria-label="search">🔍</span>
            </div>
            <div className="form-actions" style={{textAlign: "right"}}><button type="submit">Next</button></div>
          </>
        )}
        {step === 2 && (
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
            <div className="form-actions" style={{display:"flex", gap:"15px", justifyContent:"center"}}>
              <button type="button" className="secondary-button" onClick={prevStep}>Back</button>
              <button type="submit">Next</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="form-group"><input type="text" name="eventType" placeholder="Event Type" value={form.eventType} onChange={handleChange} /></div>
            <div className="form-group">
              <input type="url" name="socialProfile" placeholder="Social Media Profiles or Portfolio URL" value={form.socialProfile} onChange={handleChange}/>
              <button type="button" className="profile-add-button" onClick={addProfile}>+ Add Profile</button>
            </div>
            {form.profiles.length > 0 && (
              <ul className="added-profiles-list">
                {form.profiles.map((profile, idx) => (<li key={idx}>{profile}</li>))}
              </ul>
            )}
            <div className="form-group">
              <input type="email" name="officialEmail" placeholder="Email (verified)" value={form.officialEmail} onChange={handleChange} readOnly/>
            </div>
            <div className="form-group">
              <input type="tel" name="officialPhone" placeholder="Phone (verified)" value={form.officialPhone} onChange={handleChange} readOnly/>
            </div>
            <div className="form-group" style={{ marginTop: "0", marginBottom: "8px" }}>
              <small>
                <span role="img" aria-label="info">🛡️</span> For security purposes, these contacts cannot be changed here.<br/>
                To add alternative booking contacts, use the fields below.<br/>
                New contacts must be verified before use.
              </small>
            </div>
            <div className="form-group" style={{ display: "flex", alignItems: "center" }}>
              <input type="email" name="additionalEmail" placeholder="Email" value={form.additionalEmail} onChange={handleChange} style={{flex:1}}/>
              <span className="verify-now" style={{ marginLeft: "10px", color: "#ad8652", fontSize: "0.93rem", cursor: "pointer" }}>Verify now</span>
            </div>
            <div className="form-group" style={{display:"flex", alignItems:"center"}}>
              <input type="tel" name="additionalPhone" placeholder="Phone" value={form.additionalPhone} onChange={handleChange} style={{flex:1}} />
              <span className="verify-now" style={{ marginLeft: "10px", color: "#ad8652", fontSize: "0.93rem", cursor: "pointer" }}>Verify now</span>
            </div>
            <div className="form-actions" style={{display:"flex", gap:"15px", justifyContent:"center"}}>
              <button type="button" className="secondary-button" onClick={prevStep}>Back</button>
              <button type="submit">Next</button>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div style={{ textAlign: "center", marginBottom: "25px", color: "#333", fontSize: "1.09rem" }}>
              To ensure a safe and trusted platform, we require the following verification steps. Your information will not be shared publicly.
            </div>
            <div style={{ marginBottom: "15px" }}>
              <div style={{ display:"flex", alignItems:"center", background:"#fff", borderRadius:"7px", boxShadow:"0 2px 12px #f6eae2", padding:"16px 18px", marginBottom:"15px"}}>
                <span style={{ fontSize:"2rem", marginRight:"17px" }}>🪪</span>
                <div>
                  <div style={{ fontWeight: "bold" }}>ID Verification</div>
                  <div style={{ fontSize: "0.97rem", color: "#333" }}>Upload a valid government-issued ID</div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", background:"#fff", borderRadius:"7px", boxShadow:"0 2px 12px #f6eae2", padding:"16px 18px"}}>
                <span style={{ fontSize:"2rem", marginRight:"17px" }}>👤</span>
                <div>
                  <div style={{ fontWeight: "bold" }}>Selfie</div>
                  <div style={{ fontSize: "0.97rem", color: "#333" }}>Take a real-time selfie photo</div>
                </div>
              </div>
            </div>
            <div className="form-actions" style={{display:"flex", gap:"15px", justifyContent:"center"}}>
              <button type="button" className="secondary-button" onClick={prevStep}>Back</button>
              <button type="submit">Next</button>
            </div>
          </>
        )}
        {step === 5 && (
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <div style={{background:"rgba(252, 222, 205, 0.26)", borderRadius:"16px", maxWidth:"400px", width:"100%", padding:"26px 26px 22px 26px", margin:"0 auto"}}>
              <div style={{fontWeight:"bold", color:"#ad8652", fontSize:"1.25rem", marginBottom:"10px"}}><span role="img" aria-label="review">✔️</span> Review & Submit</div>
              <div style={{color:"#333", fontSize:"0.98rem", marginBottom:"18px"}}>Please review your information before submitting your profile.<br/>Once submitted, our team will review your company.</div>
              <div style={{color:"#684c2a", fontSize:"1.05rem", marginBottom:"10px", borderBottom:"1px solid #f5ece3", paddingBottom:"3px"}}>ONYX Events <span style={{float:"right", color:"#ad8652", cursor:"pointer"}}>Edit</span><br/><span style={{fontSize:"0.95rem", color:"#ad8652"}}>🇬🇧 | United Kingdom</span></div>
              <div style={{marginBottom:"10px", borderBottom:"1px solid #f5ece3", paddingBottom:"5px"}}>Brand Campaign <span style={{float:"right", color:"#ad8652", cursor:"pointer"}}>Edit</span><br/><span style={{fontSize:"0.93rem", color:"#333"}}>Launch model with influencers across Instagram and TikTok</span></div>
              <div style={{marginBottom:"10px", borderBottom:"1px solid #f5ece3", paddingBottom:"5px"}}>Company Website <span style={{float:"right", color:"#ad8652", cursor:"pointer"}}>Edit</span><br/><span style={{fontSize:"0.92rem", color:"#333"}}>Events - l.instagram.c/onyx-onyx.vip</span></div>
              <div style={{marginBottom:"18px"}}>London, United Kingdom <span style={{float:"right", color:"#ad8652", cursor:"pointer"}}>Edit</span><br/><span style={{fontSize:"0.91rem", color:"#333"}}>123 Regent St W1B 1JA</span></div>
              <button type="submit" style={{marginTop:"13px", width:"100%", background:"#f28743", color:"white", border:"none", borderRadius:"6px", fontSize:"1rem", padding:"12px 0", cursor:"pointer"}}>
                Submit for verification
              </button>
            </div>
            <div style={{marginTop:"20px", textAlign:"center", color:"#ad8652"}}>
              <button type="button" className="secondary-button" onClick={prevStep}>Back</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
