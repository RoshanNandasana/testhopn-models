import React, { useState,useRef } from 'react';
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
  'pricing',
  'payout',
  'taxInfo',
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
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export default function RegisterModel() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal
    gender: 'male', name: '', surname: '', displayName: '',
    // DOB
    dobDay: '', dobMonth: '', dobYear: '',
    // Location
    country: '', city: '', availableToTravel: false, street: '', nr: '', postalCode: '', aptNr: '',
    // Language
    languageInput: '',
    languages: [], // array for selected languages
    // Contact
    phone: '', email: '', socialMediaLink: '', socialMediaLinks: [],
    // Professional
    modelTypes: [], experience: '', serviceSearch: '', brandSearch: '',
    servicesProvided: [], brandsWorkedWith: [], brandTags: [], styleTags: [], preferences: '',
    // Measurements
    height: '', bust: '', waist: '', hips: '', shoeSize: '', hairColor: '', eyeColor: '',
    // Portfolio
profilePhoto: null, galleryPhotos: [], videoLink: '', videoLinks: [],
instagram: '', otherSocial: '', otherSocialLinks: [],
    instagram: '', otherSocial: '', otherSocialLinks: [],
    // Availability
    availability: {
      pauseBetween: '30',
      slots: availabilityDays.reduce((acc, d) => ({ ...acc, [d]: [{ start: '', end: '' }] }), {})
    },
    // Verification
    idFile: null, selfieFile: null,
    // Pricing
    currency: '', hourly: '', project: '', daily: '',
    // Payout
    payout: '', paypalEmail: '', bankName: '', bankIban: '', bankSwift: '',
    // Tax Info
    taxCountry: '', taxId: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Navigation
  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));
  const handleNextStep = (e) => { e.preventDefault(); nextStep(); };
  const handleEditSection = (stepIndex) => {
    setStep(stepIndex);
  };


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
  const toggleStyleTag = (tag) => setFormData(prev => ({
    ...prev,
    styleTags: prev.styleTags.includes(tag)
      ? prev.styleTags.filter(t => t !== tag)
      : [...prev.styleTags, tag]
  }));
  const toggleBrandTag = (brand) => setFormData(prev => ({
    ...prev,
    brandTags: prev.brandTags.includes(brand)
      ? prev.brandTags.filter(b => b !== brand)
      : [...prev.brandTags, brand]
  }));

  // Availability handling
  const handleSlotChange = (day, idx, field, value) => {
    setFormData(prev => {
      const slots = [...prev.availability.slots[day]];
      slots[idx] = { ...slots[idx], [field]: value };
      return {
        ...prev,
        availability: { ...prev.availability, slots: { ...prev.availability.slots, [day]: slots } }
      };
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
    }));
  };

  // Professional Inputs Logic
  const addService = () => {
    const trimmed = formData.serviceSearch.trim();
    if (trimmed && !formData.servicesProvided.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        servicesProvided: [...prev.servicesProvided, trimmed],
        serviceSearch: ''
      }));
    }
  };

  const removeService = (idx) => {
    setFormData(prev => ({
      ...prev,
      servicesProvided: prev.servicesProvided.filter((_, i) => i !== idx)
    }));
  };

  const addBrand = () => {
    const trimmed = formData.brandSearch.trim();
    if (trimmed && !formData.brandsWorkedWith.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        brandsWorkedWith: [...prev.brandsWorkedWith, trimmed],
        brandSearch: ''
      }));
    }
  };

  const removeBrand = (idx) => {
    setFormData(prev => ({
      ...prev,
      brandsWorkedWith: prev.brandsWorkedWith.filter((_, i) => i !== idx)
    }));
  };

  // Generic input handler
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => {
      if (type === 'file') {
        if (name === 'galleryPhotos' || name === 'videos') {
          return { ...prev, [name]: files ? Array.from(files) : [] };
        }
        return { ...prev, [name]: files ? files[0] : value };
      }
      return type === 'checkbox'
        ? { ...prev, [name]: checked }
        : { ...prev, [name]: value };
    });
  };

  const handleKeyDown = (e, type) => {
    if (['Enter', ',', ' '].includes(e.key)) {
      e.preventDefault();
      if (type === 'service') addService();
      else if (type === 'brand') addBrand();
    }
  };

  const photoInputRef = useRef(null);
const galleryInputRef = useRef(null);
const videoInputRef = useRef(null);

  const ProfessionalInputs = () => (
    <div>
      <div className="professional-row">
        <label className="professional-label">Services Provided</label>
        <div className="service-search-row">
          <input
            type="text"
            placeholder="Service Search *"
            className="professional-search"
            name="serviceSearch"
            value={formData.serviceSearch}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 'service')}
          />
          <button type="button" className="add-link-btn" onClick={addService}>+ Add</button>
        </div>
        <div className="added-links-list">
          {formData.servicesProvided.map((service, idx) => (
            <div className="added-link-item" key={idx}>
              {service}
              <button type="button" className="remove-link-btn" onClick={() => removeService(idx)} aria-label="Remove Service">×</button>
            </div>
          ))}
        </div>
      </div>

      <div className="professional-row">
        <label className="professional-label">Worked with Brands</label>
        <div className="brand-search-row">
          <input
            type="text"
            placeholder="Brand Search"
            className="professional-search"
            name="brandSearch"
            value={formData.brandSearch}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 'brand')}
          />
          <button type="button" className="add-link-btn" onClick={addBrand}>+ Add</button>
        </div>
        <div className="added-links-list">
          {formData.brandsWorkedWith.map((brand, idx) => (
            <div className="added-link-item" key={idx}>
              {brand}
              <button type="button" className="remove-link-btn" onClick={() => removeBrand(idx)} aria-label="Remove Brand">×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Submit Handler
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) return alert("You must accept the platform terms!");
    alert('Form submitted!\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register as a Model</h2>

      {/* 1: Personal */}
      {step === 0 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="section-title"><span className="icon"><img src="/images/icons/register.jpg" alt="" /></span>Personal Information</div>
          <div className="gender-options">
            <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange}/><span>Male</span></label>
            <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange}/><span>Female</span></label>
          </div>
          <input type="text" name="name" placeholder="Name *" value={formData.name} onChange={handleChange} required />
          <input type="text" name="surname" placeholder="Surname *" value={formData.surname} onChange={handleChange} required />
          <input type="text" name="displayName" placeholder="Stage or Display Name (Optional)" value={formData.displayName} onChange={handleChange} />
          <p className="note">If not entered, name and surname will be displayed by default</p>
          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}

      {/* 2: DOB */}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="section-title"><span className="icon"><img src="/images/icons/register2.jpg" alt="" /></span>Date of Birth</div>
          <div className="dob-row">
            <input type="text" name="dobDay" placeholder="Day *" maxLength="2" value={formData.dobDay} onChange={handleChange} required />
            <input type="text" name="dobMonth" placeholder="Month *" maxLength="2" value={formData.dobMonth} onChange={handleChange} required />
            <input type="text" name="dobYear" placeholder="Year *" maxLength="4" value={formData.dobYear} onChange={handleChange} required />
          </div>
          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}

      {/* 3: Location */}
      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
          <input type="text" name="street" placeholder="Street" value={formData.street || ''} onChange={handleChange} style={{ marginBottom: "22px" }} />
          <div className="address-row">
            <input type="text" name="nr" placeholder="Nr" value={formData.nr || ''} onChange={handleChange} />
            <input type="text" name="postalCode" placeholder="Postal Code" value={formData.postalCode || ''} onChange={handleChange} />
            <input type="text" name="aptNr" placeholder="Apt. Nr" value={formData.aptNr || ''} onChange={handleChange} />
          </div>
          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}

      {/* 4: Language */}
      {step === 3 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="section-title">
            <span className="icon"><img src="/images/icons/register4.jpg" alt="" /></span>
            Languages
          </div>
          <input
            type="text"
            name="languageInput"
            placeholder="Type Search *"
            value={formData.languageInput}
            onChange={(e) => setFormData({ ...formData, languageInput: e.target.value })}
            onKeyDown={(e) => {
              if (
                (e.key === 'Enter' || e.key === ',' || e.key === ' ') &&
                formData.languageInput.trim() &&
                !formData.languages.includes(formData.languageInput.trim())
              ) {
                e.preventDefault();
                setFormData((fd) => ({
                  ...fd,
                  languages: [...fd.languages, fd.languageInput.trim()],
                  languageInput: ''
                }));
              }
            }}
            style={{ marginBottom: 16 }}
          />
          <div className="language-tags">
            {formData.languages.map((lang, idx) => (
              <div className="language-tag" key={idx}>
                {lang}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((fd) => ({
                      ...fd,
                      languages: fd.languages.filter((l) => l !== lang)
                    }))
                  }
                  aria-label="Remove language"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}

      {/* 5: Contact */}
      {step === 4 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
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
                  setFormData((prev) => ({
                    ...prev,
                    socialMediaLinks: [...(prev.socialMediaLinks || []), prev.socialMediaLink],
                    socialMediaLink: ""
                  }));
                }
              }}
            >+ Add</button>
          </div>
          {formData.socialMediaLinks && formData.socialMediaLinks.length > 0 && (
            <ul className="added-links-list">
              {formData.socialMediaLinks.map((l, idx) => (
                <li key={idx} className="added-link-item">
                  {l}
                  <button
                    type="button"
                    className="remove-link-btn"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        socialMediaLinks: prev.socialMediaLinks.filter((_, i) => i !== idx)
                      }));
                    }}
                    aria-label="Remove"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="form-step-actions" style={{ display: "flex", justifyContent: "flex-end", marginTop: "25px", gap: "20px" }}>
            <div className="btn-row">
              {step > 0 && (
                <button type="button" className="back-arrow-btn" onClick={prevStep}>
                  <span className="back-text">Back</span>
                </button>
              )}
              <button type="submit" className="next-btn">Next</button>
            </div>
          </div>
        </form>
      )}

      {/* 6: Professional Info */}
      {step === 5 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="register-form">
          <div className="section-title"><span className="icon"><img src="/images/icons/register6.jpg" alt="Model Type Icon" /></span>Professional Information</div>
          <div className="modeltype-section">
            <label className="modeltype-label">Model Type Search *</label>
            <div className="modeltype-container">
              {modelTypeOptions.map((option) => (
                <div key={option.value} className="modeltype-main">
                  <label className="modeltype-checkbox">
                    <input type="checkbox" value={option.value} checked={formData.modelTypes.includes(option.value)} onChange={handleModelTypeChange}/>
                    {option.label}
                  </label>
                  {option.children && (
                    <div className="modeltype-subgroup">
                      {option.children.map((child) => (
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
          <ProfessionalInputs />
          <div className="professional-row">
            <label className="professional-label">Preferences and Other Information</label>
            <textarea className="professional-textarea" rows={3} name="preferences" value={formData.preferences} onChange={handleChange} />
          </div>
          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}

      {/* 7: Measurements */}
      {step === 6 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="section-title">Measurements</div>
          <input type="text" name="height" placeholder="Height" value={formData.height} onChange={handleChange} />
          <input type="text" name="bust" placeholder="Bust" value={formData.bust} onChange={handleChange} />
          <input type="text" name="waist" placeholder="Waist" value={formData.waist} onChange={handleChange} />
          <input type="text" name="hips" placeholder="Hips" value={formData.hips} onChange={handleChange} />
          <input type="text" name="shoeSize" placeholder="Shoe Size" value={formData.shoeSize} onChange={handleChange} />
          <input type="text" name="hairColor" placeholder="Hair Color" value={formData.hairColor} onChange={handleChange} />
          <input type="text" name="eyeColor" placeholder="Eye Color" value={formData.eyeColor} onChange={handleChange} />
          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}

      {/* 8: Portfolio */}
     

{step === 7 && (
  <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
    <div className="section-title"><span className="icon"><img src="/images/icons/register8.jpg" alt="Model Type Icon" height={30}/></span>Portfolio</div>
    <label className="professional-label" style={{ marginBottom: 8, display: 'block' }}>Profile Photo</label>
    <div className="photo-upload-box">
      <div
        className="photo-drag-area"
        onClick={() => { photoInputRef.current.click(); }}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files[0]) {
            handleChange({ target: { name: 'profilePhoto', type: 'file', files: e.dataTransfer.files } });
          }
        }}
        onDragOver={(e) => e.preventDefault()}
      >
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
        onClick={() => { photoInputRef.current.click(); }}
      >Upload</button>
      <input
        type="file"
        ref={photoInputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
        name="profilePhoto"
        accept="image/*"
      />
    </div>

    {/* Gallery Photos */}
    <div style={{ marginTop: 32 }}>
      <label className="professional-label" style={{ marginBottom: 8, display: 'block' }}>Gallery Photos</label>
      <div className="photo-upload-box">
        <div
          className="photo-drag-area"
          onClick={() => { galleryInputRef.current.click(); }}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
              handleChange({ target: { name: 'galleryPhotos', type: 'file', files: e.dataTransfer.files } });
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {(formData.galleryPhotos && formData.galleryPhotos.length > 0) ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '9px', justifyContent: 'center', marginTop: 8 }}>
              {formData.galleryPhotos.map((file, idx) => (
                <img
                  key={idx}
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
          onClick={() => { galleryInputRef.current.click(); }}
        >Upload</button>
        <input
          type="file"
          ref={galleryInputRef}
          style={{ display: 'none' }}
          onChange={handleChange}
          name="galleryPhotos"
          accept="image/*"
          multiple
        />
      </div>
    </div>

    {/* Videos */}
    <div style={{ marginTop: 40 }}>
      <label className="professional-label" style={{ marginBottom: 8, display: 'block' }}>Videos</label>
      <div className="photo-upload-box">
        <div
          className="photo-drag-area"
          onClick={() => { videoInputRef.current.click(); }}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
              handleChange({ target: { name: 'videos', type: 'file', files: e.dataTransfer.files } });
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          {(formData.videos && formData.videos.length > 0) ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginTop: 8 }}>
              {formData.videos.map((file, idx) => (
                <video
                  key={idx}
                  src={typeof file === "string" ? file : URL.createObjectURL(file)}
                  style={{ width: "88px", height: "66px", borderRadius: "8px", objectFit: "cover", background: "#eee" }}
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
          onClick={() => { videoInputRef.current.click(); }}
        >Upload</button>
        <input
          type="file"
          ref={videoInputRef}
          style={{ display: 'none' }}
          onChange={handleChange}
          name="videos"
          accept="video/*"
          multiple
        />
      </div>
    </div>

    {/* Link to Your Video */}
    <div className="field-group">
      <label className="input-label">Link to Your Video</label>
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
              setFormData((prev) => ({
                ...prev,
                videoLinks: [...(prev.videoLinks || []), prev.videoLink],
                videoLink: ""
              }));
            }
          }}
        >+ Add a Link</button>
      </div>
    </div>

    {/* Instagram Account */}
    <div className="field-group">
      <label className="input-label">Instagram Account</label>
      <input
        type="text"
        name="instagram"
        placeholder="@username"
        value={formData.instagram}
        onChange={handleChange}
        autoComplete="off"
      />
    </div>

    {/* Other Social Medias */}
    <div className="field-group">
      <label className="input-label">Other Social Medias</label>
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
              setFormData((prev) => ({
                ...prev,
                otherSocialLinks: [...(prev.otherSocialLinks || []), prev.otherSocial],
                otherSocial: ""
              }));
            }
          }}
        >+ Add a Link</button>
      </div>
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
    <div className="btn-row">
      {step > 0 && (
        <button type="button" className="back-arrow-btn" onClick={prevStep}>
          <span className="back-text">Back</span>
        </button>
      )}
      <button type="submit" className="next-btn">Next</button>
    </div>
  </form>
)}
  
      {/* 9: Availability */}
      {step === 8 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="section-title">Set Availability</div>
          <label>
            Pause between bookings
            <input
              type="text"
              name="pauseBetween"
              value={formData.availability.pauseBetween}
              onChange={(e) => setFormData((prev) => ({
                ...prev,
                availability: { ...prev.availability, pauseBetween: e.target.value }
              }))}
              style={{ width: 90, marginLeft: 10 }}
            />
            minutes
          </label>
          <div>
            {availabilityDays.map((day) => (
              <div key={day} style={{ marginBottom: 8 }}>
                <strong>{day}</strong>
                {formData.availability.slots[day].map((slot, idx) => (
                  <span key={idx} style={{ display: 'inline-flex', marginLeft: 8 }}>
                    <input
                      type="time"
                      value={slot.start}
                      onChange={(e) => handleSlotChange(day, idx, 'start', e.target.value)}
                      style={{ width: 90, marginRight: 5 }}
                    />
                    -
                    <input
                      type="time"
                      value={slot.end}
                      onChange={(e) => handleSlotChange(day, idx, 'end', e.target.value)}
                      style={{ width: 90, marginLeft: 5, marginRight: 5 }}
                    />
                  </span>
                ))}
                <button
                  type="button"
                  style={{ marginLeft: 10 }}
                  onClick={() => addSlot(day)}
                >+ Add slot</button>
              </div>
            ))}
          </div>
          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}
  
      {/* 10: Verification */}
      {step === 9 && (
        <form className="verification-form" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="verify-title-row">
            <div className="section-title"><span className="icon"><img src="/images/icons/register9.jpg" alt="Model Type Icon" height={30}/></span>Verification</div>
          </div>
          <div className="verify-desc">
            To ensure a safe and trusted platform, we require<br />
            the following verification steps. Your information<br />
            will not be shared publicly
          </div>
  
          <div className="verify-sections">
            {/* ID Upload */}
            <div className="verify-box">
              <div className="verify-icon">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <rect x="8" y="12" width="24" height="16" rx="3" fill="none" stroke="#bc8e68" strokeWidth="2"/>
                  <line x1="12" y1="18" x2="20" y2="18" stroke="#bc8e68" strokeWidth="1.6"/>
                  <circle cx="28" cy="17.5" r="2.3" fill="none" stroke="#bc8e68" strokeWidth="1.6"/>
                  <rect x="12" y="22" width="16" height="2" rx="1" fill="none" stroke="#bc8e68" strokeWidth="1.1"/>
                </svg>
              </div>
              <div>
                <div className="verify-heading">ID Verification</div>
                <div className="verify-subtext">Upload a valid government-issued ID</div>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  name="idFile"
                  className="verify-file"
                  onChange={handleChange}
                />
              </div>
            </div>
  
            {/* Selfie Upload */}
            <div className="verify-box">
              <div className="verify-icon">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <circle cx="20" cy="16" r="7" fill="none" stroke="#bc8e68" strokeWidth="2"/>
                  <ellipse cx="20" cy="31" rx="12" ry="7" fill="none" stroke="#bc8e68" strokeWidth="2"/>
                </svg>
              </div>
              <div>
                <div className="verify-heading">Selfie</div>
                <div className="verify-subtext">Take a real-time selfie photo</div>
                <input
                  type="file"
                  accept="image/*"
                  name="selfieFile"
                  className="verify-file"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
  
          <div className="btn-row">
            {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}
  
      {/* 11: Pricing */}
      {step === 10 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="form-header-row">
       
          <div className="verify-title-row">
            <div className="section-title"><span className="icon"><img src="/images/icons/register10.jpg" alt="Model Type Icon" height={30}/></span>Pricing</div>
          </div>
          </div>
          <div className="form-desc">Set your currency, standard hourly and project pricing.</div>
          <div className="form-group">
            <label className="form-label">Your Currency</label>
            <div className="form-input-search-row">
              <input
                className="form-input"
                type="text"
                placeholder="Currency search"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
              />
              
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Hourly Rate</label>
            <input
              className="form-input"
              type="number"
              min="0"
              placeholder="for example 150"
              name="hourly"
              value={formData.hourly}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project Rate</label>
            <input
              className="form-input"
              type="number"
              min="0"
              placeholder="for example 150"
              name="project"
              value={formData.project}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Daily Rate</label>
            <input
              className="form-input"
              type="number"
              min="0"
              placeholder="for example 150"
              name="daily"
              value={formData.daily}
              onChange={handleChange}
            />
          </div>
          <div className="btn-row">
          {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}
  
      {/* 12: Payout */}
      {step === 11 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="form-header-row">
           
            <div className="verify-title-row">
            <div className="section-title"><span className="icon"><img src="/images/icons/register12.jpg" alt="Model Type Icon" height={30}/></span>Payout</div>
          </div>
          </div>
          <div className="form-radio-row">
            <input type="radio" name="payout" value="PayPal" checked={formData.payout === "PayPal"} onChange={handleChange} id="paypal"/>
            <label htmlFor="paypal" className="form-radio-label">Pay Pal</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your Email"
              name="paypalEmail"
              style={{ marginLeft: 18, width: 330 }}
              value={formData.paypalEmail}
              onChange={handleChange}
              disabled={formData.payout !== "PayPal"}
            />
          </div>
          <div className="form-radio-row">
            <input type="radio" name="payout" value="Stripe" checked={formData.payout === "Stripe"} onChange={handleChange} id="stripe"/>
            <label htmlFor="stripe" className="form-radio-label">Stripe</label>
            <button type="button" className="form-btn-striped" disabled={formData.payout !== "Stripe"}>Connect with Stripe</button>
          </div>
          <div className="form-radio-row">
            <input type="radio" name="payout" value="Bank" checked={formData.payout === "Bank"} onChange={handleChange} id="bank" />
            <label htmlFor="bank" className="form-radio-label">Bank Transfer</label>
            <div style={{ display: 'inline-block', marginLeft: 20 }}>
              <input
                type="text"
                className="form-input"
                placeholder="Full Name (as in bank account)"
                name="bankName"
                value={formData.bankName}
                style={{ marginBottom: 10 }}
                onChange={handleChange}
                disabled={formData.payout !== "Bank"}
              />
              <input
                type="text"
                className="form-input"
                placeholder="IBAN"
                name="bankIban"
                value={formData.bankIban}
                style={{ marginBottom: 10 }}
                onChange={handleChange}
                disabled={formData.payout !== "Bank"}
              />
              <input
                type="text"
                className="form-input"
                placeholder="SWIFT / BIC"
                name="bankSwift"
                value={formData.bankSwift}
                onChange={handleChange}
                disabled={formData.payout !== "Bank"}
              />
            </div>
          </div>
          <div className="btn-row">
          {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}
  
      {/* 13: Tax Info */}
      {step === 12 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <div className="form-header-row">
  
            <div className="verify-title-row">
            <div className="section-title"><span className="icon"><img src="/images/icons/register12.jpg" alt="Model Type Icon" height={30}/></span>Tax Information</div>
          </div>
          </div>
          <div className="form-desc">
            Your Tax ID is required for payouts and tax reporting.<br />
            It will never be shown in your public profile
          </div>
          <div className="form-group">
            <label className="form-label">Country of Residence</label>
            <div className="form-input-search-row">
              <input
                className="form-input"
                type="text"
                placeholder="Country of Residence"
                name="taxCountry"
                value={formData.taxCountry}
                onChange={handleChange}
              />
              
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">National Tax ID (Steuer-ID, TIN, etc.)</label>
            <input
              className="form-input"
              type="text"
              placeholder=""
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
            />
          </div>
          <div className="btn-row">
          {step > 0 && (
              <button type="button" className="back-arrow-btn" onClick={prevStep}>
                <span className="back-text">Back</span>
              </button>
            )}
            <button type="submit" className="next-btn">Next</button>
          </div>
        </form>
      )}
  
      {/* 14: Preview */}
      {step === 13 && (
        <ProfilePreviewSubmit
          step={step}
          prevStep={prevStep}
          handleFinalSubmit={handleFinalSubmit}
          formData={formData}
          acceptedTerms={acceptedTerms}
          setAcceptedTerms={setAcceptedTerms}
          handleEdit={handleEditSection}
        />
      )}
    </div>
  );
  }
  
  // Placeholder for ProfilePreviewSubmit component (to be implemented separately)
  const ProfilePreviewSubmit = ({ step, prevStep, handleFinalSubmit, formData, acceptedTerms, setAcceptedTerms, handleEdit }) => {
    return (
      <form className="preview-form-card" onSubmit={handleFinalSubmit}>
      <div className="preview-header-row">
        <span className="preview-header-ico">&#9676;</span>
        <span className="preview-header-title">Preview &amp; Submit your Profile</span>
      </div>
      <div className="preview-desc">
        Please, review your profile before submitting your profile.<br />
        Once submitted, our team will review and verify account.
      </div>
      <div className="preview-main-box">
        <div className="preview-section">
          <div className="preview-row">
            <span className="preview-section-title">General</span>
            <button type="button" className="preview-edit" onClick={() => handleEdit("general")}>Edit</button>
          </div>
          <div className="preview-summary">
            {formData.displayName || (formData.name + " " + formData.surname)}, {formData.gender}, {formData.dobYear ? (new Date().getFullYear() - +formData.dobYear) : ''}, {formData.country}, {formData.city}
            {formData.availableToTravel && ", Available to travel"}
          </div>
        </div>
        <div className="preview-section">
          <div className="preview-row">
            <span className="preview-section-title">Talent Type &amp; Services</span>
            <button type="button" className="preview-edit" onClick={() => handleEdit("services")}>Edit</button>
          </div>
          <div className="preview-summary">
            {formData.modelTypes.join(', ')}{formData.servicesProvided.length ? `, ${formData.servicesProvided.join(', ')}` : ''}
          </div>
        </div>
        <div className="preview-section">
          <div className="preview-row">
            <span className="preview-section-title">Experience</span>
            <button type="button" className="preview-edit" onClick={() => handleEdit("experience")}>Edit</button>
          </div>
          <div className="preview-summary">{formData.experience}</div>
        </div>
        <div className="preview-section">
          <div className="preview-row">
            <span className="preview-section-title">Portfolio</span>
            <button type="button" className="preview-edit" onClick={() => handleEdit("portfolio")}>Edit</button>
          </div>
          <div className="preview-portfolio-imgs">
            {formData.galleryPhotos && formData.galleryPhotos.map((img, idx) =>
              <img key={idx} src={img} alt="Gallery" className="preview-thumb" />
            )}
            {formData.videos && formData.videos.map((vid, idx) =>
              <div key={idx} className="preview-thumb preview-video">&#9658;</div>
            )}
          </div>
        </div>
        <div className="preview-section">
          <div className="preview-row">
            <span className="preview-section-title">Rates &amp; Payouts</span>
            <button type="button" className="preview-edit" onClick={() => handleEdit("rates")}>Edit</button>
          </div>
          <div className="preview-summary">
            Hourly Rate: {formData.hourly} &nbsp;
            Daily Rate: {formData.daily} &nbsp;
            Project Rate: {formData.project} &nbsp;
            Payout: {formData.payout}
          </div>
        </div>
        <div className="preview-section">
          <div className="preview-row">
            <span className="preview-section-title">Documents</span>
            <button type="button" className="preview-edit" onClick={() => handleEdit("documents")}>Edit</button>
          </div>
          <div className="preview-documents">
            {formData.idFile && formData.selfieFile && (
              <span>
                <span className="preview-doc-status">&#10003;</span>
                ID verific:selfie uploaded
              </span>
            )}
            {formData.taxId && <span>Tax ID: {formData.taxId}</span>}
          </div>
          <div className="preview-agree-row">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={e => setAcceptedTerms(e.target.checked)}
              id="preview-terms"
            />
            <label htmlFor="preview-terms">
              I confirm that all information is accurate and I agree to the platform <a href="#" className="preview-link">terms</a>.
            </label>
          </div>
        </div>
      </div>
      <div className="preview-btn-row">
        <button type="button" className="preview-back-btn" onClick={prevStep}>Back</button>
        <button type="submit" className="preview-submit-btn" disabled={!acceptedTerms}>Submit</button>
      </div>
    </form>
    );
  };