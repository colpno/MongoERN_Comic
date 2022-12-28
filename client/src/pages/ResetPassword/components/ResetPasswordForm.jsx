import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { InputField, FormLabel } from "libs/formik";
import { Button } from "components";
import { FaChevronRight } from "react-icons/fa";

function ResetPasswordForm({
  INITIAL_VALUES,
  VALIDATION_SCHEMA,
  cx,
  handleSubmit,
}) {
  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <FormLabel name="password" label="Mật khẩu mới" required />
            <FastField
              name="password"
              component={InputField}
              placeholder="Nhập mật khẩu mới..."
              type="password"
              autoFocus
            />

            <FormLabel
              name="confirmPassword"
              label="Nhập lại mật khẩu mới"
              required
            />
            <FastField
              name="confirmPassword"
              component={InputField}
              placeholder="Nhập lại mật khẩu mới..."
              type="password"
            />

            <Button
              primary
              round
              type="submit"
              onClick={handleSubmit}
              className={cx("submit-button")}
            >
              Hoàn thành
              <FaChevronRight className={cx("chevron-icon", "chevron-right")} />
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

ResetPasswordForm.propTypes = {
  INITIAL_VALUES: PropTypes.shape({
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
  VALIDATION_SCHEMA: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cx: PropTypes.func.isRequired,
};

export default ResetPasswordForm;
