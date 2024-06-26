import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./FormWrapper.module.scss";

const cn = classNames.bind(styles);

function FormWrapper({ cx, title, children, fullWidth }) {
  const classes = cn("wrapper", fullWidth && "full-width");

  return (
    <div className={(cx && cx("wrapper"), classes)}>
      <h3 className={(cx && cx("title"), cn("title"))}>{title}</h3>
      {children}
    </div>
  );
}

FormWrapper.propTypes = {
  cx: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
};

FormWrapper.defaultProps = {
  cx: () => {},
  fullWidth: false,
};

export default FormWrapper;
