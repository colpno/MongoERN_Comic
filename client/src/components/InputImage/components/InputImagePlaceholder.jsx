import { FiUpload } from "react-icons/fi";
import PropTypes from "prop-types";

function InputImagePlaceholder({ fileSize, imageSize }) {
  return (
    <span className="input-file-wrapper__custom">
      <FiUpload className="input-file-wrapper__custom__icon" />
      <p className="input-file-wrapper__custom_label">Kéo thả ảnh vào đây hoặc</p>
      <p className="input-file-wrapper__custom__label--primary">Chọn ảnh</p>
      {fileSize && imageSize && (
        <p className="input-file-wrapper__custom__requirement">
          JPG/PNG {imageSize.width}
          {imageSize.width && imageSize.height ? "x" : "px"}
          {imageSize.height} ({fileSize}MB)
        </p>
      )}
    </span>
  );
}

InputImagePlaceholder.propTypes = {
  fileSize: PropTypes.number,
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

InputImagePlaceholder.defaultProps = {
  fileSize: undefined,
  imageSize: undefined,
};

export default InputImagePlaceholder;
