import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./FloatingContainer.module.scss";

const cx = classNames.bind(styles);

function FloatingContainer({ children, cn }) {
  return (
    <div className={`${cx("floating-container")}${cn && ` ${cn}`}`}>
      {children}
    </div>
  );
}

FloatingContainer.propTypes = {
  children: PropTypes.node.isRequired,
  cn: PropTypes.string,
};

FloatingContainer.defaultProps = {
  cn: "",
};

export default FloatingContainer;
