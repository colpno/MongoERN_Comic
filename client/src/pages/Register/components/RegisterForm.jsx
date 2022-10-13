import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { Button, CheckBox } from "components";
import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import styles from "../styles/RegisterForm.module.scss";
import { INITIAL_VALUE, VALIDATION_SCHEMA } from "./constant";

const cx = classNames.bind(styles);

function RegisterForm({ handleSubmit }) {
  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={VALIDATION_SCHEMA}
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
            />
            <FormLabel name="phone" label="Số điện thoại" required />
            <FastField
              name="phone"
              component={InputField}
              placeholder="Viết số điện thoại..."
            />
            <FormLabel
              name="password"
              label="Mật khẩu"
              subLabel={[
                "Gồm chữ thường, chữ hoa, số, ký tự đặc biệt",
                "Tối thiểu 8 ký tự, tối đa 15 ký tự",
              ]}
              required
            />
            <FastField
              name="password"
              component={InputField}
              type="password"
              placeholder="Viết mật khẩu..."
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
            />
            <div className={cx("service-term")}>
              <FastField name="termOfService" component={CheckBox}>
                <span className={cx("term-label")}>
                  Tôi đồng ý với điều khoản{" "}
                  <span className="bold">Bảo mật</span> và{" "}
                  <span className="bold">bảo mật</span>
                </span>
              </FastField>
            </div>
            <Button primary rounded className={cx("submit")} type="submit">
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
};

export default RegisterForm;
