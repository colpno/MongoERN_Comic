import classNames from "classnames/bind";
import { useState } from "react";
import { Container } from "react-bootstrap";
import * as Yup from "yup";

import FormWrapper from "components/FormWrapper/FormWrapper";
import { Popup } from "features";
import { forgotPassword } from "services/auth";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import styles from "./ForgotPassword.module.scss";

const cx = classNames.bind(styles);

function ForgotPassword() {
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });

  const INITIAL_VALUES = {
    username: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    username: Yup.string()
      .matches(/^\w+$/g, "Tên người dùng phải là chữ cái hoặc số")
      .trim()
      .required("Tên đăng nhập không được để trống"),
  });

  const handleSubmit = (values) => {
    const { username } = values;

    username &&
      forgotPassword({ username }).then((response) => {
        setPopup({ ...popup, trigger: true, content: response });
      });
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
    </>
  );
}

export default ForgotPassword;
