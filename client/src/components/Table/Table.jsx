import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";

import "./Table.scss";

function Table({
  height,
  headers,
  data,

  rowsPerPageOptions,
  toolbar,
  pinnedColumns,
  disableColumnFilter,
  disableDensitySelector,
  disableColumnMenu,
}) {
  const dataGridProps = {
    components: {},
    initialState: {},
  };

  if (toolbar) dataGridProps.components.Toolbar = GridToolbar;
  if (pinnedColumns) dataGridProps.initialState.pinnedColumns = pinnedColumns;

  return (
    <DataGrid
      columns={headers}
      rows={data}
      sx={{ height }}
      components={dataGridProps.components}
      initialState={dataGridProps.initialState}
      disableColumnFilter={disableColumnFilter}
      disableDensitySelector={disableDensitySelector}
      disableColumnMenu={disableColumnMenu}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired, // field must be existed in both headers and data

      headerName: PropTypes.string, // Label for displaying
      description: PropTypes.string,

      disableColumnMenu: PropTypes.bool,
      disableExport: PropTypes.bool, // Exclude column from excel
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

      renderHeader: PropTypes.func, // custom header with a callback
      renderCell: PropTypes.func, // custom cell with a callback

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
  toolbar: PropTypes.bool,
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
  rowsPerPageOptions: [25, 50, 100],
  toolbar: true,
  pinnedColumns: {},
  disableColumnFilter: false,
  disableDensitySelector: false,
  disableColumnMenu: false,
};

export default Table;
