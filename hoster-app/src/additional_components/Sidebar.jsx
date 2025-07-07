import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/BeWhoopLogo.png';
import msgLogo from '../assets/message-outline.png';
import profile from '../assets/profile.png'
import clock from '../assets/clock.png';
import dashLogo from '../assets/dashLogo.png';
import marketLogo from '../assets/market.png'
import eventLogo from '../assets/eventLogo.png'
import settings from '../assets/Settings.png';
import logout from '../assets/Logout.png';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Company Logo" />
      </div>

      <div className="nav-links">
        <ul>
          <li className={`nav-item ${isActive('/Dashboard') ? 'active' : ''}`} onClick={() => navigate('/Dashboard')}>
            <img src={clock} alt="Person" className="nav-icon" />
            <a>Dashboard</a>
          </li>
          <li className={`nav-item ${isActive('/Profile') ? 'active' : ''}`} onClick={() => navigate('/Profile')}>
            <img src={profile} alt="Profile" className="nav-icon" />
            <a>Profile</a>
          </li>
          
          <li className={`nav-item ${isActive('/CreateEvent')  || isActive('/EventTickets') || isActive('/BankDetails')? 'active' : ''}`} onClick={() => navigate('/CreateEvent')}>
            <img src={eventLogo} alt="CreateEvent" className="nav-icon" />
            <a>Create an Event</a>
          </li>

          
          <li className={`nav-item ${isActive('/Marketplace') ? 'active' : ''}`} onClick={() => navigate('/Marketplace')}>
            <img src={marketLogo} alt="Marketplace" className="nav-icon" />
            <a>Vendor Marketplace</a>
          </li>

          <li className={`nav-item ${isActive('/Messages') ? 'active' : ''}`} onClick={() => navigate('/Messages')}>
            <img src={msgLogo} alt="Messages" className="nav-icon" />
            <a>Messages</a>
          </li>


      <hr className="sidebar-divider" />
          
          <li className={`nav-item ${isActive('/Settings') ? 'active' : ''}`} onClick={() => navigate('/Settings')}>
            <img src={settings} alt="Settings" className="nav-icon" />
            <a>Settings</a>
          </li>

          <li className={`nav-item ${isActive('/Logout') ? 'active' : ''}`} onClick={() => navigate('/')}>
            <img src={logout} alt="Logout" className="nav-icon" />
            <a>Logout</a>
          </li>
        </ul>
      </div>

    </aside>
  );
}

export default Sidebar;
