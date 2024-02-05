import { Pagination } from "@mui/material";
import {
  GridFooterContainer,
  gridPageCountSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid-pro";
import { useCallback } from "react";

function TableFooter() {
  const apiRef = useGridApiContext();
  const total = useGridSelector(apiRef, gridPageCountSelector);

  const handlePageChange = useCallback((event, value) => apiRef.current.setPage(value - 1), []); // page start from 0

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (total === 0) return <></>;

  return (
    <GridFooterContainer sx={{ justifyContent: "center" }}>
      <Pagination count={total} onChange={handlePageChange} shape="rounded" siblingCount={3} />
    </GridFooterContainer>
  );
}

export default TableFooter;
