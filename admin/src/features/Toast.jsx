import { memo } from "react";
import { ToastContainer, toast as reactToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const options = {
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
  theme: "light",
};

export const emitToast = (message, mode = "success") => {
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
  return <ToastContainer {...options} />;
}

export default memo(Toast);
