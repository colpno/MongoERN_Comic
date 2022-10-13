import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";

import { InputField } from "libs/formik";

function Step2({ children, handleSubmit }) {
  return (
    <Formik initialValues={{ otp: "" }} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <FastField
              name="otp"
              component={InputField}
              placeholder="Nhập mã OTP..."
            />

            {children}
          </Form>
        );
      }}
    </Formik>
  );
}

Step2.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Step2;
