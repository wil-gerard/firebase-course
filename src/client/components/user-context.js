import React, { useEffect } from 'react';
import firebase from '../../firebase/clientApp';
import useLocalStorage from '../hooks/useLocalStorage';

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', {});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((id) => {
      setUser(id);
    });
  }, []);

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserProvider, useUser };
