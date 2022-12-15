import { useState } from "react";

function usePagination(limit) {
  const [pagination, setPagination] = useState({ page: 1, limit, total: 0 });

  const setPaginationTotal = (tl) => {
    setPagination((prev) => ({ ...prev, total: tl }));
  };

  return { pagination, setPagination, setPaginationTotal };
}

export default usePagination;
