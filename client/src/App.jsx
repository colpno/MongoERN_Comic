import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Popup } from "features";
import RouteHandler from "routes/RouteHandler";

const handlePrivateRouteForGuess = (url, isLoggingIn, setPopup) => {
  const array = ["login", "register", "reset-password", "forgot-password"];

  const haveAccessed = array.some((pathName) => url.includes(pathName));

  if (haveAccessed && isLoggingIn) {
    setPopup((prev) => ({
      ...prev,
      trigger: true,
      content: "Bạn đã đăng nhập nên không thể truy cập vào trang",
    }));
  }
};

function App() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
    isClosed: false,
  });
  const { isLoggingIn } = useSelector((state) => state.user);
  const url = useLocation().pathname;

  useEffect(() => {
    handlePrivateRouteForGuess(url, isLoggingIn, setPopup);
  }, [url]);

  useEffect(() => {
    popup.isClosed && navigate("/");
  }, [popup.isClosed]);

  return (
    <>
      <RouteHandler isLoggingIn={isLoggingIn} />
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default App;
