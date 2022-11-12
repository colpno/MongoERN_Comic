import { useEffect, useState } from "react";

function useAdd(addFunc) {
  const [values, setValues] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "Thông báo",
    content: "Bạn chắc chắn muốn chỉnh sửa",
  });

  const handleSubmit = (formValues) => {
    setValues(formValues);
    setPopup((prev) => {
      return { ...prev, trigger: true };
    });
  };

  useEffect(() => {
    if (popup.isConfirm) {
      addFunc(values);
      setPopup({ ...popup, isConfirm: false });
    }
  }, [popup.isConfirm]);

  return {
    setValues,
    showForm,
    setShowForm,
    handleSubmit,
    popup,
    setPopup,
  };
}

export default useAdd;
