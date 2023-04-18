import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { Scrollbar } from "components";
import styles from "./Popper.module.scss";

const cx = classNames.bind(styles);

function Popper({ placeholder, content, contentVisible, width, height, maxHeight, position }) {
  const customStyles = {
    width,
    maxHeight,
  };

  if (height !== "0") customStyles.height = height;

  return (
    <div className={cx("popper-wrapper")}>
      <div className={cx("placeholder")}>{placeholder}</div>
      {contentVisible && (
        <div style={customStyles} className={cx("popper", position)}>
          <Scrollbar yAxis>{content}</Scrollbar>
        </div>
      )}
    </div>
  );
}

Popper.propTypes = {
  placeholder: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  contentVisible: PropTypes.bool.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  maxHeight: PropTypes.string,
  position: PropTypes.oneOf(["left", "right", "center"]),
};

Popper.defaultProps = {
  width: "400px",
  height: "0",
  maxHeight: "80vh",
  position: "right",
};

export default Popper;
