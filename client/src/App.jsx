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
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const { isLoading } = useSelector((state) => state.common);
  const theme = useSelector((state) => state.theme.theme);
  const url = useLocation().pathname;
  const { popup, triggerPopup } = usePopup({
    title: "Thông báo",
    content: "Bạn đã đăng nhập nên không thể truy cập vào trang",
    onConfirm: () => navigate("/"),
  });

  useEffect(() => {
    if (handlePrivateRouteForGuess(url, isLoggingIn)) {
      triggerPopup(true);
    }
  }, [url]);

  return (
    <div data-theme={theme}>
      <RouteHandler isLoggingIn={isLoggingIn} />
      <Popup data={popup} trigger={triggerPopup} />
      {isLoading && <Loading />}
      <Toast />
    </div>
  );
}

export default App;
