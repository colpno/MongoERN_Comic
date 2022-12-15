import classNames from "classnames/bind";
import { useState } from "react";

import { Button } from "components";
import { Popup } from "features";
import { register } from "services/auth";
import { registerFormValidation } from "validations/registerForm.validation";
import RegisterForm from "./components/RegisterForm";
import styles from "./styles/Register.module.scss";

const cx = classNames.bind(styles);

function Register() {
  const [popup, setPopup] = useState({
    trigger: false,
    title: "",
    content: "",
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { username, email, password } = values;
    register({ username, password, email, role: "member" }).then((response) => {
      setPopup({
        trigger: true,
        title: "Thông báo",
        content: response.message,
      });
    });

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
      <Popup popup={popup} setPopup={setPopup}>
        {popup.content}
      </Popup>
    </>
  );
}

export default Register;
