/* eslint-disable no-unused-vars */
import authApi from "api/authApi";
import userApi from "api/userApi";
import classNames from "classnames/bind";
import { Button } from "components";
import { login } from "libs/redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertUserPropertyToString } from "utils/convertArrayPropertyToString";

import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values;
    const fetchUser = async () => {
      try {
        const response = await authApi.login(username, password);
        const converted = convertUserPropertyToString(response);
        dispatch(login(converted));
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchUser();
    setSubmitting(false);
    navigate("/");
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
