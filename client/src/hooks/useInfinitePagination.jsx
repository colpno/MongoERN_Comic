import { useEffect, useRef, useState } from "react";

function useInfinitePagination(limit) {
  const [pagination, setPagination] = useState({ page: 1, limit, total: 0 });
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      const reachEnd = limit * pagination.page < pagination.total;

      if (first.isIntersecting && reachEnd) {
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
      }
    })
  );

  const setPaginationTotal = (total) => {
    setPagination((prev) => ({ ...prev, total }));
  };

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return { pagination, setPaginationTotal, setLastElement };
}

export default useInfinitePagination;
