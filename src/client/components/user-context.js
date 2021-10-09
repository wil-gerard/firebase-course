import React, { useEffect } from 'react';
import firebase from '../../firebase/clientApp';
import useLocalStorage from '../hooks/useLocalStorage';
import { USERS } from '../../firebase/index';

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', {});
  const [teamId, setTeamId] = useLocalStorage('teamId', '');

  const db = firebase.firestore();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((id) => {
      setUser(id);
    });
  }, []);

  useEffect(() => {
    if (user) {
      db.collection(USERS).doc(user.uid).get()
        .then((userDoc) => setTeamId(userDoc.data().teamId))
        .catch((error) => console.error(error));
    } else {
      setTeamId(null);
    }
  }, [user]);

  const value = { user, setUser, teamId };
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
