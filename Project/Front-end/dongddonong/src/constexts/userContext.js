import React, { createContext, useState, useContext } from 'react';

const userContext = createContext();

export function UserContextProvider({ children }) {
  const initialToken = localStorage.getItem('token');
  const [user, setUser] = useState({
    id: 0,
    type: ' ',
    profileImgUrl: '',
    name: ' ',
    nickName: ' ',
    email: ' ',
    accessToken: initialToken,
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
    <userContext.Provider value={{ user, loggedIn, setLoggedUser, setLoggedOut }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}