import React, { useState } from 'react';
import './view.css';

const View = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateTime: '',
    city: '',
    country: '',
    price: '',
    gender: '',
    modelType: '',
    experience: '',
    rating: '',
    language: '',
    sortBy: ''
  });

  const models = [
    {
      name: 'Tiana Stoltz',
      location: 'Berlin',
      gender: 'Female',
      type: 'Commercial',
      country: 'Germany',
      city: 'Berlin',
      price: '100-200€',
      image: 'images/gallerymodel1.jpg',
      details: [
        "Height 5'11.5\" / 1.82 M", "Bust 30.5\" / 76 CM", "Waist 25.5\" / 64 CM", 
        "Hips 35\" / 88 CM", "Dress 2 US / 34 EU", "Bra 32B / 70C"
      ],
      rating: 4,
      languages: ['English', 'German'],
      experience: 'Intermediate'
    },
    {
      name: 'Hilary Hahn',
      location: 'London',
      gender: 'Female',
      type: 'Commercial',
      country: 'UK',
      city: 'London',
      price: '200-500€',
      image: 'images/gallerymodel2.jpg',
      details: [
        "Height 5'10\" / 1.78 M", "Bust 31\" / 79 CM", "Waist 25\" / 63.5 CM", 
        "Hips 36\" / 91 CM", "Dress 4 US / 36 EU", "Bra 32C / 70C"
      ],
      rating: 5,
      languages: ['English'],
      experience: 'Expert'
    },
    {
      name: 'Hanna Virtanen',
      location: 'Helsinki',
      gender: 'Female',
      type: 'Commercial',
      country: 'Finland',
      city: 'Helsinki',
      price: '100-200€',
      image: 'images/gallerymodel3.jpg',
      details: [
        "Height 5'11.5\" / 1.82 M", "Bust 30.5\" / 76 CM", "Waist 25.5\" / 64 CM", 
        "Hips 35\" / 88 CM", "Dress 2 US / 34 EU", "Bra 32B / 70C"
      ],
      rating: 3,
      languages: ['English', 'Finnish'],
      experience: 'Beginner'
    },
    {
      name: 'Maria Duenas',
      location: 'Barcelona',
      gender: 'Female',
      type: 'Commercial',
      country: 'Spain',
      city: 'Barcelona',
      price: '200-500€',
      image: 'images/gallerymodel4.jpg',
      details: [
        "Height 5'9\" / 1.75 M", "Bust 32\" / 81 CM", "Waist 24.5\" / 62 CM", 
        "Hips 34\" / 86 CM", "Dress 4 US / 36 EU", "Bra 32C / 70D"
      ],
      rating: 4,
      languages: ['English', 'Spanish'],
      experience: 'Intermediate'
    },
    {
      name: 'Loren Charlien',
      location: 'Paris',
      gender: 'Female',
      type: 'Commercial',
      country: 'France',
      city: 'Paris',
      price: '100-200€',
      image: 'images/gallerymodel5.jpg',
      details: [
        "Height 5'10\" / 1.78 M", "Bust 31.5\" / 80 CM", "Waist 25\" / 63.5 CM", 
        "Hips 36\" / 91 CM", "Dress 4 US / 36 EU", "Bra 34A / 75B"
      ],
      rating: 5,
      languages: ['English', 'French'],
      experience: 'Expert'
    },
    {
      name: 'Charlotte Lankwitz',
      location: 'Berlin',
      gender: 'Female',
      type: 'Commercial',
      country: 'Germany',
      city: 'Berlin',
      price: '200-500€',
      image: 'images/gallerymodel6.jpg',
      details: [
        "Height 6'0\" / 1.83 M", "Bust 33\" / 84 CM", "Waist 26\" / 66 CM", 
        "Hips 37\" / 94 CM", "Dress 6 US / 38 EU", "Bra 34B / 75C"
      ],
      rating: 4,
      languages: ['English', 'German'],
      experience: 'Intermediate'
    },
    {
      name: 'Maria Martinez',
      location: 'Berlin',
      gender: 'Female',
      type: 'Commercial',
      country: 'Germany',
      city: 'Berlin',
      price: '100-200€',
      image: 'images/gallerymodel7.jpg',
      details: [
        "Height 5'8.5\" / 1.74 M", "Bust 30\" / 76 CM", "Waist 24\" / 61 CM", 
        "Hips 34\" / 86 CM", "Dress 2 US / 34 EU", "Bra 32A / 70A"
      ],
      rating: 3,
      languages: ['English', 'German'],
      experience: 'Beginner'
    },
    {
      name: 'Tronte Nielsen',
      location: 'Berlin',
      gender: 'Male',
      type: 'Commercial',
      country: 'Germany',
      city: 'Berlin',
      price: '+500€',
      image: 'images/gallerymodel8.jpg',
      details: [
        "Height 6'1\" / 1.85 M", "Chest 39\" / 99 CM", "Waist 31\" / 79 CM", 
        "Hips 37\" / 94 CM", "Suit 38R / 48 EU", "Shoe 11 US / 44 EU"
      ],
      rating: 5,
      languages: ['English', 'German'],
      experience: 'Expert'
    },
  ];

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateTime: '',
      city: '',
      country: '',
      price: '',
      gender: '',
      modelType: '',
      experience: '',
      rating: '',
      language: '',
      sortBy: ''
    });
  };

  // Filter and sort models
  const filteredModels = models
    .filter((model) => {
      return (
        (!filters.city || model.city.toLowerCase() === filters.city.toLowerCase()) &&
        (!filters.country || model.country.toLowerCase() === filters.country.toLowerCase()) &&
        (!filters.price || model.price === (filters.price === '500+' ? '+500€' : filters.price + '€')) &&
        (!filters.gender || model.gender.toLowerCase() === filters.gender.toLowerCase()) &&
        (!filters.modelType || model.type.toLowerCase() === filters.modelType.toLowerCase()) &&
        (!filters.experience || model.experience.toLowerCase() === filters.experience.toLowerCase()) &&
        (!filters.rating || model.rating >= parseInt(filters.rating)) &&
        (!filters.language || model.languages.includes(filters.language))
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (filters.sortBy === 'price-low') {
        const priceA = parseInt(a.price.split('-')[0]) || 500;
        const priceB = parseInt(b.price.split('-')[0]) || 500;
        return priceA - priceB;
      } else if (filters.sortBy === 'price-high') {
        const priceA = parseInt(a.price.split('-')[0]) || 500;
        const priceB = parseInt(b.price.split('-')[0]) || 500;
        return priceB - priceA;
      } else if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="gallery-page">
      {/* Backdrop */}
      {isFilterOpen && <div className="backdrop show" onClick={() => setIsFilterOpen(false)}></div>}

      {/* Filter Panel */}
      <div className={`filter-panel ${isFilterOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h3>Filter</h3>
          <button className="close-btn" onClick={() => setIsFilterOpen(false)}>×</button>
        </div>

        <div className="filter-content">
          <div className="filter-group">
            <label>Date & Time Availability</label>
            <select value={filters.dateTime} onChange={(e) => handleFilterChange('dateTime', e.target.value)}>
              <option value="">Select Date</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This Week</option>
              <option value="next-week">Next Week</option>
            </select>
          </div>

          <div className="filter-group">
            <label>City & Country</label>
            <select value={filters.city} onChange={(e) => handleFilterChange('city', e.target.value)}>
              <option value="">Select City</option>
              <option value="berlin">Berlin</option>
              <option value="london">London</option>
              <option value="helsinki">Helsinki</option>
              <option value="barcelona">Barcelona</option>
              <option value="paris">Paris</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Price</label>
            <select value={filters.price} onChange={(e) => handleFilterChange('price', e.target.value)}>
              <option value="">Select Price Range</option>
              <option value="0-100">€0 - €100</option>
              <option value="100-200">€100 - €200</option>
              <option value="200-500">€200 - €500</option>
              <option value="500+">€500+</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Gender</label>
            <select value={filters.gender} onChange={(e) => handleFilterChange('gender', e.target.value)}>
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Model Type / Category</label>
            <select value={filters.modelType} onChange={(e) => handleFilterChange('modelType', e.target.value)}>
              <option value="">Select Type</option>
              <option value="commercial">Commercial</option>
              <option value="fashion">Fashion</option>
              <option value="editorial">Editorial</option>
              <option value="fitness">Fitness</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Experience</label>
            <select value={filters.experience} onChange={(e) => handleFilterChange('experience', e.target.value)}>
              <option value="">Select Experience</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Rating</label>
            <select value={filters.rating} onChange={(e) => handleFilterChange('rating', e.target.value)}>
              <option value="">Select Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Language</label>
            <select value={filters.language} onChange={(e) => handleFilterChange('language', e.target.value)}>
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="german">German</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="finnish">Finnish</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by</label>
            <select value={filters.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)}>
              <option value="">Default</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div className="filter-actions">
            <button className="clear-btn" onClick={clearFilters}>Clear All</button>
            <button className="save-btn" onClick={() => setIsFilterOpen(false)}>Apply Filters</button>
          </div>
        </div>
      </div>

      {/* Main Gallery */}
      <div className="gallery-container">
        <h2>Models Gallery</h2>

        <div className="filter-toolbar">
          <button className="minimal-btn" onClick={() => setIsFilterOpen(true)}>
            <i className="fas fa-sliders-h"></i>
            <span>Filters</span>
          </button>
          <button className="minimal-btn">
            <i className="fas fa-map-marker-alt"></i>
            <span>View on Map</span>
          </button>
          <label className="minimal-btn checkbox-label">
            <input type="checkbox" defaultChecked />
            <span>Talents Nearby</span>
          </label>
        </div>

        <div className="gallery-grid">
          {filteredModels.length > 0 ? (
            filteredModels.map((model, index) => (
              <div key={index} className="model-card">
                <div className="image-wrapper">
                  <img className="main-img" src={model.image} alt={model.name} />
                  <div className="hover-details">
                    {model.details.map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </div>
                <h3>{model.name}</h3>
                <p>{model.location}</p>
              </div>
            ))
          ) : (
            <p>No models match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;