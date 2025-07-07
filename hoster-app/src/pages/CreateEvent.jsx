import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateEvent.css';
import Header from '../additional_components/Header.jsx';
import Sidebar from '../additional_components/Sidebar.jsx';
import FileUpload from '../additional_components/FileUpload.jsx';

function CreateEvent() {
  const navigate = useNavigate();
  const [showTitleInputs, setShowTitleInputs] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [tagline, setTagline] = useState('');

  return (
    <div className="create-dashboard-container">
      <Sidebar />
      <div className="create-main-content">
        <Header />
        <div className="create-edit-profile-scrollable">
          <div className="create-form-wrapper">
            <label className="create-label1">Create an Event</label>

            <div className="create-box">
              <div className="create-box-header">
                <label className="create-label2">Event Title</label>
                <span
                  className="create-plus-icon"
                  onClick={() => setShowTitleInputs(prev => !prev)}
                  style={{ cursor: 'pointer', color: '#FF5315', fontSize: '24px' }}
                >
                  {showTitleInputs ? '−' : '+'}
                </span>
              </div>

              {showTitleInputs ? (
                <>
                  <input
                    className="create-simple-input"
                    placeholder="Enter event title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                  <input
                    className="create-simple-input"
                    placeholder="Enter tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </>
              ) : (
                <label className="create-label3">Add a Tagline</label>
              )}
            </div>

            <div className="create-box-middle">
              <label className="create-label2">Add Photos</label>
              <FileUpload />
            </div>

            <div className="create-box">
              <div className="create-box-header">
                <label className="create-label2">Ticketed?</label>
                <label className="create-toggle-switch">
                  <input type="checkbox" />
                  <span className="create-slider create-round"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="create-save-button-container">
            <button
              className="create-save-button"
              onClick={() => navigate('/EventTickets')}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
