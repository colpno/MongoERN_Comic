import { useEffect, useRef, useState } from "react";

function useObserver(executeFunction = () => {}, removeFunction = () => {}) {
  const [lastElementRef, setLastElementRef] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          executeFunction();
        } else {
          removeFunction();
        }
      });
    })
  );

  useEffect(() => {
    const currentElement = lastElementRef;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElementRef]);

  return { setLastElementRef };
}

export default useObserver;
