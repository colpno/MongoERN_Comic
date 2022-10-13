import PropTypes from "prop-types";
import { FiUpload } from "react-icons/fi";
import "../assets/InputMultiFile.scss";

function InputMultiFile({
  field,
  imageSize,
  fileSize,
  handleImagePreview,
  ...attributes
}) {
  const { accept, multiple, disabled } = attributes;
  const { width, height } = imageSize;

  return (
    <div className="multi-input-file-wrapper">
      <input
        {...field}
        onChange={handleImagePreview}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="multi-input-file-wrapper__input"
      />

      <span className="multi-input-file-wrapper__custom">
        <FiUpload className="multi-input-file-wrapper__custom__icon" />
        <p className="multi-input-file-wrapper__custom_label">
          Kéo thả ảnh vào đây hoặc
        </p>
        <p className="multi-input-file-wrapper__custom__label--primary">
          Chọn ảnh
        </p>
        <p className="multi-input-file-wrapper__custom__requirement">
          JPG/PNG {width}
          {width && height ? "x" : "px"}
          {height} ({fileSize}MB)
        </p>
      </span>
    </div>
  );
}

InputMultiFile.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  handleImagePreview: PropTypes.func.isRequired,
  fileSize: PropTypes.number,
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  attributes: PropTypes.shape({
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
};

InputMultiFile.defaultProps = {
  fileSize: 2,
  imageSize: {},
  attributes: {
    accept: ".jpg, .png",
    multiple: false,
    disabled: false,
  },
};

export default InputMultiFile;
