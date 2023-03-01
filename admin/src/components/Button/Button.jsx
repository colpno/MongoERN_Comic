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
    title,
    sx,

    primary,
    secondary,
    outline,
    success,
    grey,

    wrapper,
    text,
    small,
    large,
    fullWidth,
    round,

    ...others
  } = props;
  const classes = cx(
    wrapper || "btn",
    fullWidth && "full-width",
    {
      disabled,

      primary,
      secondary,
      outline,
      success,
      grey,

      wrapper,
      text,
      round,
      small,
      large,
    },
    className
  );
  const attributes = { onClick, type, title, sx, ...others };
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
  title: PropTypes.string,
  sx: PropTypes.string,

  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  success: PropTypes.bool,
  grey: PropTypes.bool,

  wrapper: PropTypes.bool,
  text: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  fullWidth: PropTypes.bool,
  round: PropTypes.bool,
};

Button.defaultProps = {
  to: "",
  href: "",
  className: "",
  onClick: () => {},
  disabled: false,
  target: "",
  type: "",
  title: "",
  sx: "",

  primary: false,
  secondary: false,
  outline: false,
  success: false,
  grey: false,

  wrapper: false,
  text: false,
  small: false,
  large: false,
  fullWidth: false,
  round: false,
};

export default Button;
