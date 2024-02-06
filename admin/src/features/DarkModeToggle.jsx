import PropTypes from "prop-types";
import { MdBrightness4, MdBrightness7 } from "react-icons/md";
import { useSelector } from "react-redux";

function DarkModeToggle({ className }) {
  const theme = useSelector((state) => state.common.theme);

  return theme === "dark" ? (
    <MdBrightness4 className={className} />
  ) : (
    <MdBrightness7 className={className} />
  );
}

DarkModeToggle.propTypes = {
  className: PropTypes.string,
};

DarkModeToggle.defaultProps = {
  className: "",
};

export default DarkModeToggle;
