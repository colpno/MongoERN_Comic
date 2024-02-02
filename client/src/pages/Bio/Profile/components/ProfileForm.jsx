import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { Button, Image } from "components";
import { FormLabel, InputField } from "libs/formik";
import { memo } from "react";
import { profileFormValidation } from "validations/profileForm.validation";
import styles from "../styles/ProfileForm.module.scss";

const cx = classNames.bind(styles);

function ProfileForm({ initialValues, handleSubmit, handleOpenChooseAvatar }) {
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={profileFormValidation}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <div className={cx("avatar-container")}>
              <Image
                src={initialValues.avatar}
                alt="avatar"
                width={150}
                height={150}
                className={cx("avatar")}
              />
              <Button grey dark80 small onClick={handleOpenChooseAvatar}>
                Đổi ảnh đại diện
              </Button>
            </div>

            <FormLabel name="username" label="Tên đăng nhập" required />
            <FastField
              name="username"
              component={InputField}
              placeholder="Viết tên người dùng..."
            />

            <FormLabel name="email" label="Địa chỉ email" required />
            <FastField name="email" component={InputField} placeholder="Viết địa chỉ email..." />

            <FormLabel name="paypalEmail" label="PayPal Email" />
            <FastField
              name="paypalEmail"
              component={InputField}
              placeholder="Viết địa chỉ email..."
            />

            <FormLabel name="dateOfBirth" label="Ngày sinh" />
            <FastField name="dateOfBirth" component={InputField} placeholder="dd/mm/yyyy" />

            <Button
              primary
              type="submit"
              className={cx("form__submit")}
              style={{ marginTop: "3rem" }}
            >
              Thay đổi
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

ProfileForm.propTypes = {
  initialValues: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleOpenChooseAvatar: PropTypes.func.isRequired,
};

export default memo(ProfileForm);
