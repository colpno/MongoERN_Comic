import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { Image } from "components";
import Button from "components/Button";
import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import styles from "../styles/ProfileForm.module.scss";

const cx = classNames.bind(styles);

function ProfileForm({ INITIAL_VALUE, handleSubmit, handleOpenChooseAvatar }) {
  const VALIDATION_SCHEMA = Yup.object({
    nickname: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/g, "Tên người dùng phải là chữ cái hoặc số")
      .max(15, "Độ dài tối đa là 15 ký tự")
      .required("Nickname là cần thiết để hiển thị"),
    email: Yup.string()
      .min(10, "Số điện thoại gồm có 10 chữ số")
      .max(10, "Số điện thoại gồm có 10 chữ số")
      .matches(/\d+/g, "Số điện thoại chỉ bao gồm số")
      .matches(/^0/, "Số điện thoại bắt đầu bằng số 0")
      .required("Số điện thoại là cần thiết khi quên mật khẩu"),
    dataOfBirth: Yup.string(),
  });

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
              <div className={cx("avatar-container")}>
                <Image
                  src="https://robohash.org/quisuntquia.png?size=200x200&set=set1"
                  alt="avatar"
                  width={120}
                  height={120}
                  className={cx("avatar")}
                />
                <Button gray dark80 small onClick={handleOpenChooseAvatar}>
                  Đổi ảnh đại diện
                </Button>
              </div>

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
                maxLength={20}
              />
              <FormLabel name="email" label="Địa chỉ email" required />
              <FastField
                name="email"
                component={InputField}
                placeholder="Viết số điện thoại..."
                letterCount
                maxLength={10}
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
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleOpenChooseAvatar: PropTypes.func.isRequired,
};

export default ProfileForm;
