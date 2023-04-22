import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
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
  xsmall,
  small,
  large,
  fullWidth,
  round,
}) {
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
      xsmall,
      large,
    },
    className
  );

  const attributes = {
    onClick,
    target: target || null,
    type: type || "button",
    title: title || null,
    sx: sx || null,
  };

  let Component = "button";

  switch (true) {
    case Boolean(to):
      Component = Link;
      attributes.to = to;
      break;
    case Boolean(href):
      Component = "a";
      attributes.href = href;
      break;
    default:
      break;
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
  xsmall: PropTypes.bool,
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
  xsmall: false,
  large: false,
  fullWidth: false,
  round: false,
};

export default memo(Button);
