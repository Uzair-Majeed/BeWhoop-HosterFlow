import React, { createContext, useState } from 'react';

export const HosterContext = createContext();

export const HosterProvider = ({ children }) => {
  const [hosterData, setHosterData] = useState({
    firstName: '',
    lastName:'',
    email : '',
    password : '',
    eventFrequency : '',
    avgSize : 0,
    eventTypes : [],
    portfolio: [],
  });

  return (
    <HosterContext.Provider value={{ hosterData, setHosterData }}>
      {children}
    </HosterContext.Provider>
  );
};
