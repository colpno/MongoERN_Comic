const { useState } = require("react");

const usePopup = (initialState) => {
  const [data, setData] = useState({
    isTriggered: false,
    ...initialState,
  });

  const triggerPopup = (value = false) => setData((prev) => ({ ...prev, isTriggered: value }));

  const setPopup = (state) => {
    setData((prev) => ({
      ...prev,
      ...state,
    }));
  };

  return { popup: data, setPopup, triggerPopup };
};

export default usePopup;
