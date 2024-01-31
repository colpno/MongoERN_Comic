import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import * as Yup from "yup";

import { FormWrapper } from "components";
import { Popup } from "features";
import { useForgotPassword, usePopup } from "hooks";
import styles from "./ForgotPassword.module.scss";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

const cx = classNames.bind(styles);

function ForgotPassword() {
  const { popup, setPopup, triggerPopup } = usePopup();
  const { forgotPassword } = useForgotPassword();

  const INITIAL_VALUES = {
    username: "",
    email: "",
  };

  const VALIDATION_SCHEMA = Yup.object({
    username: Yup.string()
      .matches(/^\w+$/g, "Tên người dùng phải là chữ cái hoặc số")
      .trim()
      .required("Tên đăng nhập không được để trống"),
    email: Yup.string().email("Định dạng email không hợp lệ").required("Email không được để trống"),
  });

  const handleSubmit = async (values) => {
    const { username, email } = values;

    if (username && email) {
      const response = await forgotPassword({ username, email }).unwrap();

      setPopup({
        isTriggered: true,
        title: "Thông báo",
        content: response.message,
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
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default ForgotPassword;
