import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast as reactToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function Toast() {
  const toast = useSelector((state) => state.common.toast);

  const options = {
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

  useEffect(() => {
    const { message, mode } = toast;

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
  }, [toast]);

  return <ToastContainer {...options} />;
}

export default memo(Toast);
