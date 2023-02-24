import { Box } from "@mui/material";
import {
  GridPagination,
  GridToolbar,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { Button } from "components";
import styles from "../styles/CustomToolbar.module.scss";

const cx = classNames.bind(styles);

function CustomToolBar({ rowsPerPage, checkboxSelection, triggerPopup, onMultiDelete }) {
  const apiRef = useGridApiContext();

  const handlePageChange = useCallback(
    ({ target }) => apiRef.current.setPageSize(target.value),
    []
  );

  const handleMultiDelete = () => {
    const rows = apiRef.current.getSelectedRows();
    onMultiDelete(rows);
  };

  return (
    <GridToolbarContainer>
      <Box className={cx("upper-container")}>
        <GridToolbar />
        <Box display="flex" alignItems="center">
          <GridPagination rowsPerPage={rowsPerPage} onRowsPerPageChange={handlePageChange} />
          <BsQuestionCircle
            onClick={() => triggerPopup(true)}
            className={cx("question-icon")}
            title="Các thao tác sử dụng bảng"
          />
        </Box>
      </Box>
      {checkboxSelection && (
        <Box>
          <Button small className={cx("delete-button")} onClick={handleMultiDelete}>
            XÓA
            <MdDelete className={cx("trash-can-icon")} />
          </Button>
        </Box>
      )}
    </GridToolbarContainer>
  );
}

CustomToolBar.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  checkboxSelection: PropTypes.bool,
  triggerPopup: PropTypes.func.isRequired,
  onMultiDelete: PropTypes.func,
};

CustomToolBar.defaultProps = {
  checkboxSelection: false,
  onMultiDelete: () => {},
};

export default CustomToolBar;
