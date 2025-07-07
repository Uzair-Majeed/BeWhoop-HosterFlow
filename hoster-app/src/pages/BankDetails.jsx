import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BankDetails.css';
import Header from '../additional_components/Header.jsx';
import Sidebar from '../additional_components/Sidebar.jsx';

function BankDetails() {
  const navigate = useNavigate();

  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankAdded, setBankAdded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');

  const handleAddAccount = () => {
    if (!selectedBank || !accountNumber || !accountName) {
      setError('Please fill all bank account fields.');
      return;
    }

    setBankAdded(true);
    setEditing(false);
    setError('');
  };

  const handleEditBank = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (!bankAdded) {
      setError('Please add your bank details before publishing.');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms before publishing.');
      return;
    }

    navigate('/CreateEvent');
  };

  return (
    <div className="bank-dashboard-container">
      <Sidebar />
      <div className="bank-main-content">
        <Header />
        <div className="bank-edit-profile-scrollable">
          <div className="bank-form-wrapper">
            <div className="bank-box" style={{ marginTop: '2rem' }}>
              <div className="bank-box-header">
                <label className="bank-label2">Bank Details</label>
              </div>

              <select
                className="bank-select-input"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                disabled={bankAdded && !editing}
              >
                <option value="">Select Bank</option>
                <option value="HBL">HBL</option>
                <option value="UBL">UBL</option>
                <option value="Meezan">Meezan</option>
              </select>

              <input
                className="bank-simple-input"
                placeholder="Account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                disabled={bankAdded && !editing}
              />
              <input
                className="bank-simple-input"
                placeholder="Account name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                disabled={bankAdded && !editing}
              />

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {!bankAdded || editing ? (
                  <button className="bank-add-ticket-button" onClick={handleAddAccount}>
                    {bankAdded ? 'Save Changes' : 'Add Account'}
                  </button>
                ) : (
                  <button className="bank-add-ticket-button" onClick={handleEditBank}>
                    Edit Bank
                  </button>
                )}
              </div>

              {error && <div className="bank-error-message">{error}</div>}
            </div>
          </div>

          <div className="bank-checkbox-agreement">
            <label>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span>
                Admit that it is in review and will be published in 1 month of time
              </span>
            </label>
          </div>
        </div>

        <div className="bank-save-button-container">
          <button className="bank-save-button" onClick={handleSave}>
            Publish Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default BankDetails;
