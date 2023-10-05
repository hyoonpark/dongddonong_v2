import React, { useEffect } from "react";

import axios from "../../api/axiosConfig";
import { useUserContext } from "../../contexts/userContext";

const LoginLoading = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const { setLoggedUser } = useUserContext();

  useEffect(() => {
    axios
      .get(`/user/login?code=${code}`)
      .then((res) => {
        setLoggedUser(res.data.data);
      })
      .catch((error) => {
        console.log("실패!!!!!!", error);
      });
  }, []);

  return <div>로그인 중..</div>;
};

export default LoginLoading;
