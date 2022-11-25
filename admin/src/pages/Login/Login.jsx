import classNames from "classnames/bind";
import { Popup } from "features";
import { useToast } from "hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "services/auth";

import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
    isClosed: false,
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values;
    login(username, password)
      .then((response) => {
        setPopup((prev) => ({ ...prev, trigger: true, content: response }));
      })
      .catch((error) => {
        const { data } = error;
        toastEmitter(data.error || data.message, "error");
      });

    setSubmitting(false);
  };

  useEffect(() => {
    popup.isClosed && navigate("verify");
  }, [popup.isClosed]);

  return (
    <>
      <div className={cx("login")}>
        <h2 className={cx("title")}>Đăng nhập</h2>
        <LoginForm handleSubmit={handleSubmit} />
      </div>
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default Login;
