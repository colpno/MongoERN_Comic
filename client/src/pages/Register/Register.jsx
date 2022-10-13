import classNames from "classnames/bind";
import { Button } from "components";

import RegisterForm from "./components/RegisterForm";
import styles from "./styles/Register.module.scss";

const cx = classNames.bind(styles);

function Register() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className={cx("register")}>
      <h2 className={cx("title")}>Đăng ký</h2>
      <RegisterForm handleSubmit={handleSubmit} />
      <div className={cx("aside")}>
        <p className={cx("login")}>
          Bạn đã có tài khoản?{" "}
          <Button to="/login" text>
            <mark>Đăng nhập</mark>
          </Button>
        </p>
      </div>
    </div>
  );
}

export default Register;
