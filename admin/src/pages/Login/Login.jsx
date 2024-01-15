import classNames from "classnames/bind";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "services";

import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

const checkLoggedInCanAccessURL = (url) => {
  const array = ["/", "verify"];

  const haveAccessed = array.some((pathName) => url.includes(pathName));
  return haveAccessed;
};

function Login() {
  const navigate = useNavigate();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup({ isShown: false, content: "Nothing" });
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const url = useLocation().pathname;
  const haveAccessed = useMemo(() => checkLoggedInCanAccessURL(url), [url]);

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values;

    authService
      .login(username, password)
      .then((response) => {
        setPopup({
          isShown: true,
          title: "Thông báo",
          content: response.message,
          onCancel: () => navigate("/verify"),
        });
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });

    setSubmitting(false);
  };

  return (
    <>
      {(!haveAccessed && !isLoggingIn) ||
        (!isLoggingIn && (
          <div className={cx("login")}>
            <h2 className={cx("title")}>Đăng nhập</h2>
            <LoginForm handleSubmit={handleSubmit} />
          </div>
        ))}
      {popup.isShown && <Popup data={popup} setShow={() => triggerPopup(false)} />}
      <Toast {...toastOptions} />
    </>
  );
}

export default Login;
