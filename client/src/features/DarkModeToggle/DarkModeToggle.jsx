import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { changeTheme } from "libs/redux/slices/theme.slice";

function DarkModeToggle({ size }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.theme) === "dark";

  const toggleDarkMode = (isDarkModeOn) => {
    dispatch(changeTheme(isDarkModeOn ? "dark" : "light"));
  };

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={size}
      sunColor="#F28C38"
      moonColor="#F5F3CE"
    />
  );
}

DarkModeToggle.propTypes = {
  size: PropTypes.number,
};

DarkModeToggle.defaultProps = {
  size: 30,
};

export default DarkModeToggle;
