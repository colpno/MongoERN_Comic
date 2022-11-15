import { useEffect, useState } from "react";

function useDelete(deleteFunc) {
  const [deletedItem, setDeletedItem] = useState({});
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "Thông báo",
    content: "",
    yesno: true,
  });

  useEffect(() => {
    if (popup.isConfirm) {
      deleteFunc();
      setPopup({ ...popup, isConfirm: false, yesno: false });
    }
  }, [popup.isConfirm]);

  return {
    deletedItem,
    setDeletedItem,
    popup,
    setPopup,
  };
}

export default useDelete;
