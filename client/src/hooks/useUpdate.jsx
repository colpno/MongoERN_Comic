import { useEffect, useState } from "react";

function useUpdate(updateFunc) {
  const [updateInfo, setUpdateInfo] = useState({
    selected: {},
    updated: {},
  });
  const [showForm, setShowForm] = useState(false);
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "Thông báo",
    content: "Bạn chắc chắn muốn chỉnh sửa",
  });

  const handleSubmit = (values) => {
    setUpdateInfo((prev) => {
      return {
        ...prev,
        updated: { ...values, guid: updateInfo.selected.guid },
      };
    });
    setPopup((prev) => {
      return { ...prev, trigger: true };
    });
  };

  useEffect(() => {
    if (popup.isConfirm) {
      updateFunc(updateInfo.updated);
      setPopup({ ...popup, isConfirm: false });
    }
  }, [popup.isConfirm]);

  return {
    updateInfo,
    setUpdateInfo,
    showForm,
    setShowForm,
    handleSubmit,
    popup,
    setPopup,
  };
}

export default useUpdate;
