import PropTypes from "prop-types";
import { InputImage } from "components";

function FileField(props) {
  return <InputImage {...props} />;
}

FileField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  fileSize: PropTypes.number,
  imgSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  imageBlob: PropTypes.string,
  closeIcon: PropTypes.bool,
  handleCloseIconClick: PropTypes.func,
};

FileField.defaultProps = {
  form: {},
  fileSize: 2,
  imgSize: {},
  accept: ".jpg, .png",
  multiple: false,
  disabled: false,
  imageBlob: "",
  closeIcon: false,
  handleCloseIconClick: () => {},
};

export default FileField;
