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
import { Col, Container, Row } from "react-bootstrap";
import { BsQuestionCircle } from "react-icons/bs";

import styles from "../styles/TableToolbar.module.scss";
import TableBottomToolBar from "./TableBottomToolBar";
import TableGuide from "./TableGuide";

const cx = classNames.bind(styles);

function TableToolBar({
  rowsPerPage,
  setPopup,

  enableDelete,
  onDelete,

  enableAdd,
  initialNewRowData,
  setRows,
  setRowModesModel,
}) {
  const apiRef = useGridApiContext();

  const handlePageChange = useCallback(
    ({ target }) => apiRef.current.setPageSize(target.value),
    []
  );

  const openTableGuide = () => {
    setPopup({
      isTriggered: true,
      title: "Các thao tác sẵn có",
      content: <TableGuide />,
      variation: "normal",
    });
  };

  return (
    <GridToolbarContainer>
      <Container>
        <Row className={cx("upper-container")}>
          <Col xs={12} lg={6}>
            <GridToolbar />
          </Col>
          <Col xs={12} lg={6}>
            <Box display="flex" alignItems="center" justifyContent="right">
              <GridPagination rowsPerPage={rowsPerPage} onRowsPerPageChange={handlePageChange} />
              <BsQuestionCircle
                onClick={openTableGuide}
                className={cx("question-icon")}
                title="Các thao tác sử dụng bảng"
              />
            </Box>
          </Col>
        </Row>
        <Box display="flex">
          <TableBottomToolBar
            cx={cx}
            enableMultiDelete={enableDelete}
            onDelete={onDelete}
            tableRef={apiRef}
            setPopup={setPopup}
            enableAddNewRow={enableAdd}
            initialNewRowData={initialNewRowData}
            setRowModesModel={setRowModesModel}
            setRows={setRows}
          />
        </Box>
      </Container>
    </GridToolbarContainer>
  );
}

TableToolBar.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  setPopup: PropTypes.func.isRequired,

  enableDelete: PropTypes.bool,
  onDelete: PropTypes.func,

  enableAdd: PropTypes.bool,
  initialNewRowData: PropTypes.shape({}),
  setRows: PropTypes.func,
  setRowModesModel: PropTypes.func,
};

TableToolBar.defaultProps = {
  enableDelete: false,
  onDelete: () => {},

  enableAdd: false,
  initialNewRowData: {},
  setRows: () => {},
  setRowModesModel: () => {},
};

export default TableToolBar;
