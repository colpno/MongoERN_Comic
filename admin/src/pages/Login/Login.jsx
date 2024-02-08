import classNames from "classnames/bind";
import { Popup } from "features";
import { useLogin, usePopup } from "hooks";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { FloatingContainer } from "components/index.jsx";
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
  const { popup, setPopup, triggerPopup } = usePopup({ isTriggered: false, content: "Nothing" });
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const url = useLocation().pathname;
  const haveAccessed = useMemo(() => checkLoggedInCanAccessURL(url), [url]);
  const { login } = useLogin();

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values;

    login({ username, password }).then((response) => {
      setPopup({
        isTriggered: true,
        title: "Thông báo",
        // content: response.data.message,
        content: `${response.data.message} (OTP: ${response.data.data.otp})`,
        onCancel: () => navigate("/verify"),
      });
    });

    setSubmitting(false);
  };

  useEffect(() => {
    if (isLoggingIn) navigate("/titles");
  }, [isLoggingIn]);

  return (
    <>
      {(!haveAccessed && !isLoggingIn) ||
        (!isLoggingIn && (
          <FloatingContainer className={cx("login")}>
            <h2 className={cx("title")}>Đăng nhập</h2>
            <LoginForm handleSubmit={handleSubmit} />
          </FloatingContainer>
        ))}
      <Popup data={popup} setShow={() => triggerPopup(false)} />
    </>
  );
}

export default Login;
