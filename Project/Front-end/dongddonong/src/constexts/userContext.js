import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({
    id: 0,
    type: ' ',
    profileImgUrl: '',
    name: ' ',
    nickName: ' ',
    email: ' ',
    accessToken: ' ',
  });
  
  const [loggedIn, setLoggedIn] = useState(false);

  const setLoggedUser = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  const setLoggedOut = () => {
    setUser({
      id: 0,
      type: ' ',
      profileImgUrl: '',
      name: ' ',
      nickName: ' ',
      email: ' ',
      accessToken: ' ',
    });
    setLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, loggedIn, setLoggedUser, setLoggedOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}