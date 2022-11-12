import PropTypes from "prop-types";
import { useEffect } from "react";
import { FiUpload } from "react-icons/fi";

import "../assets/InputMultiFile.scss";

function InputMultiFile({
  field,
  imageSize,
  fileSize,
  blobs,
  setBlobs,
  setFieldValue,
  ...attributes
}) {
  const { accept, multiple, disabled } = attributes;
  const { width, height } = imageSize;

  const handleImagePreview = (e) => {
    const { files } = e.target;
    const fileArray = Array.from(files);
    const data = [...field.value];
    const newBlobs = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        data.push(reader.result);
      };

      const blob = URL.createObjectURL(file);
      newBlobs.push(blob);
    }

    setFieldValue(field.name, data);
    setBlobs((prev) => [...prev, ...newBlobs]);
  };

  useEffect(() => {
    return () => {
      Object.keys(blobs)?.forEach((blob) => {
        URL.revokeObjectURL(blob);
      });
    };
  }, [blobs]);

  return (
    <div className="multi-input-file-wrapper">
      <input
        name={field.name}
        onBlur={field.onBlur}
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
    value: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
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
  blobs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setBlobs: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
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
