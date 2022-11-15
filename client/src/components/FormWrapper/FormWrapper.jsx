import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./FormWrapper.module.scss";

const cn = classNames.bind(styles);

function FormWrapper({ cx, title, children }) {
  return (
    <div className={(cx && cx("wrapper"), cn("wrapper"))}>
      <h3 className={(cx && cx("title"), cn("title"))}>{title}</h3>
      {children}
    </div>
  );
}

FormWrapper.propTypes = {
  cx: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

FormWrapper.defaultProps = {
  cx: () => {},
};

export default FormWrapper;
