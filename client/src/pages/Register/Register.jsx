import classNames from "classnames/bind";

import { robotHead1 } from "assets/images/index";
import { Button } from "components";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { useDispatch } from "react-redux";
import { userService } from "services";
import { registerFormValidation } from "validations/registerForm.validation";
import RegisterForm from "./components/RegisterForm";
import styles from "./styles/Register.module.scss";

const cx = classNames.bind(styles);

function Register() {
  const dispatch = useDispatch();
  const { popup, setPopup, triggerPopup } = usePopup();
  const { Toast, options: toastOptions, toastEmitter } = useToast();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(setLoading(false));

    const { username, email, password } = values;
    userService
      .register({ username, password, email, role: "member", avatar: robotHead1 })
      .then((response) => {
        setPopup({
          isTriggered: true,
          title: "Thông báo",
          content: response.message,
        });
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });

    dispatch(setLoading(false));
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
      <Popup data={popup} trigger={triggerPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default Register;
