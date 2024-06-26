import { memo } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast as reactToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const getOptions = (theme = "light") => ({
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: false,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  progress: undefined,
  rtl: false,
  newestOnTop: true,
  theme,
});

export const emitToast = (message, mode = "success") => {
  const options = getOptions(mode);
  switch (mode) {
    case "success":
      reactToast.success(message, options);
      break;
    case "error":
      reactToast.error(message, options);
      break;
    case "warning":
      reactToast.warn(message, options);
      break;
    case "info":
      reactToast.info(message, options);
      break;
    default:
      reactToast.error(`Không tồn tại mode ${mode}`, options);
      break;
  }
};

function Toast() {
  const theme = useSelector((state) => state.common.theme);
  const options = getOptions(theme);
  const customStyles = {
    backgroundColor: "var(--island-background-color)",
    color: "var(--primary-font-color)",
  };

  return <ToastContainer {...options} theme={theme} toastStyle={customStyles} />;
}

export default memo(Toast);
