import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useAuthenticate() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    email: "",
    username: "",
    expiredAt: "",
  });

  useEffect(() => {
    const loginInfoCookie = Cookies.get("loginInfo");

    if (loginInfoCookie) {
      setLoginInfo(JSON.parse(loginInfoCookie));
    } else {
      navigate("/login");
    }
  }, [setLoginInfo, navigate]);

  return {
    loginInfo,
  };
}

export default useAuthenticate;
