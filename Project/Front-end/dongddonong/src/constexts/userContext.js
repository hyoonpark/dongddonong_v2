import React, { createContext, useState, useContext } from 'react';

const userContext = createContext();

export function UserContextProvider({ children }) {
  const initialToken = localStorage.getItem('token');
  const initialId = localStorage.getItem('id');
  const initialProfileImgUrl = localStorage.getItem('profileImgUrl');
  const initialnickName = localStorage.getItem('nickName');
  const initialLoggedIn = localStorage.getItem('loggedIn') === 'true';

  const [user, setUser] = useState({
    id: initialId,
    type: ' ',
    profileImgUrl: initialProfileImgUrl,
    name: ' ',
    nickName: initialnickName,
    email: ' ',
    accessToken: initialToken,
  });
  
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  const setLoggedUser = (userData) => {
    setUser(userData);
    setLoggedIn(true);
    localStorage.setItem('token', userData.accessToken);
    localStorage.setItem('loggedIn', 'true'); 
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
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('profileImgUrl');
    localStorage.removeItem('nickName');
    localStorage.setItem('loggedIn', 'false');
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
