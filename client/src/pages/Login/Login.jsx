import classNames from "classnames/bind";
import { Button } from "components";

import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
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
  );
}

export default Login;
