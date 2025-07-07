import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Sidebar from '../additional_components/Sidebar';
import Header from '../additional_components/Header';
import { vendors } from '../data/MockData';
import VendorCard from '../additional_components/VendorCard.jsx';
import '../styles/VendorMarketplace.css';

const VendorMarketplace = () => {
  const navigate = useNavigate();

  return (
    <div className="vendor-dashboard-container">
      <Sidebar />
      <div className="vendor-main-content">
        <Header />
        <div className="vendor-scrollable">
          <div className="vendor-wrapper">
            <div className="vendor-topbar">
              <h2 className="vendor-heading">Vendor Marketplace</h2>
              <div className="vendor-search-container">
                <Search className="vendor-search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search by vendor name"
                  className="vendor-search-input"
                />
              </div>
            </div>

            <div className="vendor-grid">
              {vendors.map((vendor, i) => (
                <VendorCard key={i} vendor={vendor} onClick={() => navigate('/vendor-profile')} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorMarketplace;
