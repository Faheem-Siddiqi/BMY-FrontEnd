import React, { createContext, useState } from 'react';
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [role, setRole] = useState('supervisor');
  return (
    <AppContext.Provider value={{ role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
