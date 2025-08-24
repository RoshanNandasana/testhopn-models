import React, { useState } from 'react';
import './registermodel.css';

const steps = [
  'personal',
  'dob',
  'location',
  'language',
  'contact',
  'professional',
  'measurements',
  'portfolio',
  'availability',
  'verification',
  'preview'
];

const modelTypeOptions = [
  { label: 'Fashion Model', value: 'fashion', children: [
    { label: 'Runway', value: 'runway' },
    { label: 'High Fashion', value: 'highfashion' },
    { label: 'Editorial', value: 'editorial' }
  ]},
  { label: 'Commercial Model', value: 'commercial', children: [
    { label: 'Advertisement', value: 'advertisement' },
    { label: 'Catalogs', value: 'catalogs' },
    { label: 'Brands', value: 'brands' }
  ]},
  { label: 'Fitness Model', value: 'fitness' },
  { label: 'Plus-size Model', value: 'plusSize' },
  { label: 'Petite Model', value: 'petite' },
  { label: 'Glamour Model', value: 'glamour' },
  { label: 'Parts Model (Hands, Feet, Hair, etc.)', value: 'bodyParts' },
  { label: 'Lingerie / Swimwear Model', value: 'lingerie' },
  { label: 'Body-positive / Curve Model', value: 'curve' },
  { label: 'Mature Model (Over 40+)', value: 'mature' },
  { label: 'Teen Model', value: 'teen' },
  { label: 'Child / Kids Model', value: 'child' },
  { label: 'Hair / Makeup Model', value: 'makeup' },
  { label: 'Alternative / Tattoo / Unique Look Model', value: 'tattoo' },
  { label: 'Promotional / Event Model', value: 'promotional', children: [
    { label: 'Expo', value: 'expo' },
    { label: 'Trade Show', value: 'tradeshow' },
    { label: 'Product Launch', value: 'productlaunch' }
  ]},
  { label: 'Catalogue / E-commerce Model', value: 'catalogue' }
];
const styleTagOptions = [
  'Classic', 'Edgy', 'Elegant', 'Alternative', 'Luxury', 'Youthful', 'Natural'
];
const brandTagsList = ['Zara', 'H&M', 'Hugo Boss'];
const countries = ['India', 'United States', 'Canada', 'Germany'];
const cities = {
  India: ['Mumbai', 'Delhi', 'Bangalore'],
  'United States': ['New York', 'Los Angeles'],
  Canada: ['Toronto', 'Vancouver'],
  Germany: ['Berlin', 'Munich']
};
const availabilityDays = [
  'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'
];

export default function RegisterModel() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal
    gender: 'male', name: '', surname: '', displayName: '',
    // DOB
    dobDay: '', dobMonth: '', dobYear: '',
    // Location
    country: '', city: '', availableToTravel: false,street: '', nr: '', postalCode: '', aptNr: '',
    // Language
    language: '',
    // Contact
    phone: '', email: '',socialMediaLink: '', socialMediaLinks: [] ,
    // Professional
    modelTypes: [], experience: '', serviceSearch: '', brandSearch: '',
    brandTags: [], styleTags: [], preferences: '',
    // Measurements
    height: '', bust: '', waist: '', hips: '', shoeSize: '', hairColor: '', eyeColor: '',
    // Portfolio
    profilePhoto: null, galleryPhotos: [], videoLink: "",
    videoLinks: [],
    instagram: "",
    otherSocial: "",
    otherSocialLinks: [],
    // Availability
    availability: {
      pauseBetween: '30',
      slots: availabilityDays.reduce((acc, d) => ({...acc, [d]: [{ start: '', end: '' }]}),{})
    },
    // Verification
    idFile: null, selfieFile: null, taxInfo: '',
    // Account for preview step
    rates: { hourly: '', project: '', payout: '' }
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Navigation
  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  // Generic input handler
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev =>
      type === 'checkbox'
        ? { ...prev, [name]: checked }
        : type === 'file'
          ? { ...prev, [name]: files.length > 1 ? Array.from(files) : files[0] }
          : { ...prev, [name]: value }
    );
  };

  const photoInputRef = React.useRef(null);
  const galleryInputRef = React.useRef(null);
const videoInputRef = React.useRef(null);



  // Model Types
  const handleModelTypeChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      modelTypes: checked
        ? [...prev.modelTypes, value]
        : prev.modelTypes.filter(v => v !== value)
    }));
  };
  const toggleStyleTag = tag => setFormData(prev => ({
    ...prev, styleTags: prev.styleTags.includes(tag)
      ? prev.styleTags.filter(t => t !== tag)
      : [...prev.styleTags, tag]
  }));
  const toggleBrandTag = brand => setFormData(prev => ({
    ...prev, brandTags: prev.brandTags.includes(brand)
      ? prev.brandTags.filter(b => b !== brand)
      : [...prev.brandTags, brand]
  }));

  // Availability handling (simplified)
  const handleSlotChange = (day, idx, field, value) => {
    setFormData(prev => {
      const slots = [...prev.availability.slots[day]];
      slots[idx] = { ...slots[idx], [field]: value };
      const updated = { ...prev.availability, slots: { ...prev.availability.slots, [day]: slots } };
      return { ...prev, availability: updated };
    });
  };
  const addSlot = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        slots: {
          ...prev.availability.slots,
          [day]: [...prev.availability.slots[day], { start: '', end: '' }]
        }
      }
    }))
  };

  // Preview: update rates/payouts
  const handleRatesChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      rates: {
        ...prev.rates,
        [name]: value
      }
    }));
  };

  // Submit
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) return alert("You must accept the platform terms!");
    alert('Form submitted!\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="register-container">
      {step > 0 && (
        <button type="button" className="back-arrow-btn" onClick={prevStep}>
          <svg width="30" height="30" viewBox="0 0 48 48"><polyline points="28,38 16,24 28,10" fill="none" stroke="#C28B6B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="back-text">Back</span>
        </button>
      )}
      <h2 className="register-title">Register as a Model</h2>

      {/* 1: Personal */}
      {step === 0 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
          <div className="section-title"><span className="icon"><img src="/images/icons/register.jpg" alt="" /></span>Personal Information</div>
          <div className="gender-options">
            <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange}/><span>Male</span></label>
            <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange}/><span>Female</span></label>
          </div>
          <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
          <input type="text" name="surname" placeholder="Surname *" value={formData.surname} onChange={handleChange} required />
          <input type="text" name="displayName" placeholder="Stage or Display Name (Optional)" value={formData.displayName} onChange={handleChange} />
          <p className="note">If not entered, name and surname will be displayed by default</p>
          <button type="submit" className="next-btn">Next</button>
        </form>
      )}

      {/* 2: DOB */}
      {step === 1 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
          <div className="section-title"><span className="icon"><img src="/images/icons/register2.jpg" alt="" /></span>Date of Birth</div>
          <div className="dob-row">
            <input type="text" name="dobDay" placeholder="Day *" maxLength="2" value={formData.dobDay} onChange={handleChange} required />
            <input type="text" name="dobMonth" placeholder="Month *" maxLength="2" value={formData.dobMonth} onChange={handleChange} required />
            <input type="text" name="dobYear" placeholder="Year *" maxLength="4" value={formData.dobYear} onChange={handleChange} required />
          </div>
          <button type="submit" className="next-btn">Next</button>
        </form>
      )}

      {/* 3: Location */}
      {step === 2 && (
  <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
    <div className="section-title">
      <span className="icon">
        <img src="/images/icons/register3.jpg" alt="" />
      </span>
      Location & Address
    </div>
    <select name="country" value={formData.country} onChange={handleChange} required>
      <option value="">Country *</option>
      {countries.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
    <select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.country}>
      <option value="">City *</option>
      {(cities[formData.country] || []).map(city => <option key={city} value={city}>{city}</option>)}
    </select>
    <label className="travel-checkbox">
      <input type="checkbox" name="availableToTravel" checked={formData.availableToTravel} onChange={handleChange}/>
      Available to Travel
    </label>
    <input type="text" name="street" placeholder="Street" value={formData.street || ''} onChange={handleChange} style={{marginBottom:"22px"}} />
    
    <div className="address-row">
      <input type="text" name="nr" placeholder="Nr" value={formData.nr || ''} onChange={handleChange} />
      <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode || ''} onChange={handleChange} />
      <input type="text" name="aptNr" placeholder="Apt. Nr" value={formData.aptNr || ''} onChange={handleChange} />
    </div>
    
    <button type="submit" className="next-btn">Next</button>
  </form>
)}


      {/* 4: Language */}
      {step === 3 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
          <div className="section-title"><span className="icon"><img src="/images/icons/register4.jpg" alt="" /></span>Language</div>
          <input type="text" name="language" placeholder="Type Search *" value={formData.language} onChange={handleChange} required style={{ marginBottom: 48 }}/>
          <button type="submit" className="next-btn">Next</button>
        </form>
      )}

      {/* 5: Contact */}
      {step === 4 && (
  <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
    <div className="section-title">
      <span className="icon"><img src="/images/icons/register5.jpg" alt="" /></span>
      Contacts
    </div>
    <input
      type="text"
      name="phone"
      placeholder="Phone number"
      value={formData.phone}
      onChange={handleChange}
    />
    <input
      type="email"
      name="email"
      placeholder="Email *"
      value={formData.email}
      onChange={handleChange}
      required
    />
    <div className="social-link-row">
      <input
        type="text"
        name="socialMediaLink"
        placeholder="Social Media Link"
        value={formData.socialMediaLink || ""}
        onChange={handleChange}
      />
      <button
        type="button"
        className="add-link-btn"
        onClick={() => {
          if (formData.socialMediaLink && formData.socialMediaLink.trim() !== "") {
            setFormData(prev => ({
              ...prev,
              socialMediaLinks: [...(prev.socialMediaLinks || []), prev.socialMediaLink],
              socialMediaLink: ""
            }));
          }
        }}
      >+ Add</button>
    </div>

    {/* Optional: Display added social links below the input */}
    {formData.socialMediaLinks && formData.socialMediaLinks.length > 0 && (
      <ul className="added-links-list">
        {formData.socialMediaLinks.map((l, idx) => (
          <li key={idx}>{l}</li>
        ))}
      </ul>
    )}

    <div className="form-step-actions" style={{ display: "flex", justifyContent: "flex-end", marginTop: "25px", gap: "20px" }}>
      <button type="button" className="next-btn secondary" onClick={prevStep}>Back</button>
      <button type="submit" className="next-btn">Next</button>
    </div>
  </form>
)}


      {/* 6: Professional Info */}
      {step === 5 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }} className="register-form">
          <div className="section-title"><span className="icon"><img src="/images/icons/register6.jpg" alt="Model Type Icon" /></span>Professional Information</div>
          <div className="modeltype-section">
            <label className="modeltype-label">Model Type Search *</label>
            <div className="modeltype-container">
              {modelTypeOptions.map(option => (
                <div key={option.value} className="modeltype-main">
                  <label className="modeltype-checkbox">
                    <input type="checkbox" value={option.value} checked={formData.modelTypes.includes(option.value)} onChange={handleModelTypeChange}/>
                    {option.label}
                  </label>
                  {option.children && (
                    <div className="modeltype-subgroup">
                      {option.children.map(child => (
                        <label key={child.value} className="modeltype-sub-checkbox">
                          <input type="checkbox" value={child.value} checked={formData.modelTypes.includes(child.value)} onChange={handleModelTypeChange}/>
                          {child.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="professional-row experience-row">
            <span className="experience-label">Experience in Years</span>
            <label className="experience-radio">
              <input type="radio" name="experience" value="beginner" checked={formData.experience === 'beginner'} onChange={handleChange}/> Beginner (0-1)
            </label>
            <label className="experience-radio">
              <input type="radio" name="experience" value="middle" checked={formData.experience === 'middle'} onChange={handleChange}/> Middle (1-3)
            </label>
            <label className="experience-radio">
              <input type="radio" name="experience" value="professional" checked={formData.experience === 'professional'} onChange={handleChange}/> Professional (3+)
            </label>
          </div>
          <div className="professional-row">
            <label className="professional-label">Services Provided</label>
            <div className="service-search-row">
              <input type="text" placeholder="Service Search *" className="professional-search" name="serviceSearch" value={formData.serviceSearch} onChange={handleChange}/>
              <button type="button" className="showcase-btn">Showcasing</button>
            </div>
          </div>
          <div className="professional-row">
            <label className="professional-label">Worked with Brands</label>
            <div className="brand-search-row">
              <input type="text" placeholder="Brand Search" className="professional-search" name="brandSearch" value={formData.brandSearch} onChange={handleChange}/>
              <div className="brand-tags">
                {brandTagsList.map(brand => (
                  <span
                    key={brand}
                    className={`brand-tag${formData.brandTags.includes(brand) ? " selected" : ""}`}
                    onClick={() => toggleBrandTag(brand)}
                  >{brand}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="professional-row">
            <label className="professional-label">Style Tags:</label>
            <div className="style-tags">
              {styleTagOptions.map(tag => (
                <span
                  key={tag}
                  className={`style-tag${formData.styleTags.includes(tag) ? " selected" : ""}`}
                  onClick={() => toggleStyleTag(tag)}
                >{tag}</span>
              ))}
            </div>
          </div>
          <div className="professional-row">
            <label className="professional-label">Preferences and Other Information</label>
            <textarea className="professional-textarea" rows={3} name="preferences" value={formData.preferences} onChange={handleChange} />
          </div>
          <button type="submit" className="next-btn">Next</button>
        </form>
      )}

      {/* 7: Measurements */}
      {step === 6 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
          <div className="section-title">Measurements</div>
          <input type="text" name="height" placeholder="Height" value={formData.height} onChange={handleChange} />
          <input type="text" name="bust" placeholder="Bust" value={formData.bust} onChange={handleChange} />
          <input type="text" name="waist" placeholder="Waist" value={formData.waist} onChange={handleChange} />
          <input type="text" name="hips" placeholder="Hips" value={formData.hips} onChange={handleChange} />
          <input type="text" name="shoeSize" placeholder="Shoe Size" value={formData.shoeSize} onChange={handleChange} />
          <input type="text" name="hairColor" placeholder="Hair Color" value={formData.hairColor} onChange={handleChange} />
          <input type="text" name="eyeColor" placeholder="Eye Color" value={formData.eyeColor} onChange={handleChange} />
          <button type="submit" className="next-btn">Next</button>
        </form>
      )}

      {/* 8: Portfolio */}
      {step === 7 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
          <div className="section-title">Portfolio</div>
          <div className="photo-upload-box">
  <div
    className="photo-drag-area"
    onClick={() => photoInputRef.current.click()}
    onDrop={e => {
      e.preventDefault();
      if (e.dataTransfer.files[0]) {
        handleChange({ target: { name: 'profilePhoto', type: 'file', files: e.dataTransfer.files } });
      }
    }}
    onDragOver={e => e.preventDefault()}
  >
    <input
      type="file"
      accept="image/*"
      name="profilePhoto"
      style={{ display: "none" }}
      ref={photoInputRef}
      onChange={handleChange}
    />
    {formData.profilePhoto ? (
      <img
        src={typeof formData.profilePhoto === "string"
          ? formData.profilePhoto
          : URL.createObjectURL(formData.profilePhoto)}
        alt="profile preview"
        className="photo-preview"
      />
    ) : (
      <>
        <div className="photo-svg-icon">
          {/* You can use an inline SVG or an img, below is an SVG placeholder */}
          <svg width="95" height="80" viewBox="0 0 90 74" fill="none">
            <rect x="4" y="4" width="82" height="66" rx="12" stroke="#C28B6B" strokeWidth="2.2" fill="none"/>
            <circle cx="66" cy="16" r="4" fill="#C28B6B" fillOpacity=".3"/>
            <polyline points="13,64 36,42 58,59 77,37" fill="none" stroke="#C28B6B" strokeWidth="2"/>
          </svg>
        </div>
        <div className="photo-drag-label">Drag or Upload a Photo</div>
      </>
    )}
  </div>
  <div className="photo-caption">
    Photo will be shown as your personal profile photo on the platform
  </div>
  <button
    type="button"
    className="photo-upload-btn"
    onClick={() => photoInputRef.current.click()}
  >Upload</button>
</div>

        {/* Gallery Photos */}
<div style={{ marginTop: 32 }}>
  <label className="professional-label" style={{marginBottom: 8, display: 'block'}}>Gallery Photos</label>
  <div className="photo-upload-box">
    <div
      className="photo-drag-area"
      onClick={() => galleryInputRef.current.click()}
      onDrop={e => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          handleChange({ target: { name: 'galleryPhotos', type: 'file', files: e.dataTransfer.files } });
        }
      }}
      onDragOver={e => e.preventDefault()}
    >
      <input
        type="file"
        accept="image/*"
        name="galleryPhotos"
        style={{ display: "none" }}
        ref={galleryInputRef}
        multiple
        onChange={handleChange}
      />
      {(formData.galleryPhotos && formData.galleryPhotos.length > 0) ? (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '9px', justifyContent: 'center', marginTop: 8}}>
          {formData.galleryPhotos.map((file, idx) => (
            <img key={idx}
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              alt={`gallery-${idx}`}
              className="gallery-photo-preview"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="photo-svg-icon">
            <svg width="95" height="80" viewBox="0 0 90 74" fill="none">
              <rect x="4" y="4" width="82" height="66" rx="12" stroke="#C28B6B" strokeWidth="2.2" fill="none"/>
              <circle cx="66" cy="16" r="4" fill="#C28B6B" fillOpacity=".3"/>
              <polyline points="13,64 36,42 58,59 77,37" fill="none" stroke="#C28B6B" strokeWidth="2"/>
            </svg>
          </div>
          <div className="photo-drag-label">Drag or Upload a Photo</div>
        </>
      )}
    </div>
    <div className="photo-caption">
      Photos will be shown in your photo gallery in your personal model card
    </div>
    <button
      type="button"
      className="photo-upload-btn"
      onClick={() => galleryInputRef.current.click()}
    >Upload</button>
  </div>
</div>

{/* Videos */}
<div style={{ marginTop: 40 }}>
  <label className="professional-label" style={{marginBottom: 8, display: 'block'}}>Videos</label>
  <div className="photo-upload-box">
    <div
      className="photo-drag-area"
      onClick={() => videoInputRef.current.click()}
      onDrop={e => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          handleChange({ target: { name: 'videos', type: 'file', files: e.dataTransfer.files } });
        }
      }}
      onDragOver={e => e.preventDefault()}
    >
      <input
        type="file"
        accept="video/*"
        name="videos"
        style={{ display: "none" }}
        ref={videoInputRef}
        multiple
        onChange={handleChange}
      />
      {(formData.videos && formData.videos.length > 0) ? (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: 8}}>
          {formData.videos.map((file, idx) => (
            <video key={idx}
              src={typeof file === "string" ? file : URL.createObjectURL(file)}
              style={{width: "88px", height: "66px", borderRadius: "8px", objectFit: "cover", background: "#eee"}}
              controls
            />
          ))}
        </div>
      ) : (
        <>
          <div className="photo-svg-icon">
            <svg width="95" height="80" viewBox="0 0 90 74" fill="none">
              <rect x="4" y="4" width="82" height="66" rx="12" stroke="#C28B6B" strokeWidth="2.2" fill="none"/>
              <circle cx="66" cy="16" r="4" fill="#C28B6B" fillOpacity=".3"/>
              <polyline points="13,64 36,42 58,59 77,37" fill="none" stroke="#C28B6B" strokeWidth="2"/>
            </svg>
          </div>
          <div className="photo-drag-label">Drag or Upload a Video</div>
        </>
      )}
    </div>
    <div className="photo-caption">
      Videos will be shown in your photo gallery in your personal model card
    </div>
    <button
      type="button"
      className="photo-upload-btn"
      onClick={() => videoInputRef.current.click()}
    >Upload</button>
  </div>
</div>
{/* Link to Your Video */}
<div className="input-row-with-btn">
  <input
    type="text"
    name="videoLink"
    placeholder="Paste a link"
    value={formData.videoLink}
    onChange={handleChange}
    autoComplete="off"
  />
  <button
    type="button"
    className="input-add-btn"
    onClick={() => {
      if (formData.videoLink && formData.videoLink.trim() !== "") {
        setFormData(prev => ({
          ...prev,
          videoLinks: [...(prev.videoLinks || []), prev.videoLink],
          videoLink: ""
        }));
      }
    }}
  >+ Add a Link</button>
</div>

{/* Instagram Account */}
<input
  type="text"
  name="instagram"
  placeholder="@username"
  value={formData.instagram}
  onChange={handleChange}
  autoComplete="off"
/>

{/* Other Social Medias */}
<div className="input-row-with-btn">
  <input
    type="text"
    name="otherSocial"
    placeholder="URL"
    value={formData.otherSocial}
    onChange={handleChange}
    autoComplete="off"
  />
  <button
    type="button"
    className="input-add-btn"
    onClick={() => {
      if (formData.otherSocial && formData.otherSocial.trim() !== "") {
        setFormData(prev => ({
          ...prev,
          otherSocialLinks: [...(prev.otherSocialLinks || []), prev.otherSocial],
          otherSocial: ""
        }));
      }
    }}
  >+ Add a Link</button>
</div>
{formData.videoLinks && formData.videoLinks.length > 0 && (
  <ul className="added-links-list">
    {formData.videoLinks.map((l, idx) => (
      <li key={idx}>{l}</li>
    ))}
  </ul>
)}
{formData.otherSocialLinks && formData.otherSocialLinks.length > 0 && (
  <ul className="added-links-list">
    {formData.otherSocialLinks.map((l, idx) => (
      <li key={idx}>{l}</li>
    ))}
  </ul>
)}


        
          <button type="submit" className="next-btn">Next</button>
        </form>
      )}

      {/* 9: Availability */}
      {step === 8 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
          <div className="section-title">Set Availability</div>
          <label>
            Pause between bookings
            <input type="text" name="pauseBetween" value={formData.availability.pauseBetween}
              onChange={e => setFormData(prev => ({
                ...prev,
                availability: { ...prev.availability, pauseBetween: e.target.value }
              }))} style={{ width: 90, marginLeft: 10 }} />
            minutes
          </label>
          <div>
            {availabilityDays.map(day => (
              <div key={day} style={{ marginBottom: 8 }}>
                <strong>{day}</strong>
                {formData.availability.slots[day].map((slot, idx) => (
                  <span key={idx} style={{ display: 'inline-flex', marginLeft: 8 }}>
                    <input
                      type="time"
                      value={slot.start}
                      onChange={e => handleSlotChange(day, idx, 'start', e.target.value)}
                      style={{ width: 90, marginRight: 5 }}
                    />
                    -
                    <input
                      type="time"
                      value={slot.end}
                      onChange={e => handleSlotChange(day, idx, 'end', e.target.value)}
                      style={{ width: 90, marginLeft: 5, marginRight: 5 }}
                    />
                  </span>
                ))}
                <button type="button" style={{ marginLeft: 10 }}
                  onClick={() => addSlot(day)}
                >+ Add slot</button>
              </div>
            ))}
          </div>
          <button type="submit" className="next-btn">Next</button>
        </form>
      )}

      {/* 10: Verification */}
      {step === 9 && (
        <form onSubmit={e => { e.preventDefault(); nextStep(); }}>
          <div className="section-title">Verification</div>
          <div>
            <label className="professional-label">ID Verification<br/>
              <input type="file" accept="image/*,application/pdf" name="idFile" onChange={handleChange} />
            </label>
          </div>
          <div>
            <label className="professional-label">Selfie<br/>
              <input type="file" accept="image/*" name="selfieFile" onChange={handleChange} />
            </label>
          </div>
          <div>
            <label className="professional-label">Tax ID or Business Entity (Optional)<br/>
              <input type="text" name="taxInfo" placeholder="Tax ID / Legal Entity" value={formData.taxInfo} onChange={handleChange}/>
            </label>
          </div>
          <button type="submit" className="next-btn">Next</button>
        </form>
      )}

      {/* 11: Preview/Submit */}
      {step === 10 && (
        <form onSubmit={handleFinalSubmit}>
          <div className="section-title">Preview & Submit your Profile</div>
          <div className="preview-box">
            <div>
              <strong>{formData.displayName || (formData.name + " " + formData.surname)}</strong>
            </div>
            <div>
              <span>Gender: {formData.gender}, Age: {formData.dobYear ? (new Date().getFullYear() - +formData.dobYear) : ''}</span><br/>
              <span>Country: {formData.country}, City: {formData.city}</span>
              {formData.availableToTravel ? <span>, Available to travel</span> : null}
            </div>
            <div>
              <strong>Model & Services</strong> <br />
              {formData.modelTypes.map(t => t).join(', ')} <br />
              {formData.serviceSearch}
            </div>
            <div>Experience: {formData.experience}</div>
            <div>
              <strong>Style Tags</strong>: {formData.styleTags.join(', ')}
            </div>
            <div>
              <strong>Worked With Brands:</strong> <span>{formData.brandTags.join(', ')}</span>
            </div>
            <div>
              <strong>Portfolio:</strong>
              {formData.profilePhoto && <span>Profile Photo Uploaded</span>}
              {(formData.galleryPhotos && formData.galleryPhotos.length) ? <span>Gallery Photos: {formData.galleryPhotos.length}</span> : null}
              {(formData.videos && formData.videos.length) ? <span>Videos: {formData.videos.length}</span> : null}
              {formData.instagram && <span>Instagram: {formData.instagram}</span>}
            </div>
            <div>
              <strong>Rates & Payouts:</strong>
              <div>
                <input type="text" name="hourly" value={formData.rates.hourly} onChange={handleRatesChange} placeholder="Hourly rate" style={{ width: 120 }} />
                <input type="text" name="project" value={formData.rates.project} onChange={handleRatesChange} placeholder="Project rate" style={{ width: 120, marginLeft:8 }} />
                <input type="text" name="payout" value={formData.rates.payout} onChange={handleRatesChange} placeholder="Payout (Paypal/Bank)" style={{ width:180, marginLeft:8 }}/>
              </div>
            </div>
            <div>
              <strong>Documents:</strong>
              {(formData.idFile && formData.selfieFile) && <span>ID & Selfie Uploaded</span>}
              {formData.taxInfo && <span>Tax ID: {formData.taxInfo}</span>}
            </div>
            <div>
              <strong>Other Info:</strong> {formData.preferences}
            </div>
          </div>
          <div style={{margin: '15px 0'}}>
            <label style={{fontSize:14}}>
              <input type="checkbox" checked={acceptedTerms} onChange={e=>setAcceptedTerms(e.target.checked)} style={{marginRight:7}} />
              I confirm that all information is accurate and I agree to the platform <a href="#" style={{color:'#c28b6b'}}>terms</a>.
            </label>
          </div>
          <button type="submit" className="next-btn">Submit</button>
        </form>
      )}
    </div>
  );
}
