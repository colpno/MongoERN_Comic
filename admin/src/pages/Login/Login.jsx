import classNames from "classnames/bind";
import { Popup } from "features";
import { useToast } from "hooks";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "services";

import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

const checkLoggedInCanAccessURL = (url) => {
  const array = ["login", "verify"];

  const haveAccessed = array.some((pathName) => url.includes(pathName));
  return haveAccessed;
};

function Login() {
  const navigate = useNavigate();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const { popup, setPopup } = useState();
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
          onConfirm: () => navigate("/verify"),
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
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default Login;
