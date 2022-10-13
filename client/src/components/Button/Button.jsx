import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button(props) {
  const {
    children,
    to,
    href,
    className,
    onClick,
    disabled,
    target,
    type,

    wrapper,
    primary,
    secondary,
    outline,
    text,
    success,
    gray,

    small,
    large,
    rounded,
  } = props;
  const classes = cx(
    wrapper || "btn",
    {
      wrapper,
      primary,
      secondary,
      outline,
      text,
      success,
      gray,
      rounded,
      disabled,

      small,
      large,
    },
    className
  );
  const attributes = { onClick, type };
  attributes.target = target || null;
  attributes.type = type || "button";

  let Component = "button";
  if (to) {
    Component = Link;
    attributes.to = to;
  }
  if (href) {
    Component = "a";
    attributes.href = href;
  }

  return (
    <Component className={classes} {...attributes}>
      {children}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  to: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  target: PropTypes.string,
  type: PropTypes.string,

  wrapper: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  text: PropTypes.bool,
  success: PropTypes.bool,
  gray: PropTypes.bool,

  small: PropTypes.bool,
  large: PropTypes.bool,
  rounded: PropTypes.bool,
};

Button.defaultProps = {
  to: "",
  href: "",
  className: "",
  onClick: () => {},
  disabled: false,
  target: "",
  type: "",

  wrapper: false,
  primary: false,
  secondary: false,
  outline: false,
  text: false,
  success: false,
  gray: false,

  small: false,
  large: false,
  rounded: false,
};

export default Button;
