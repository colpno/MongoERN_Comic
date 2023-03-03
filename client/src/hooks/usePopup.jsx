const { useState } = require("react");

const usePopup = (initialState) => {
  const [data, setData] = useState({
    isShown: false,
    ...initialState,
  });

  const triggerPopup = (trigger) => setData((prev) => ({ ...prev, isShown: trigger }));

  const setPopup = (state) => {
    setData((prev) => ({
      ...prev,
      ...state,
    }));
  };

  return { popup: data, setPopup, triggerPopup };
};

export default usePopup;
