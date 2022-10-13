import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { FormLabel } from "react-bootstrap";
import classNames from "classnames/bind";

import Button from "components/Button";
import { InputField } from "libs/formik";
import styles from "./ProfileForm.module.scss";
import { VALIDATION_SCHEMA } from "../../pages/Profile/const";

const cx = classNames.bind(styles);

function ProfileForm({ INITIAL_VALUE, handleSubmit }) {
  return (
    <div className={cx("form")}>
      <h3 className={cx("form__head-title")}>Thông tin cá nhân</h3>
      <Formik
        initialValues={INITIAL_VALUE}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form>
              <FormLabel
                name="nickname"
                label="Tên hiển thị (Nickname)"
                required
              />
              <FastField
                name="nickname"
                component={InputField}
                placeholder="Viết tên người dùng..."
                letterCount
              />

              <FormLabel name="phone" label="Số điện thoại" required />
              <FastField
                name="phone"
                component={InputField}
                placeholder="Viết số điện thoại..."
                letterCount
              />

              <FormLabel name="dateOfBirth" label="Ngày sinh" />
              <FastField
                name="dateOfBirth"
                component={InputField}
                placeholder="dd/mm/yyyy"
              />

              <Button primary type="submit" className={cx("form__submit")}>
                Xác nhận
              </Button>

              {/* <pre>{JSON.stringify(formikProps.values, null, 4)}</pre> */}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

ProfileForm.propTypes = {
  INITIAL_VALUE: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ProfileForm;
