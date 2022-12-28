/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { Popup } from "features";
import { useToast } from "hooks";
import { setLoginInfo } from "libs/redux/slices/loginSlice";
import { authService } from "services";
import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
    isClosed: false,
  });
  const { Toast, options: toastOptions, toastEmitter } = useToast();

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values;
    authService
      .login(username, password)
      .then((response) => {
        dispatch(setLoginInfo(response.data));

        setPopup((prev) => ({
          ...prev,
          trigger: true,
          content: response.message,
        }));
      })
      .catch((error) => {
        toastEmitter(error, "error");
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
        <div className={cx("aside")}>
          <p className={cx("forgot-password")}>
            Quên mật khẩu?{" "}
            <Button to="/forgot-password" text>
              <mark>Nhấn vào đây</mark>
            </Button>
          </p>
          <p className={cx("register")}>
            Bạn chưa có tài khoản?{" "}
            <Button to="/register" text>
              <mark>Đăng ký</mark>
            </Button>
          </p>
        </div>
      </div>
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default Login;
