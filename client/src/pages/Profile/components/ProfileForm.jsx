import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { Image } from "components";
import Button from "components/Button";
import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import { profileFormValidation } from "validations/profileForm.validation";
import styles from "../styles/ProfileForm.module.scss";

const cx = classNames.bind(styles);

function ProfileForm({
  avatar,
  INITIAL_VALUE,
  handleSubmit,
  handleOpenChooseAvatar,
}) {
  return (
    <Formik
      enableReinitialize
      initialValues={INITIAL_VALUE}
      validationSchema={profileFormValidation}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <div className={cx("avatar-container")}>
              <Image
                src={avatar}
                alt="avatar"
                width={150}
                height={150}
                className={cx("avatar")}
              />
              <Button gray dark80 small onClick={handleOpenChooseAvatar}>
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
            <FastField
              name="email"
              component={InputField}
              placeholder="Viết địa chỉ email..."
            />

            <FormLabel name="dateOfBirth" label="Ngày sinh" />
            <FastField
              name="dateOfBirth"
              component={InputField}
              placeholder="dd/mm/yyyy"
            />

            <Button primary type="submit" className={cx("form__submit")}>
              Thay đổi
            </Button>

            {/* REMOVE: <pre>{JSON.stringify(formikProps.values, null, 4)}</pre> */}
          </Form>
        );
      }}
    </Formik>
  );
}

ProfileForm.propTypes = {
  avatar: PropTypes.string.isRequired,
  INITIAL_VALUE: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleOpenChooseAvatar: PropTypes.func.isRequired,
};

export default ProfileForm;
