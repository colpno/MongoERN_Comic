import classNames from "classnames/bind";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import FormWrapper from "components/FormWrapper/FormWrapper";
import { Popup } from "features";
import { useToast } from "hooks";
import { Container } from "react-bootstrap";
import { resetPassword } from "services/auth";
import styles from "./ResetPassword.module.scss";
import ResetPasswordForm from "./ResetPasswordForm";

const cx = classNames.bind(styles);

function ResetPassword() {
  const { token } = useParams();
  const { Toast, options, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "Thay đổi thành công",
  });

  const INITIAL_VALUES = { password: "", confirmPassword: "" };

  const VALIDATION_SCHEMA = Yup.object({
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
  });

  const handleSubmit = (values) => {
    const { password } = values;

    if (password) {
      resetPassword(token, password)
        .then((response) => {
          if (response.affectedRows > 0) {
            setPopup({ ...popup, trigger: true });
          }
        })
        .catch((error) => {
          toastEmitter(
            error.data || error.data.error || error.date.message,
            "error"
          );
        });
    }
  };

  return (
    <>
      <Container>
        <FormWrapper title="Quên mật khẩu" cx={cx}>
          <ResetPasswordForm
            cx={cx}
            handleSubmit={handleSubmit}
            INITIAL_VALUES={INITIAL_VALUES}
            VALIDATION_SCHEMA={VALIDATION_SCHEMA}
          />
        </FormWrapper>
      </Container>
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...options} />
    </>
  );
}

export default ResetPassword;
