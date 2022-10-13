import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { InputField } from "libs/formik";
import FormLabel from "libs/formik/FormLabel";

function Step1({ children, handleSubmit }) {
  return (
    <Formik initialValues={{ username: "", phone: "" }} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <FormLabel name="username" label="Tên đăng nhập" required />
            <FastField
              name="username"
              component={InputField}
              placeholder="Nhập tên đăng nhập..."
            />

            <FormLabel name="phone" label="Số điện thoại" required />
            <FastField
              name="phone"
              component={InputField}
              placeholder="Nhập số điện thoại..."
            />

            {children}
          </Form>
        );
      }}
    </Formik>
  );
}

Step1.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Step1;
