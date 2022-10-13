import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";

function Step3({ children, handleSubmit }) {
  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <FormLabel name="password" label="Mật khẩu mới" />
            <FastField
              name="password"
              component={InputField}
              placeholder="Nhập mật khẩu mới..."
            />

            <FormLabel name="confirmPassword" label="Nhập lại mật khẩu mới" />
            <FastField
              name="confirmPassword"
              component={InputField}
              placeholder="Nhập lại mật khẩu mới..."
            />

            {children}
          </Form>
        );
      }}
    </Formik>
  );
}

Step3.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Step3;
