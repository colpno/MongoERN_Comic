import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { setLoginInfo } from "libs/redux/slices/login.slice";
import { authService } from "services";
import LoginForm from "./components/LoginForm";
import styles from "./styles/Login.module.scss";

const cx = classNames.bind(styles);

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { popup, setPopup, triggerPopup } = usePopup();
  const { Toast, options: toastOptions, toastEmitter } = useToast();

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, password } = values;
    authService
      .login(username, password)
      .then((response) => {
        dispatch(setLoginInfo(response.data));

        setPopup({
          isShown: true,
          title: "Thông báo",
          content: response.message,
          onCancel: () => navigate("verify"),
        });
      })
      .catch((error) => {
        toastEmitter(error, "error");
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
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
    </>
  );
}

export default Login;
