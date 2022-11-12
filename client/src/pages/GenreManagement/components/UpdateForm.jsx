import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";

import FormLabel from "libs/formik/FormLabel";
import { InputField } from "libs/formik";
import { Button } from "components";

function UpdateForm({ cx, genre, handleSubmit, setShowForm }) {
  const { name } = genre;
  return (
    <Formik initialValues={{ name }} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <FormLabel name="name" label="Thể loại" />
            <FastField name="name" component={InputField} autoFocus />

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
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default UpdateForm;
