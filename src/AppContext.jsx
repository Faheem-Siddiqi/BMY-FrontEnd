import React, { createContext, useState } from 'react';
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [role, setRole] = useState('group-lead');
  // group-lead
  // supervisor
  // researchers
  //erc-head
  //erc-members


  //information
  //scientific-review
  //ethical-review
  //consent
  return (
    <AppContext.Provider value={{ role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
