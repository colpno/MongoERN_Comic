import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { FaChevronRight } from "react-icons/fa";

import { Button } from "components";
import { InputField, FormLabel } from "libs/formik";

function ForgotPasswordForm({
  INITIAL_VALUES,
  VALIDATION_SCHEMA,
  handleSubmit,
  cx,
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
            <FormLabel name="username" label="Tên đăng nhập" required />
            <FastField
              name="username"
              component={InputField}
              placeholder="Nhập tên đăng nhập..."
              autoFocus
            />

            <FormLabel name="email" label="Email" required />
            <FastField
              name="email"
              component={InputField}
              placeholder="Nhập email..."
            />

            <Button
              primary
              round
              type="submit"
              onClick={handleSubmit}
              className={cx("submit-button")}
            >
              Tiếp tục
              <FaChevronRight className={cx("chevron-icon", "chevron-right")} />
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

ForgotPasswordForm.propTypes = {
  INITIAL_VALUES: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  VALIDATION_SCHEMA: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cx: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
