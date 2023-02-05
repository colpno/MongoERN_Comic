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
import { useCallback, useState } from "react";

import "./Table.scss";

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
  autoHeight,

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
      Footer,
    },
    initialState: {},
    componentsProps: {
      footer: { rowsPerPage },
    },
    autoHeight: false,
    sx: {},
  };

  if (hasToolbar) dataGridProps.components.Toolbar = GridToolbar;
  if (height) dataGridProps.sx.height = height;
  if (autoHeight) dataGridProps.autoHeight = true;

  const handleRowSpacing = useCallback(
    (params) => ({
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    }),
    []
  );

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
        getRowId={(row) => row._id}
        getRowSpacing={handleRowSpacing}
        getRowHeight={() => "auto"}
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

  height: PropTypes.number,
  autoHeight: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number.isRequired),
  hasToolbar: PropTypes.bool,
  disableColumnFilter: PropTypes.bool,
  disableDensitySelector: PropTypes.bool,
  disableColumnMenu: PropTypes.bool,
};

Table.defaultProps = {
  height: null,
  autoHeight: false,
  rowsPerPageOptions: [25, 50, 100],
  hasToolbar: true,
  disableColumnFilter: false,
  disableDensitySelector: false,
  disableColumnMenu: false,
};

Footer.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
};

export default Table;
