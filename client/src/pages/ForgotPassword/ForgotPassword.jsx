import classNames from "classnames/bind";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { FormWrapper } from "components";
import { Popup } from "features";
import { useToast } from "hooks";
import { setLoginInfo } from "libs/redux/slices/login.slice";
import { authService } from "services";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import styles from "./ForgotPassword.module.scss";

const cx = classNames.bind(styles);

function ForgotPassword() {
  const dispatch = useDispatch();
  const { Toast, options, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });

  const INITIAL_VALUES = {
    username: "",
    email: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    username: Yup.string()
      .matches(/^\w+$/g, "Tên người dùng phải là chữ cái hoặc số")
      .trim()
      .required("Tên đăng nhập không được để trống"),
    email: Yup.string()
      .email("Định dạng email không hợp lệ")
      .required("Email không được để trống"),
  });

  const handleSubmit = (values) => {
    const { username, email } = values;

    if (username && email) {
      authService
        .forgotPassword(username, email)
        .then((response) => {
          dispatch(setLoginInfo(response.data));
          setPopup({
            ...popup,
            trigger: true,
            content: response.message,
          });
        })
        .catch((error) => {
          toastEmitter(
            error.data || error.data.error || error.data.message,
            "error"
          );
        });
    }
  };

  return (
    <>
      <Container>
        <FormWrapper title="Quên mật khẩu" cx={cx}>
          <ForgotPasswordForm
            INITIAL_VALUES={INITIAL_VALUES}
            VALIDATION_SCHEMA={VALIDATION_SCHEMA}
            handleSubmit={handleSubmit}
            cx={cx}
          />
        </FormWrapper>
      </Container>
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...options} />
    </>
  );
}

export default ForgotPassword;
