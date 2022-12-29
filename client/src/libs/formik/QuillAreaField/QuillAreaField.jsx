import { QuillArea } from "components";
import PropTypes from "prop-types";

function QuillAreaField({ field, ...props }) {
  return <QuillArea {...field} {...props} />;
}

QuillAreaField.propTypes = {
  field: PropTypes.shape({}).isRequired,
};

export default QuillAreaField;
