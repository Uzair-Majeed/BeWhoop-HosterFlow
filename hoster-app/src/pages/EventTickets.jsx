import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HosterContext } from '../contexts/HosterContext.jsx';
import '../styles/EventTickets.css';
import Header from '../additional_components/Header.jsx';
import Sidebar from '../additional_components/Sidebar.jsx';
import bin from '../assets/bin.png';
import edit from '../assets/pencil-write.png';
import ticketLogo from '../assets/ticketLogo.png';

function EventTickets() {
  const [showTitleInputs, setShowTitleInputs] = useState(false);
  const [eventDescription, setEventDescription] = useState('');
  const [ticketTier, setTicketTier] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState('');
  const [tickets, setTickets] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTicketId, setEditTicketId] = useState(null);

  const navigate = useNavigate();

  const handleAddTicket = () => {
    if (!ticketTier || !ticketPrice || !ticketQuantity) return;

    if (editMode) {
      const updatedTickets = tickets.map((t) =>
        t.id === editTicketId
          ? { ...t, tier: ticketTier, price: ticketPrice, quantity: ticketQuantity }
          : t
      );
      setTickets(updatedTickets);
      setEditMode(false);
      setEditTicketId(null);
    } else {
      setTickets((prev) => [
        ...prev,
        {
          id: Date.now(),
          tier: ticketTier,
          price: ticketPrice,
          quantity: ticketQuantity,
        },
      ]);
    }

    setTicketTier('');
    setTicketPrice('');
    setTicketQuantity('');
  };

  const handleEdit = (ticket) => {
    setTicketTier(ticket.tier);
    setTicketPrice(ticket.price);
    setTicketQuantity(ticket.quantity);
    setEditMode(true);
    setEditTicketId(ticket.id);
  };

  const handleDelete = (id) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
    if (editMode && editTicketId === id) {
      setEditMode(false);
      setEditTicketId(null);
      setTicketTier('');
      setTicketPrice('');
      setTicketQuantity('');
    }
  };

  const handleSave = () => {
    navigate('/BankDetails');
  };

  return (
    <div className="tickets-dashboard-container">
      <Sidebar />
      <div className="tickets-main-content">
        <Header />
        <div className="tickets-edit-profile-scrollable">
          <div className="tickets-form-wrapper">

            <div className="tickets-box">
              <div className="tickets-box-header">
                <label className="tickets-label2">Event Tickets</label>
              </div>

              <div className="tickets-ticket-fields">
                <input
                  className="tickets-simple-input"
                  placeholder="Ticket Tier"
                  value={ticketTier}
                  onChange={(e) => setTicketTier(e.target.value)}
                />
                <input
                  className="tickets-simple-input"
                  placeholder="Quantity"
                  value={ticketQuantity}
                  onChange={(e) => setTicketQuantity(e.target.value)}
                />
                <input
                  className="tickets-simple-input"
                  placeholder="Price"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                />
              </div>

              <button className="tickets-add-ticket-button" onClick={handleAddTicket}>
                {editMode ? 'Update Ticket' : 'Add Ticket'}
              </button>

              {tickets.map((ticket) => (
                <div className="tickets-ticket-card" key={ticket.id}>
                  <img src={ticketLogo} alt="ticket" className="tickets-ticket-img" />
                  <span className="tickets-ticket-detail">{ticket.tier}</span>
                  <span className="tickets-ticket-detail">Rs {ticket.price}</span>
                  <span className="tickets-ticket-detail">{ticket.quantity} pcs</span>
                  <div className="tickets-ticket-actions">
                    <img
                      src={edit}
                      alt="edit"
                      className="tickets-ticket-icon"
                      onClick={() => handleEdit(ticket)}
                    />
                    <img
                      src={bin}
                      alt="delete"
                      className="tickets-ticket-icon"
                      onClick={() => handleDelete(ticket.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="tickets-box">
              <div className="tickets-box-header">
                <label className="tickets-label2">Event Description</label>
                <span
                  className="tickets-plus-icon"
                  onClick={() => setShowTitleInputs((prev) => !prev)}
                  style={{ cursor: 'pointer', color: '#FF5315', fontSize: '24px' }}
                >
                  {showTitleInputs ? '−' : '+'}
                </span>
              </div>

              {showTitleInputs && (
                <textarea
                  className="tickets-description-input"
                  placeholder="Enter event description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>

        <div className="tickets-save-button-container">
          <button className="tickets-save-button" onClick={handleSave}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventTickets;
