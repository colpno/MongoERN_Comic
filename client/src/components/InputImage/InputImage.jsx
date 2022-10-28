import useReviewImage from "hooks/useReviewImage";
import PropTypes from "prop-types";
import { FiUpload } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";
import classNames from "classnames/bind";

import styles from "./InputImage.scss";

const cx = classNames.bind(styles);

function InputImage({
  children,
  field,
  imageBlob,
  imageSize,
  fileSize,
  closeIcon,
  handleCloseIconClick,
  ...attributes
}) {
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
      {closeIcon && (
        <IoCloseCircle
          className={cx("close-icon")}
          onClick={() => handleCloseIconClick(imageBlob)}
        />
      )}
    </div>
  );
}

InputImage.propTypes = {
  children: PropTypes.node,
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
  closeIcon: PropTypes.bool,
  handleCloseIconClick: PropTypes.func,
};

InputImage.defaultProps = {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  children: <></>,
  fileSize: 2,
  imageSize: {},
  imageBlob: false,
  attributes: {
    accept: ".jpg, .png",
    multiple: false,
    disabled: false,
  },
  // eslint-disable-next-line react/jsx-no-useless-fragment
  closeIcon: false,
  handleCloseIconClick: () => {},
};

export default InputImage;
