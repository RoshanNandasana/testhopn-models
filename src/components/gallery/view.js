import React, { useState } from 'react';
import './view.css';

const View = () => {
  const [filters, setFilters] = useState({
    gender: 'All',
    modelType: 'All',
    country: 'All',
    city: 'All',
    price: 'All',
  });

  const models = [
    { name: 'Tiana Stoltz', location: 'Berlin', gender: 'Female', type: 'Commercial', country: 'Germany', city: 'Berlin', price: '100-200€', image: 'images/gallerymodel1.jpg', details: [
      'Height 5’11.5” / 1.82 M', 'Bust 30.5” / 76 CM', 'Waist 25.5” / 64 CM', 'Hips 35” / 88 CM', 'Dress 2 US / 34 EU', 'Bra 32B / 70C',
    ]},
    { name: 'Hilary Hahn', location: 'London', gender: 'Female', type: 'Commercial', country: 'UK', city: 'London', price: '200-500€', image: 'images/gallerymodel2.jpg', details: [
      'Height 5’10” / 1.78 M', 'Bust 31” / 79 CM', 'Waist 25” / 63.5 CM', 'Hips 36” / 91 CM', 'Dress 4 US / 36 EU', 'Bra 32C / 70C',
    ]},
    { name: 'Hanna Virtanen', location: 'Helsinki', gender: 'Female', type: 'Commercial', country: 'Finland', city: 'Helsinki', price: '100-200€', image: 'images/gallerymodel3.jpg', details: [
      'Height 5’11.5” / 1.82 M', 'Bust 30.5” / 76 CM', 'Waist 25.5” / 64 CM', 'Hips 35” / 88 CM', 'Dress 2 US / 34 EU', 'Bra 32B / 70C',
    ]},
    { name: 'Maria Duenas', location: 'Barcelona', gender: 'Female', type: 'Commercial', country: 'Spain', city: 'Barcelona', price: '200-500€', image: 'images/gallerymodel4.jpg', details: [
      'Height 5’9” / 1.75 M', 'Bust 32” / 81 CM', 'Waist 24.5” / 62 CM', 'Hips 34” / 86 CM', 'Dress 4 US / 36 EU', 'Bra 32C / 70D',
    ]},
    { name: 'Loren Charlien', location: 'Paris', gender: 'Female', type: 'Commercial', country: 'France', city: 'Paris', price: '100-200€', image: 'images/gallerymodel5.jpg', details: [
      'Height 5’10” / 1.78 M', 'Bust 31.5” / 80 CM', 'Waist 25” / 63.5 CM', 'Hips 36” / 91 CM', 'Dress 4 US / 36 EU', 'Bra 34A / 75B',
    ]},
    { name: 'Charlotte Lankwitz', location: 'Berlin', gender: 'Female', type: 'Commercial', country: 'Germany', city: 'Berlin', price: '200-500€', image: 'images/gallerymodel6.jpg', details: [
      'Height 6’0” / 1.83 M', 'Bust 33” / 84 CM', 'Waist 26” / 66 CM', 'Hips 37” / 94 CM', 'Dress 6 US / 38 EU', 'Bra 34B / 75C',
    ]},
    { name: 'Maria Martinez', location: 'Berlin', gender: 'Female', type: 'Commercial', country: 'Germany', city: 'Berlin', price: '100-200€', image: 'images/gallerymodel7.jpg', details: [
      'Height 5’8.5” / 1.74 M', 'Bust 30” / 76 CM', 'Waist 24” / 61 CM', 'Hips 34” / 86 CM', 'Dress 2 US / 34 EU', 'Bra 32A / 70A',
    ]},
    { name: 'Tronte Nielsen', location: 'Berlin', gender: 'Male', type: 'Commercial', country: 'Germany', city: 'Berlin', price: '+500€', image: 'images/gallerymodel8.jpg', details: [
      'Height 6’1” / 1.85 M', 'Chest 39” / 99 CM', 'Waist 31” / 79 CM', 'Hips 37” / 94 CM', 'Suit 38R / 48 EU', 'Shoe 11 US / 44 EU',
    ]},
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const filteredModels = models.filter(model => 
    (filters.gender === 'All' || model.gender === filters.gender) &&
    (filters.modelType === 'All' || model.type === filters.modelType) &&
    (filters.country === 'All' || model.country === filters.country) &&
    (filters.city === 'All' || model.city === filters.city) &&
    (filters.price === 'All' || model.price === filters.price)
  );

  return (
    <div className="gallery-page">
      <div className="gallery-container">
        <h2>Models Gallery</h2>
        <div className="filters">
          {['gender', 'modelType', 'country', 'city', 'price'].map(filter => (
            <div className="filter-group" key={filter}>
              <label>{filter.charAt(0).toUpperCase() + filter.slice(1)}</label>
              <select
                value={filters[filter]}
                onChange={(e) => handleFilterChange(filter, e.target.value)}
              >
                <option value="All">All</option>
                {Array.from(new Set(models.map(m => m[filter]))).map((value, i) => (
                  <option key={i} value={value}>{value}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="gallery-grid">
          {filteredModels.map((model, index) => (
            <div key={index} className="model-card">
              <div className="image-wrapper">
                <img className="main-img" src={model.image} alt={model.name} />
                <span className="heart-icon">♥</span>
                <div className="hover-details">
                  {model.details && model.details.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
              <h3>{model.name}</h3>
              <p>{model.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
