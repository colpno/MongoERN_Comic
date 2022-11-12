import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";

import FormLabel from "libs/formik/FormLabel";
import { InputField } from "libs/formik";
import { Button } from "components";

function UpdateForm({ cx, admin, handleSubmit, setShowForm }) {
  const { username, password, email } = admin;
  return (
    <Formik
      initialValues={{ username, password, email }}
      onSubmit={handleSubmit}
    >
      {() => {
        return (
          <Form>
            <FormLabel name="username" label="Tên" />
            <FastField name="username" component={InputField} autoFocus />

            <FormLabel name="password" label="Mật khẩu" />
            <FastField name="password" component={InputField} type="password" />

            <FormLabel name="email" label="Email" />
            <FastField name="email" component={InputField} autoFocus />

            <div
              className={cx("buttons")}
              style={{
                marginTop: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button primary type="submit">
                Hoàn thành
              </Button>
              <Button outline gray onClick={() => setShowForm(false)}>
                Quay lại
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

UpdateForm.propTypes = {
  cx: PropTypes.func.isRequired,
  admin: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default UpdateForm;
