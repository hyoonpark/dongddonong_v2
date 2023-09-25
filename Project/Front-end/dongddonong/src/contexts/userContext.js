import React, { createContext, useState, useContext } from 'react';
import { getLogout } from './../api/userApi';

const userContext = createContext();

export function UserContextProvider({ children }) {
  const initialToken = localStorage.getItem('accessToken');
  const initialId = localStorage.getItem('id');
  const initialProfileImgUrl = localStorage.getItem('profileImgUrl');
  const initialnickName = localStorage.getItem('nickName');
  // 로컬스토리지의 액세스 토큰 여부에 따라서 로그인 상태를 업데이트해준다. 
  const initialLoggedIn = localStorage.getItem('accessToken') !== null;

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
    localStorage.setItem('accessToken', userData.accessToken)
    localStorage.setItem('id', userData.id)
    localStorage.setItem('nickName', userData.nickName)
    localStorage.setItem('profileImgUrl', userData.profileImgUrl)
  };

  const setLoggedOut = async () => {
    try {
      await getLogout(user.id);

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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('id');
      localStorage.removeItem('profileImgUrl');
      localStorage.removeItem('nickName');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
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
