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

    primary,
    secondary,
    outline,
    success,
    grey,

    dark90,
    dark80,
    dark70,
    dark60,
    dark50,
    dark40,
    dark30,
    dark20,
    dark10,

    light90,
    light80,
    light70,
    light60,
    light50,
    light40,
    light30,
    light20,
    light10,

    marginTop1,

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

      dark90,
      dark80,
      dark70,
      dark60,
      dark50,
      dark40,
      dark30,
      dark20,
      dark10,

      light90,
      light80,
      light70,
      light60,
      light50,
      light40,
      light30,
      light20,
      light10,

      marginTop1,

      wrapper,
      text,
      round,
      small,
      large,
    },
    className
  );
  const attributes = { onClick, type, ...others };
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

  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  success: PropTypes.bool,
  grey: PropTypes.bool,

  dark90: PropTypes.bool,
  dark80: PropTypes.bool,
  dark70: PropTypes.bool,
  dark60: PropTypes.bool,
  dark50: PropTypes.bool,
  dark40: PropTypes.bool,
  dark30: PropTypes.bool,
  dark20: PropTypes.bool,
  dark10: PropTypes.bool,

  light90: PropTypes.bool,
  light80: PropTypes.bool,
  light70: PropTypes.bool,
  light60: PropTypes.bool,
  light50: PropTypes.bool,
  light40: PropTypes.bool,
  light30: PropTypes.bool,
  light20: PropTypes.bool,
  light10: PropTypes.bool,

  marginTop1: PropTypes.bool,

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

  primary: false,
  secondary: false,
  outline: false,
  success: false,
  grey: false,

  dark90: false,
  dark80: false,
  dark70: false,
  dark60: false,
  dark50: false,
  dark40: false,
  dark30: false,
  dark20: false,
  dark10: false,

  light90: false,
  light80: false,
  light70: false,
  light60: false,
  light50: false,
  light40: false,
  light30: false,
  light20: false,
  light10: false,

  marginTop1: false,

  wrapper: false,
  text: false,
  small: false,
  large: false,
  fullWidth: false,
  round: false,
};

export default Button;
