import classNames from "classnames/bind";
import { Button } from "components";
import { useToast } from "hooks";
import { login as dispatchLogin } from "libs/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "services/auth";
import { convertUserPropertyToString } from "utils/convertArrayPropertyToString";

import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Toast, options: toastOptions, toastEmitter } = useToast();

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values;
    login(username, password)
      .then((response) => {
        if (response) {
          const converted = convertUserPropertyToString(response);
          dispatch(dispatchLogin(converted));
          navigate("/");
        }
      })
      .catch((error) => {
        const { data } = error;
        toastEmitter(data.error || data.message, "error");
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
      <Toast {...toastOptions} />
    </>
  );
}

export default Login;
