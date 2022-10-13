import PropTypes from "prop-types";
import InputImage from "components/InputImage";

function FileField(props) {
  const { field, fileSize, imgSize, imageBlob, ...attributes } = props;

  return (
    <InputImage
      field={field}
      imageBlob={imageBlob}
      imageSize={imgSize}
      fileSize={fileSize}
      {...attributes}
    />
  );
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
};

FileField.defaultProps = {
  form: {},
  fileSize: 2,
  imgSize: {},
  accept: ".jpg, .png",
  multiple: false,
  disabled: false,
  imageBlob: "",
};

export default FileField;
