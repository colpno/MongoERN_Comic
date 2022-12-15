import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { Button } from "components";
import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import { loginFormValidation } from "validations/loginFormValidation";
import styles from "../styles/LoginForm.module.scss";

const cx = classNames.bind(styles);

function LoginForm({ handleSubmit }) {
  const INITIAL_VALUE = {
    username: "",
    password: "",
  };

  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={loginFormValidation}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <FormLabel name="username" label="Tên đăng nhập" />
            <FastField name="username" component={InputField} />

            <FormLabel name="password" label="Mật khẩu" />
            <FastField name="password" component={InputField} type="password" />

            <Button primary round className={cx("submit")} type="submit">
              Đăng nhập
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
