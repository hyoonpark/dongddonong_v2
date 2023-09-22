import React, { useState } from "react";
import userContext from "./userContext";

const userContextProvider = ({ children }) => {
  const initialState = {
    loggedUser: {
      id: 0,
      type: ' ',
      profileImgUrl: '',
      name: ' ',
      nickName: ' ',
      email: ' ',
      accessToken: ' ',
    },
    loggedIn: false,
    setLoggedUser: () => {},
    setLoggedIn: () => {}
  };

  const [state, setState] = useState(initialState);

  return (
    <userContext.Provider value={state}>
      {children}
    </userContext.Provider>
  );
};

export default userContextProvider;
