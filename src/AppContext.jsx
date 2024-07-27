import React, { createContext, useState } from 'react';
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [role, setRole] = useState('supervisor');
  // group-lead
  // supervisor
  // researchers
  //erc-head
  //erc-members


  //Information
  //Scientific Review (Synopsis)
  //Ethical Review
  //Consent
  return (
    <AppContext.Provider value={{ role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
