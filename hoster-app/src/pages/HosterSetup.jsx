import { useState, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/HosterSetup.css';
import Bg from '../assets/Bg-2.png';
import { HosterContext } from '../contexts/HosterContext.jsx';

const baseURL = import.meta.env.VITE_API_BASE_URL;

function HosterSetup() {
  const [eventInput, setEventInput] = useState('');
  const [events, setEvents] = useState([]);
  const [availableEvents, setavailableEvents] = useState(["Lifestyle", "Cultural", "Comedy"]);
  const [eventFrequency, setEventFrequency] = useState('');
  const [avgSize, setAvgSize] = useState('');
  const [error, setError] = useState('');

  const { hosterData, setHosterData } = useContext(HosterContext);
  const navigate = useNavigate();

  const handleAddEvent = (e) => {
    if (e.key === ',' && eventInput.trim() !== '') {
      e.preventDefault();
      const trimmed = eventInput.trim();
      if (!events.includes(trimmed)) {
        setEvents([...events, trimmed]);
      }
      setEventInput('');
    }
  };

  const removeEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const addAvailableEvent = (eventName) => {
    if (!events.includes(eventName)) {
      setEvents([...events, eventName]);
      setavailableEvents(availableEvents.filter(ev => ev !== eventName));
    }
  };

  const handleNext = async () => {
    if (!eventFrequency.trim()) return setError('Please enter your event frequency.');
    if (!avgSize) return setError('Please select an average size of event.');
    if (events.length === 0) return setError('Please add at least one event type.');

    setError('');

    const updatedData = {
      ...hosterData,
      eventFrequency,
      avgSize,
      eventTypes: events,
    };

    console.log(updatedData);
    setHosterData(updatedData);

    const payload = {
      fullName: `${hosterData.firstName || 'John'} ${hosterData.lastName || 'Doe'}`,
      email: hosterData.email || 'default@email.com',
      phone: hosterData.phone || '0000000000',
      eventFrequency: eventFrequency || 'monthly',
      avgAttendeesPerEvent: avgSize || 50,
      endGoalDescription: 'None',
      location: 'None',
      password: hosterData.password || 'defaultpassword',
    };

    try {
      const response = await fetch(`${baseURL}/onboarding/hosts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok && result.status === 'success') {
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        navigate('/dashboard');
      } else {
        const message = result.message || result.error || 'Registration failed';
        setError(message);

        if (
          message.toLowerCase().includes('already exists') ||
          message.toLowerCase().includes('duplicate') ||
          message.toLowerCase().includes('already in use')
        ) {
          setError('User already exists. Redirecting to signup...');
          setTimeout(() => navigate('/signup'), 2000);
        }
      }
    } catch (err) {
      console.error('API error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="hostersetup-card">
      <div className="hostersetup-left-bg" style={{ backgroundImage: `url(${Bg})` }}>
        <div className="hostersetup-text-group">
          <h1>MarketPlace</h1>
          <p>Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
        </div>
      </div>

      <div className="hostersetup-info">
        <div className="hostersetup-title-group">
          <h1>Let’s set things up for you.</h1>
          <p>Share your vision, and we’ll help make it real.</p>
        </div>

        <label className="hostersetup-label1">Your events frequency</label>
        <input
          className="hostersetup-simple-input"
          placeholder="e.g. Weekly, Monthly"
          value={eventFrequency}
          onChange={(e) => setEventFrequency(e.target.value)}
        />

        <label className="hostersetup-label3">Average Size of Event</label>
        <select
          className="hostersetup-select-input"
          value={avgSize}
          onChange={(e) => setAvgSize(e.target.value)}
        >
          <option value="">Select size</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
          <option value="1500">1500</option>
          <option value="2000">2000</option>
          <option value="3000">3000</option>
        </select>

        <label className="hostersetup-label3">Type of Event</label>
        <div className="hostersetup-text-container">
          <input
            className="hostersetup-events"
            placeholder="Type and Press (,) to add Events..."
            value={eventInput}
            onChange={(e) => setEventInput(e.target.value)}
            onKeyDown={handleAddEvent}
          />
          <div className="hostersetup-eventsAdded">
            {events.map((ev, index) => (
              <span key={index} className="hostersetup-event-chip">
                {ev}
                <button className="hostersetup-remove-btn" onClick={() => removeEvent(index)}>×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="hostersetup-available-events">
          {availableEvents.map((ev, index) => (
            <span key={index} className="hostersetup-add-chip" onClick={() => addAvailableEvent(ev)}>
              {ev} +
            </span>
          ))}
        </div>

        {error && <p className="hostersetup-error-fields">{error}</p>}
        <button className="hostersetup-next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default HosterSetup;
