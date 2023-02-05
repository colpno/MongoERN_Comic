/* 
  MUI license warn file path: 
  client/node_modules/@mui/x-license-pro/legacy/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/modern/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/node/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/utils/licenseErrorMessageUtils.js
  Table.scss
 */
import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  DataGridPro,
  GridFooterContainer,
  gridPageCountSelector,
  GridPagination,
  GridToolbar,
  GridToolbarContainer,
  useGridApiContext,
  useGridSelector,
  viVN,
} from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

import "./Table.scss";

function CustomFooter() {
  const apiRef = useGridApiContext();
  const total = useGridSelector(apiRef, gridPageCountSelector);

  const handlePageChange = useCallback((event, value) => apiRef.current.setPage(value - 1), []); // page start from 0

  return (
    <GridFooterContainer sx={{ justifyContent: "center" }}>
      <Pagination count={total} onChange={handlePageChange} shape="rounded" siblingCount={3} />
    </GridFooterContainer>
  );
}

function CustomToolBar({ rowsPerPage }) {
  return (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "space-between" }}>
      <GridToolbar />
      <GridPagination rowsPerPage={rowsPerPage} />
    </GridToolbarContainer>
  );
}

function Table({
  headers,
  data,

  height,
  autoHeight,

  initialState,
  rowHeight,
  rowsPerPageOptions,
  hasToolbar,
  disableColumnFilter,
  disableDensitySelector,
  disableColumnMenu,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const theme = createTheme(
    {},
    viVN // x-data-grid translations
  );

  const dataGridProps = {
    components: {
      Footer: CustomFooter,
    },
    initialState,
    componentsProps: {
      toolbar: { rowsPerPage },
    },
    autoHeight: false,
    sx: {},
  };

  if (hasToolbar) dataGridProps.components.Toolbar = CustomToolBar;
  if (height) dataGridProps.sx.height = height;
  if (autoHeight) dataGridProps.autoHeight = true;

  return (
    <ThemeProvider theme={theme}>
      <DataGridPro
        {...dataGridProps}
        columns={headers}
        rows={data}
        sx={{ height }}
        disableColumnFilter={disableColumnFilter}
        disableDensitySelector={disableDensitySelector}
        disableColumnMenu={disableColumnMenu}
        pageSize={rowsPerPage}
        onPageSizeChange={(size) => setRowsPerPage(size)}
        rowsPerPageOptions={rowsPerPageOptions}
        getRowId={(row) => row._id}
        getRowHeight={() => rowHeight}
      />
    </ThemeProvider>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired, // field must be existed in both headers and data

      headerName: PropTypes.string, // Label for displaying
      description: PropTypes.string,

      disableColumnMenu: PropTypes.bool,
      disableExport: PropTypes.bool, // Exclude column from export
      disableReorder: PropTypes.bool, // Prevent column to be dragged and dropped
      hideSortIcons: PropTypes.bool,

      resizable: PropTypes.bool,
      searchable: PropTypes.bool,
      sortable: PropTypes.bool,
      filterable: PropTypes.bool,
      hidable: PropTypes.bool,
      editable: PropTypes.bool,

      flex: PropTypes.number,
      width: PropTypes.number,
      minWidth: PropTypes.number,
      colSpan: PropTypes.number,
      align: PropTypes.oneOf(["left", "right", "center"]),
      headerAlign: PropTypes.oneOf(["left", "right", "center"]),

      renderHeader: PropTypes.func, // custom header by using callback
      renderCell: PropTypes.func, // custom cell by using callback
      valueGetter: PropTypes.func,

      type: PropTypes.oneOf([
        "string",
        "number",
        "date",
        "dateTime",
        "boolean",
        "singleSelect",
        "actions",
      ]),
      // must have if the type is "singSelect"
      valueOptions: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.shape({
              value: PropTypes.string.isRequired,
              label: PropTypes.string.isRequired,
            }).isRequired,
          ]).isRequired
        ),
      ]),
      getActions: PropTypes.func, // must have if the type is "actions"
    }).isRequired
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,

  initialState: PropTypes.shape({
    sorting: PropTypes.shape({
      sortModel: PropTypes.arrayOf(
        PropTypes.shape({
          field: PropTypes.string.isRequired,
          sort: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }),
    pinnedColumns: PropTypes.shape({
      left: PropTypes.arrayOf(PropTypes.string.isRequired),
      right: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
  }),
  height: PropTypes.number,
  autoHeight: PropTypes.bool,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number.isRequired),
  hasToolbar: PropTypes.bool,
  disableColumnFilter: PropTypes.bool,
  disableDensitySelector: PropTypes.bool,
  disableColumnMenu: PropTypes.bool,
};

Table.defaultProps = {
  initialState: {},
  height: null,
  autoHeight: false,
  rowHeight: "auto",
  rowsPerPageOptions: [25, 50, 100],
  hasToolbar: true,
  disableColumnFilter: false,
  disableDensitySelector: false,
  disableColumnMenu: false,
};

CustomToolBar.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
};

export default Table;
