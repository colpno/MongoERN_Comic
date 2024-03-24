import { memo } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const emitToast = (message, mode = "success") => {
  switch (mode) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast.error(`Không tồn tại mode ${mode}`);
      break;
  }
};

function Toast() {
  const theme = useSelector((state) => state.common.theme);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      draggable={false}
      pauseOnHover
      pauseOnFocusLoss
      progress={undefined}
      rtl={false}
      newestOnTop
      theme={theme}
    />
  );
}

export default memo(Toast);
