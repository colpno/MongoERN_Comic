import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Popup } from "features";
import RouteHandler from "routes/RouteHandler";
import { usePopup } from "hooks";

const handlePrivateRouteForGuess = (url, isLoggingIn) => {
  const array = ["login", "register", "reset-password", "forgot-password"];

  const haveAccessed = array.some((pathName) => url.includes(pathName));

  if (haveAccessed && isLoggingIn) {
    return true;
  }

  return false;
};

function App() {
  const navigate = useNavigate();
  const { popup, setPopup, triggerPopup } = usePopup();
  const { isLoggingIn } = useSelector((state) => state.user);
  const url = useLocation().pathname;

  useEffect(() => {
    if (handlePrivateRouteForGuess(url, isLoggingIn, setPopup)) {
      setPopup({
        isShown: true,
        title: "Thông báo",
        content: "Bạn đã đăng nhập nên không thể truy cập vào trang",
        onConfirm: () => navigate("/"),
      });
    }
  }, [url]);

  return (
    <>
      <RouteHandler isLoggingIn={isLoggingIn} />
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
    </>
  );
}

export default App;
