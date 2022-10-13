import useReviewImage from "hooks/useReviewImage";
import PropTypes from "prop-types";
import { FiUpload } from "react-icons/fi";
import "./InputImage.scss";

function InputImage({ field, imageBlob, imageSize, fileSize, ...attributes }) {
  const { accept, multiple, disabled } = attributes;
  const { width, height } = imageSize;
  const { imagePreview, handleImageChange } = useReviewImage(
    {
      preview: imageBlob || null,
    },
    field
  );

  return (
    <div className="input-file-wrapper">
      <input
        {...field}
        onChange={handleImageChange}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="input-file-wrapper__input"
      />

      <span className="input-file-wrapper__custom">
        <FiUpload className="input-file-wrapper__custom__icon" />
        <p className="input-file-wrapper__custom_label">
          Kéo thả ảnh vào đây hoặc
        </p>
        <p className="input-file-wrapper__custom__label--primary">Chọn ảnh</p>
        <p className="input-file-wrapper__custom__requirement">
          JPG/PNG {width}
          {width && height ? "x" : "px"}
          {height} ({fileSize}MB)
        </p>
      </span>
      <img
        className="input-file-wrapper__custom-image-holder"
        src={imagePreview?.preview}
        alt=""
      />
    </div>
  );
}

InputImage.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  fileSize: PropTypes.number,
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  imageBlob: PropTypes.string,
  attributes: PropTypes.shape({
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
};

InputImage.defaultProps = {
  fileSize: 2,
  imageSize: {},
  imageBlob: false,
  attributes: {
    accept: ".jpg, .png",
    multiple: false,
    disabled: false,
  },
};

export default InputImage;
