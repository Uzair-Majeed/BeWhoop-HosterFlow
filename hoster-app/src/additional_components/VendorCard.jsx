import React from 'react';
import './VendorCard.css';
import placeholder from '../assets/placeholder-image.png'; // or any placeholder

const VendorCard = ({ vendor }) => {
  return (
    <div className="vendor-card">
      <img src={placeholder} alt={vendor.name} className="vendor-image" />
      
      <div className="vendor-name">
        {vendor.name}
        <span className="vendor-tick">✔</span>
      </div>

      <p className="vendor-role">{vendor.role}</p>
      <p className="vendor-location">{vendor.location}</p>
      <p className="vendor-price">Price Range : {vendor.priceRange}</p>

      <div className="vendor-tags">
        {vendor.tags.map((tag, i) => (
          <span key={i} className="vendor-tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default VendorCard;
