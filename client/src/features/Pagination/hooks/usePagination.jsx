import { useMemo } from "react";
import { createArrayFromTo } from "utils/arrayMethods.js";

const defaultPaginationStates = { page: 1, limit: 0, total: 0 };
const LIMIT_NEARBY_PAGES = 2;

function usePagination(paginationStates = defaultPaginationStates) {
  const { limit, page, total } = paginationStates;
  const totalPage = Math.ceil(total / limit);

  let firstPage = page > LIMIT_NEARBY_PAGES ? page - LIMIT_NEARBY_PAGES : 1;
  let lastPage = page < totalPage - LIMIT_NEARBY_PAGES ? page + LIMIT_NEARBY_PAGES : totalPage;

  if (page <= LIMIT_NEARBY_PAGES + 2) {
    lastPage += LIMIT_NEARBY_PAGES + 3 - page;
  }

  if (lastPage > totalPage) {
    lastPage = totalPage;
  }

  if (page >= totalPage - LIMIT_NEARBY_PAGES - 1) {
    firstPage += totalPage - LIMIT_NEARBY_PAGES - 2 - page;
  }

  if (firstPage < 1) {
    firstPage = 1;
  }
  const pages = useMemo(() => createArrayFromTo(firstPage, lastPage), [firstPage, lastPage]);

  return {
    pages,
    firstPage,
    lastPage,
  };
}

export default usePagination;
