import React, { createContext, useState, useContext } from 'react';

const ChamaContext = createContext();

export const ChamaProvider = ({ children }) => {
  const [chamaData, setChamaData] = useState(null);

  const updateChamaData = (newChamaData) => {
    setChamaData(newChamaData);
  };

  return (
    <ChamaContext.Provider value={{ chamaData, updateChamaData }}>
      {children}
    </ChamaContext.Provider>
  );
};

export const useChamaContext = () => {
  return useContext(ChamaContext);
};
