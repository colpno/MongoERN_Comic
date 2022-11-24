import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import moment from "moment";
import * as Yup from "yup";

import { Image } from "components";
import Button from "components/Button";
import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import styles from "../styles/ProfileForm.module.scss";

const cx = classNames.bind(styles);

function ProfileForm({
  avatar,
  INITIAL_VALUE,
  handleSubmit,
  handleOpenChooseAvatar,
}) {
  const VALIDATION_SCHEMA = Yup.object({
    avatar: Yup.string().required("Hình đại diện không được để trống"),
    username: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/g, "Tên người dùng phải là chữ cái hoặc số")
      .max(20, "Độ dài tối đa là 20 ký tự")
      .required("Tên hiển thị không được để trống"),
    email: Yup.string()
      .email("Định dạng mail không hợp lệ")
      .required("Email không được để trống"),
    dateOfBirth: Yup.date()
      .transform((value, originalValue) =>
        value ? moment(originalValue, "DD/MM/YYYY").toDate() : value
      )
      .typeError("Ngày sinh không chính xác")
      .min("01/01/1900", "Ngày sinh không được nhỏ hơn 01/01/1900")
      .max(moment().toDate(), "Ngày sinh không được vượt quá hôm nay"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={INITIAL_VALUE}
      validationSchema={VALIDATION_SCHEMA}
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
            {/* <pre>{JSON.stringify(formikProps.values, null, 4)}</pre> */}
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
