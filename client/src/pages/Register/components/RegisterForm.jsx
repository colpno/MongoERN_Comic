import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { Button } from "components";
import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import styles from "../styles/RegisterForm.module.scss";

const cx = classNames.bind(styles);

function RegisterForm({ handleSubmit, initialValue, validationSchema }) {
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <FormLabel name="username" label="Tên đăng nhập" required />
            <FastField
              name="username"
              component={InputField}
              placeholder="Viết tên đăng nhập..."
              autoFocus
              maxLength={20}
              letterCount
            />
            <FormLabel name="email" label="Email" required />
            <FastField
              name="email"
              component={InputField}
              placeholder="Viết địa chỉ email..."
            />
            <FormLabel name="password" label="Mật khẩu" required />
            <ul className={cx("un-ordered-list")}>
              <li className={cx("lower-case")}>Tối thiểu 1 ký tự chữ thường</li>
              <li className={cx("upper-case")}>Tối thiểu 1 ký tự chữ hoa</li>
              <li className={cx("number-character")}>Tối thiểu 1 ký tự số</li>
              <li className={cx("special-character")}>
                Tối thiểu 1 ký tự đặc biết
              </li>
              <li className={cx("minmax-character")}>
                Tối thiểu 8 ký tự, tối đa 20 ký tự
              </li>
            </ul>
            <FastField
              name="password"
              component={InputField}
              type="password"
              placeholder="Viết mật khẩu..."
              maxLength={20}
              letterCount
            />
            <FormLabel
              name="confirmPassword"
              label="Nhập lại mật khẩu"
              required
            />
            <FastField
              name="confirmPassword"
              component={InputField}
              type="password"
              placeholder="Viết lại mật khẩu..."
              maxLength={20}
              letterCount
            />
            <Button primary round className={cx("submit")} type="submit">
              Đăng ký
            </Button>{" "}
          </Form>
        );
      }}
    </Formik>
  );
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValue: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
};

export default RegisterForm;
