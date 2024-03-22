import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { IoCloseCircle } from "react-icons/io5";
import styles from "../InputImage.scss";

const cx = classNames.bind(styles);

function InputImagePreview({ preview, onRemove }) {
  return (
    <>
      <img className="input-file-wrapper__custom-image-holder" src={preview} alt="" />
      {onRemove && <IoCloseCircle className={cx("close-icon")} onClick={onRemove} />}
    </>
  );
}

InputImagePreview.propTypes = {
  preview: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

InputImagePreview.defaultProps = {
  onRemove: undefined,
};

export default memo(InputImagePreview);
