import { Button } from "components/index.jsx";
import { FastField, Form, Formik } from "formik";
import { FormLabel, InputField } from "libs/formik/index.jsx";
import PropTypes from "prop-types";
import { changePasswordFormValidation } from "validations/changePasswordForm.validation.js";

function ChangePasswordForm({ initialValues, handleSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={changePasswordFormValidation}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <FormLabel name="password" label="Mật khẩu mới" required />
            <FastField
              name="password"
              type="password"
              component={InputField}
              placeholder="Nhập mật khẩu..."
            />

            <FormLabel name="rePassword" label="Nhập lại mật khẩu" required />
            <FastField
              name="rePassword"
              type="password"
              component={InputField}
              placeholder="Nhập mật khẩu..."
            />

            <Button primary type="submit" fullWidth style={{ marginTop: "3rem" }}>
              Thay đổi
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

ChangePasswordForm.propTypes = {
  initialValues: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
