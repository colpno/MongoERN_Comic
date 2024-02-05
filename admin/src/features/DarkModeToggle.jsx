import IconButton from "@mui/material/IconButton";
import { toggleChangeTheme } from "libs/redux/slices/common.slice.js";
import { MdBrightness4, MdBrightness7 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function DarkModeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.common.theme);

  const toggleDarkMode = () => {
    dispatch(toggleChangeTheme());
  };

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
      {theme === "dark" ? <MdBrightness4 /> : <MdBrightness7 />}
    </IconButton>
  );
}

export default DarkModeToggle;
