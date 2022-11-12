import PropTypes from "prop-types";
import { FastField, Form, Formik } from "formik";

import FormLabel from "libs/formik/FormLabel";
import { Button } from "components";
import { getAllApprovedStatuses } from "services/approvedStatus";
import { RadioGroup } from "libs/formik";

function UpdateForm({ cx, title, handleSubmit, setShowForm }) {
  const { approvedStatusId } = title;
  const { approvedStatuses } = getAllApprovedStatuses();
  const options = approvedStatuses.map((status) => {
    return {
      value: status.guid,
      label: status.name,
    };
  });

  return (
    <Formik initialValues={{ approvedStatusId }} onSubmit={handleSubmit}>
      {() => {
        return (
          <Form>
            {options.length > 0 && (
              <>
                <FormLabel name="approvedStatusId" label="Trạng thái" />
                <FastField
                  name="approvedStatusId"
                  component={RadioGroup}
                  options={options}
                  col={{ sm: 6, md: 4 }}
                />
              </>
            )}
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
  title: PropTypes.shape({
    approvedStatusId: PropTypes.string.isRequired,
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
};

export default UpdateForm;
