import { Button } from "components";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";
import { FaChevronRight } from "react-icons/fa";

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

            <Button
              primary
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
