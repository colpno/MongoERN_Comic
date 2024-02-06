import PropTypes from "prop-types";
import { BsFillBrightnessHighFill } from "react-icons/bs";
import { MdBrightness3 } from "react-icons/md";
import { useSelector } from "react-redux";

function DarkModeToggle({ className }) {
  const theme = useSelector((state) => state.common.theme);

  return theme === "dark" ? (
    <MdBrightness3 className={className} />
  ) : (
    <BsFillBrightnessHighFill className={className} />
  );
}

DarkModeToggle.propTypes = {
  className: PropTypes.string,
};

DarkModeToggle.defaultProps = {
  className: "",
};

export default DarkModeToggle;
