import classNames from "classnames/bind";
import { useState } from "react";
import { Container } from "react-bootstrap";
import * as Yup from "yup";

import FormWrapper from "components/FormWrapper/FormWrapper";
import { Popup } from "features";
import { useToast } from "hooks";
import { forgotPassword } from "services/auth";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import styles from "./ForgotPassword.module.scss";

const cx = classNames.bind(styles);

function ForgotPassword() {
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
      forgotPassword({ username, email })
        .then((response) => {
          const content = (
            <p style={{ textAlign: "center" }}>{response.message}</p>
          );

          setPopup({
            ...popup,
            trigger: true,
            content,
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
