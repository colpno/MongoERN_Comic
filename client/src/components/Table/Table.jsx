import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  DataGrid,
  GridFooterContainer,
  gridPageCountSelector,
  GridPagination,
  GridToolbar,
  useGridApiContext,
  useGridSelector,
  viVN,
} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { useState } from "react";

import "./styles/Table.scss";

function Footer({ rowsPerPage }) {
  const apiRef = useGridApiContext();
  const total = useGridSelector(apiRef, gridPageCountSelector);

  const handlePageChange = (event, value) => apiRef.current.setPage(value - 1);

  return (
    <GridFooterContainer>
      <GridPagination rowsPerPage={rowsPerPage} />
      <Pagination count={total} onChange={handlePageChange} shape="rounded" />
    </GridFooterContainer>
  );
}

function Table({
  headers,
  data,
  height,

  rowsPerPageOptions,
  hasToolbar,
  pinnedColumns,
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
      Footer,
    },
    initialState: {},
    componentsProps: {
      footer: { rowsPerPage },
    },
  };

  if (hasToolbar) dataGridProps.components.Toolbar = GridToolbar;
  if (pinnedColumns) dataGridProps.initialState.pinnedColumns = pinnedColumns;

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
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

      resizable: PropTypes.bool,
      searchable: PropTypes.bool,
      sortable: PropTypes.bool,
      filterable: PropTypes.bool,
      hidable: PropTypes.bool,

      flex: PropTypes.number,
      width: PropTypes.number,
      minWidth: PropTypes.number,
      colSpan: PropTypes.number,

      renderHeader: PropTypes.func, // custom header by using callback
      renderCell: PropTypes.func, // custom cell by using callback

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
  height: PropTypes.number.isRequired,

  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number.isRequired),
  hasToolbar: PropTypes.bool,
  pinnedColumns: PropTypes.shape({
    /* pinned checkbox use GRID_CHECKBOX_SELECTION_COL_DEF.field */
    left: PropTypes.arrayOf(PropTypes.string.isRequired),
    right: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  disableColumnFilter: PropTypes.bool,
  disableDensitySelector: PropTypes.bool,
  disableColumnMenu: PropTypes.bool,
};

Table.defaultProps = {
  rowsPerPageOptions: [2, 25, 50, 100],
  hasToolbar: true,
  pinnedColumns: {},
  disableColumnFilter: false,
  disableDensitySelector: false,
  disableColumnMenu: false,
};

Footer.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
};

export default Table;
