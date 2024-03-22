import { useEffect, useState } from "react";

function useScrollToTop(showButtonDesiredHeight) {
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY >= showButtonDesiredHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backToTop = (e) => {
    e.preventDefault();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return {
    showToTop,
    backToTop,
  };
}

export default useScrollToTop;
