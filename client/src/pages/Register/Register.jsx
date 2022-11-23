import classNames from "classnames/bind";
import { useState } from "react";
import * as Yup from "yup";

import { Button } from "components";
import { Popup } from "features";
import { register } from "services/auth";
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
      // if (response.affectedRows > 0) {
      setPopup({
        trigger: true,
        title: "Thông báo",
        content: response.message,
      });
      // }
    });

    setSubmitting(false);
  };

  const INITIAL_VALUE = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    username: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/g, "Tên đăng nhập chỉ gồm chữ cái và số")
      .max(20, "Độ dài tối đa là 20 ký tự")
      .required("Tên đăng nhập không được để trống"),
    password: Yup.string()
      .min(8, "Tối thiểu 8 ký tự")
      .max(20, "Tối đa 20 ký tự")
      .matches(/[a-z]+/g, "Tối thiểu 1 ký tự chữ thường")
      .matches(/[A-Z]+/g, "Tối thiểu 1 ký tự chữ hoa")
      .matches(/\d+/g, "Tối thiểu 1 ký tự số")
      .matches(/\W+/g, "Tối thiểu 1 ký tự đặc biết")
      .required("Mật khẩu không được để trống"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Mật khẩu Không trùng khớp")
      .required("Nhập lại mật khẩu để chắc chắn bạn nhập đúng mật khẩu"),
    email: Yup.string()
      .email("Định dạng mail không hợp lệ")
      .required("Email không được để trống"),
    // phone: Yup.string()
    //   .min(10, "Số điện thoại gồm có 10 chữ số")
    //   .max(10, "Số điện thoại gồm có 10 chữ số")
    //   .matches(/\d+/g, "Số điện thoại chỉ bao gồm số")
    //   .matches(/^0/, "Số điện thoại bắt đầu bằng số 0")
    //   .required("Số điện thoại là cần thiết khi quên mật khẩu"),
  });

  return (
    <>
      <div className={cx("register")}>
        <h2 className={cx("title")}>Đăng ký</h2>
        <RegisterForm
          handleSubmit={handleSubmit}
          initialValue={INITIAL_VALUE}
          validationSchema={VALIDATION_SCHEMA}
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
