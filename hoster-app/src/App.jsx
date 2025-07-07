import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HosterProvider } from './contexts/HosterContext'
import './App.css'
import Signup from './pages/Signup';
import HosterSetup from './pages/HosterSetup.jsx';
import CreateEvent from './pages/CreateEvent.jsx';
import EventTickets from './pages/EventTickets.jsx';
import BankDetails from './pages/BankDetails.jsx'
import Dashboard from './pages/Dashboard.jsx';
import VendorMarketplace from './pages/VendorMarketplace.jsx';
import Profile from './pages/Profile.jsx'
import Placeholder from './pages/PlaceHolder.jsx';

function App() {

  return (
    <>
    <BrowserRouter>
    <HosterProvider>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/settingUp" element={<HosterSetup />} />
        <Route path="/CreateEvent" element={<CreateEvent />} />
        <Route path="/EventTickets" element={<EventTickets />} />
        <Route path="/BankDetails" element={<BankDetails />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Marketplace" element={<VendorMarketplace />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Messages" element={<Placeholder />} />
        <Route path="/Settings" element={<Placeholder />} />
      </Routes>
    </HosterProvider>
    </BrowserRouter>
    </>
  )
}

export default App
