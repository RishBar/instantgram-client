import React from 'react';
import useUser from '../hooks/useUser';
import AppContext from '../contexts/AppContext';

const AppProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useUser();

  return (
    <AppContext.Provider value={{setCurrentUser, currentUser}} >
        {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
