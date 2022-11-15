import { useState } from "react";
import { toast as reactToast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function useToast() {
  const [options, setOptions] = useState({
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    progress: undefined,
    rtl: false,
    newestOnTop: true,
    theme: "light",
  });

  const setToastOptions = (
    position = "top-right" ||
      "top-center" ||
      "top-left" ||
      "bottom-right" ||
      "bottom-center" ||
      "bottom-left",
    closeTime = 5000,
    theme = "light",
    draggable = false,
    rtl = false,
    pauseOnHover = false,
    pauseOnFocusLoss = false,
    newestOnTop = true,
    closeOnClick = true,
    hideProgressBar = false
  ) => {
    setOptions((prev) => ({
      ...prev,
      position,
      autoClose: closeTime,
      pauseOnHover,
      pauseOnFocusLoss,
      hideProgressBar,
      closeOnClick,
      draggable,
      rtl,
      newestOnTop,
      theme,
    }));
  };

  const toastEmitter = (
    message = "",
    type = "success" || "error" || "info" || "warning"
  ) => {
    switch (type) {
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
        reactToast.info(message, options);
        break;
    }
  };
  return {
    options,
    setOptions,
    toastEmitter,
    setToastOptions,
    Toast: ToastContainer,
  };
}

export default useToast;
