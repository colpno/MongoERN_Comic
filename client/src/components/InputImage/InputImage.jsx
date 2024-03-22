import { usePreviewImage } from "hooks";
import PropTypes from "prop-types";
import { useRef } from "react";
import InputImagePlaceholder from "./components/InputImagePlaceholder";
import InputImagePreview from "./components/InputImagePreview.jsx";

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

      <InputImagePlaceholder fileSize={fileSize} imageSize={imageSize} />
      <InputImagePreview onRemove={handleRemoveImage} preview={imagePreview?.preview} />
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
