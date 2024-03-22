/* INFO
  MUI license warning file path:
  client/node_modules/@mui/x-license-pro/legacy/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/modern/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/node/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/utils/licenseErrorMessageUtils.js
  Table.scss
 */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGridPro, viVN } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";

import { Popup } from "features";
import { usePopup } from "hooks";
import useTableRowMode from "hooks/useTableRowMode.jsx";
import useTableActions from "./hooks/useTableActions.jsx";
import useTableProps from "./hooks/useTableProps.jsx";
import useTableStyles from "./hooks/useTableStyles.jsx";
import "./styles/Table.module.scss";

const theme = createTheme(
  {},
  viVN // language
);

function Table({
  headers,
  data,

  height,
  autoHeight,
  rowHeight,

  customAction,

  initialState,
  rowsPerPageOptions,

  disableColumnFilter,
  disableDensitySelector,
  disableColumnMenu,

  allowDelete,
  onDelete,

  allowEdit,
  onUpdate,

  allowAdd,
  onAdd,
  initialNewRowData,
}) {
  const [rows, setRows] = useState(data);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[2]);
  const { popup, setPopup, triggerPopup } = usePopup();
  const { rowModesModel, setRowIdError, setRowModesModel } = useTableRowMode();
  const dataGridProps = useTableProps({
    allowAdd,
    allowDelete,
    initialState,
    rowsPerPage,
    newRowInitialData: initialNewRowData,
    setRows,
    setPopup,
    setRowMode: setRowModesModel,
    onDelete,
  });
  const { preventDefaultRowEdit, processRowUpdate } = useTableActions({
    allowDelete,
    allowEdit,
    customAction,
    headers,
    onAdd,
    onDelete,
    onUpdate,
    setRows,
    setPopup,
    setRowIdError,
    setRowMode: setRowModesModel,
  });

  useTableStyles(dataGridProps, { height, autoHeight });

  useEffect(() => {
    setRows(data);
  }, [data, setRows]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <DataGridPro
          {...dataGridProps}
          // Data
          columns={headers}
          rows={rows}
          // Height
          autoHeight={autoHeight}
          disableColumnFilter={disableColumnFilter}
          disableColumnMenu={disableColumnMenu}
          disableDensitySelector={disableDensitySelector}
          // Row
          getRowHeight={() => rowHeight}
          getRowId={(row) => row._id}
          // Edit row
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={preventDefaultRowEdit}
          onRowEditStop={preventDefaultRowEdit}
          processRowUpdate={processRowUpdate}
          // Page
          pagination
          rowsPerPageOptions={rowsPerPageOptions}
          pageSize={rowsPerPage}
          onPageSizeChange={(size) => setRowsPerPage(size)}
          // Others
          checkboxSelection={allowDelete}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </ThemeProvider>
      <Popup data={popup} trigger={triggerPopup} />
    </>
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
      maxWidth: PropTypes.number,
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
              label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
            }).isRequired,
          ]).isRequired
        ),
      ]),
      // must have if the type is "actions"
      getActions: PropTypes.func,
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
      // GRID_CHECKBOX_SELECTION_COL_DEF.field for checkbox
      left: PropTypes.arrayOf(PropTypes.string.isRequired),
      right: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
  }),
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number.isRequired),

  height: PropTypes.number,
  autoHeight: PropTypes.bool,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  disableColumnFilter: PropTypes.bool,
  disableDensitySelector: PropTypes.bool,
  disableColumnMenu: PropTypes.bool,

  onDelete: PropTypes.func,
  allowDelete: PropTypes.bool,

  allowEdit: PropTypes.bool,
  onUpdate: PropTypes.func,

  allowAdd: PropTypes.bool,
  onAdd: PropTypes.func,
  initialNewRowData: PropTypes.shape({}),

  customAction: PropTypes.func,
};

Table.defaultProps = {
  initialState: {},
  rowsPerPageOptions: [5, 10, 25, 50, 100],

  height: null,
  autoHeight: false,
  rowHeight: 100,

  disableColumnFilter: false,
  disableDensitySelector: false,
  disableColumnMenu: false,

  onDelete: () => {},
  allowDelete: false,

  allowEdit: false,
  onUpdate: () => {},

  allowAdd: false,
  onAdd: () => {},
  initialNewRowData: {},

  customAction: null,
};

export default memo(Table);
