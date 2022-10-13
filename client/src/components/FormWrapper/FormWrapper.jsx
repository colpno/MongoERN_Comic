import PropTypes from "prop-types";

function FormWrapper({ cx, title, children }) {
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("title")}>{title}</h3>
      {children}
    </div>
  );
}

FormWrapper.propTypes = {
  cx: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormWrapper;
