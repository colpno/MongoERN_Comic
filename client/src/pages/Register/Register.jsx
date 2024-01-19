import classNames from "classnames/bind";

import { robotHead1 } from "assets/images/index";
import { Button } from "components";
import { Popup, ProgressCircle } from "features";
import { usePopup, useToast } from "hooks";
import { useState } from "react";
import { userService } from "services";
import { registerFormValidation } from "validations/registerForm.validation";
import RegisterForm from "./components/RegisterForm";
import styles from "./styles/Register.module.scss";

const cx = classNames.bind(styles);

function Register() {
  const { popup, setPopup, triggerPopup } = usePopup();
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [progress, setProgress] = useState(0);

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, email, password } = values;
    userService
      .register({ username, password, email, role: "member", avatar: robotHead1 })
      .then((response) => {
        setPopup({
          isShown: true,
          title: "Thông báo",
          content: response.message,
        });
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });

    setProgress(0);
    setSubmitting(false);
  };

  const INITIAL_VALUE = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <>
      <div className={cx("register")}>
        <h2 className={cx("title")}>Đăng ký</h2>
        <RegisterForm
          handleSubmit={handleSubmit}
          initialValue={INITIAL_VALUE}
          validationSchema={registerFormValidation}
        />
        <div className={cx("aside")}>
          <p className={cx("forgot-password")}>
            Quên mật khẩu?{" "}
            <Button to="/forgot-password" text>
              <mark>Nhấn vào đây</mark>
            </Button>
          </p>
          <p className={cx("login")}>
            Bạn đã có tài khoản?{" "}
            <Button to="/login" text>
              <mark>Đăng nhập</mark>
            </Button>
          </p>
        </div>
      </div>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <ProgressCircle percentage={progress} />
      <Toast {...toastOptions} />
    </>
  );
}

export default Register;
