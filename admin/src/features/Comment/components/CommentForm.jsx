import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { Button } from "components";
import { QuillAreaField } from "libs/formik";
import styles from "../styles/CommentForm.module.scss";

const cx = classNames.bind(styles);

function CommentForm({ initialValues, handleSubmit }) {
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            <FastField component={QuillAreaField} name="text" bold italic underline strike link />

            <div className={cx("button-container")}>
              <Button primary type="submit" className={cx("submit-button")}>
                Đồng ý
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

CommentForm.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CommentForm;
