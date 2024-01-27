import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Loading, Popup, Toast } from "features";
import { usePopup } from "hooks";
import RouteHandler from "routes/RouteHandler";

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
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const { isLoading } = useSelector((state) => state.common);
  const theme = useSelector((state) => state.theme.theme);
  const url = useLocation().pathname;

  useEffect(() => {
    if (handlePrivateRouteForGuess(url, isLoggingIn)) {
      setPopup({
        isShown: true,
        title: "Thông báo",
        content: "Bạn đã đăng nhập nên không thể truy cập vào trang",
        onConfirm: () => navigate("/"),
      });
    }
  }, [url]);

  return (
    <div data-theme={theme}>
      <RouteHandler isLoggingIn={isLoggingIn} />
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      {isLoading && <Loading />}
      <Toast />
    </div>
  );
}

export default App;
