import PropTypes from "prop-types";
import { FiUpload } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";

import classNames from "classnames/bind";
import { usePreviewImage } from "hooks";
import { useRef } from "react";
import styles from "./InputImage.scss";

const cx = classNames.bind(styles);

function InputImage({
  children,
  field,
  imageSize,
  fileSize,
  removable,
  handleRemove,
  setFieldValue,
  form,
  width,
  height,
  ...attributes
}) {
  console.log("form:", form);
  const { accept, multiple, disabled } = attributes;
  const { onBlur, name, value } = field;
  const inputRef = useRef();
  const { imagePreview, setImagePreview, handleImageChange } = usePreviewImage(
    {
      preview: value || null,
    },
    fileSize,
    setFieldValue,
    name
  );

  const handleRemoveImage = () => {
    setImagePreview("");
    setFieldValue(field.name, "");
  };

  return (
    <div className="input-file-wrapper" style={{ width, height }}>
      <input
        name={name}
        onBlur={onBlur}
        onChange={handleImageChange}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="input-file-wrapper__input"
        ref={inputRef}
      />

      <span className="input-file-wrapper__custom">
        <FiUpload className="input-file-wrapper__custom__icon" />
        <p className="input-file-wrapper__custom_label">Kéo thả ảnh vào đây hoặc</p>
        <p className="input-file-wrapper__custom__label--primary">Chọn ảnh</p>
        <p className="input-file-wrapper__custom__requirement">
          JPG/PNG {imageSize.width}
          {imageSize.width && imageSize.height ? "x" : "px"}
          {imageSize.height} ({fileSize}MB)
        </p>
      </span>
      {imagePreview?.preview && (
        <img
          className="input-file-wrapper__custom-image-holder"
          src={imagePreview.preview}
          alt=""
        />
      )}
      {removable && imagePreview?.preview && (
        <IoCloseCircle className={cx("close-icon")} onClick={handleRemoveImage} />
      )}
    </div>
  );
}

InputImage.propTypes = {
  children: PropTypes.node,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  fileSize: PropTypes.number,
  imageSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  attributes: PropTypes.shape({
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
  }),
  removable: PropTypes.bool,
  setFieldValue: PropTypes.func,
  handleRemove: PropTypes.func,
  form: PropTypes.shape({}).isRequired,
};

InputImage.defaultProps = {
  children: <div />,
  fileSize: 2,
  imageSize: {},
  attributes: {
    accept: ".jpg, .png",
    multiple: false,
    disabled: false,
  },
  width: 250,
  height: 250,
  removable: false,
  setFieldValue: () => {},
  handleRemove: () => {},
};

export default InputImage;
