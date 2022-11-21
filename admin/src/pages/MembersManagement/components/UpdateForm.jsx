import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";

import FormLabel from "libs/formik/FormLabel";
import { InputField } from "libs/formik";
import { Button } from "components";
import { Popup } from "features";

function UpdateForm({
  cx,
  member,
  handleSubmit,
  setShowForm,
  popup,
  setPopup,
}) {
  const { name } = member;
  return (
    <>
      <Formik initialValues={{ name }} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form>
              <FormLabel name="name" label="Thể loại" />
              <FastField name="name" component={InputField} autoFocus />

              <div className={cx("buttons")}>
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
      <Popup yesno popup={popup} setPopup={setPopup} />
    </>
  );
}

UpdateForm.propTypes = {
  cx: PropTypes.func.isRequired,
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  popup: PropTypes.shape({
    trigger: PropTypes.bool.isRequired,
    isConfirm: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired,
    ]).isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
};

export default UpdateForm;
