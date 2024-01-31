import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { Popup } from "features";
import { useLogin, usePopup } from "hooks";
import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const { popup, setPopup, triggerPopup } = usePopup();
  const { login } = useLogin();

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, password } = values;

    const response = await login({ username, password }).unwrap();

    setPopup({
      isTriggered: true,
      title: "Thông báo",
      content: response.message,
      onCancel: () => navigate("verify"),
    });

    setSubmitting(false);
  };

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
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default Login;
