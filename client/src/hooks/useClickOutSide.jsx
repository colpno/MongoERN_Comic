import { useEffect, useRef } from "react";

function useClickOutSide(isShowed, setShowElement) {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      !ref.current.contains(e.target) && setShowElement();
    };

    isShowed && document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  });

  return ref;
}

export default useClickOutSide;
