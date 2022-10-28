import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Button } from "components";
import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import styles from "../styles/LoginForm.module.scss";
import { INITIAL_VALUE, VALIDATION_SCHEMA } from "./constant";

const cx = classNames.bind(styles);

function LoginForm({ handleSubmit }) {
  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <FormLabel name="userName" label="Tên đăng nhập" />
            <FastField name="userName" component={InputField} />

            <FormLabel name="password" label="Mật khẩu" />
            <FastField name="password" component={InputField} type="password" />

            <Button primary rounded className={cx("submit")} type="submit">
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
