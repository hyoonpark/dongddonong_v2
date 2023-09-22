import React, { createContext, useState, useContext } from 'react';

const userContext = createContext();

export function UserContextProvider({ children }) {
  const initialToken = localStorage.getItem('token');
  const initialId = localStorage.getItem('id');
  const initialProfileImgUrl = localStorage.getItem('profileImgUrl');
  const initialnickName = localStorage.getItem('nickName');
  const initialLoggedIn = localStorage.getItem('loggedIn');

  const [user, setUser] = useState({
    id: initialId,
    type: null,
    profileImgUrl: initialProfileImgUrl,
    name: null,
    nickName: initialnickName,
    email: null,
    accessToken: initialToken,
  });

  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  const setLoggedUser = (userData) => {
    setUser(userData);
    setLoggedIn(true);
    localStorage.setItem('token', userData.accessToken)
    localStorage.setItem('id', userData.id)
    localStorage.setItem('nickName', userData.nickName)
    localStorage.setItem('profileImgUrl', userData.profileImgUrl)
    localStorage.setItem('loggedIn', 'true');
  };

  const setLoggedOut = () => {
    setUser({
      id: null,
      type: null,
      profileImgUrl: null,
      name: null,
      nickName: null,
      email: null,
      accessToken: null,
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
