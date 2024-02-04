/* INFO
  MUI license warn file path: 
  client/node_modules/@mui/x-license-pro/legacy/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/modern/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/node/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/utils/licenseErrorMessageUtils.js
  Table.scss
 */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGridPro, GridCellEditStopReasons, GridRowModes, viVN } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

import { Popup } from "features";
import { usePopup } from "hooks";
import { TableActions, TableFooter, TableToolBar } from "./components";
import "./styles/Table.module.scss";

function isKeyboardEvent(event) {
  return !!event.key;
}

const theme = createTheme(
  {},
  viVN // x-data-grid translations
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
  hasToolbar,

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
  const [rowModesModel, setRowModesModel] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[2]);
  const { popup, setPopup, triggerPopup } = usePopup();
  const [rowIdError, setRowIdError] = useState("");

  const dataGridProps = {
    components: {
      Footer: TableFooter,
    },
    initialState,
    componentsProps: {
      toolbar: {
        rowsPerPage,
      },
    },
    autoHeight: false,
    sx: {},
  };

  if (hasToolbar) {
    dataGridProps.components.Toolbar = TableToolBar;

    if (allowAdd) {
      dataGridProps.componentsProps.toolbar = {
        ...dataGridProps.componentsProps.toolbar,
        enableAdd: allowAdd,
        initialNewRowData,
        setRows,
        setRowModesModel,
      };
    }

    if (allowDelete) {
      dataGridProps.componentsProps.toolbar = {
        ...dataGridProps.componentsProps.toolbar,
        enableDelete: allowDelete,
        onDelete,
      };
    }
  }
  if (height) dataGridProps.sx.height = height;
  if (autoHeight) dataGridProps.autoHeight = true;

  const preventDefaultRowEdit = useCallback((params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  const processRowUpdate = useCallback((newRow) => {
    newRow.isNew ? onAdd(newRow, setRowIdError) : onUpdate(newRow, setRowIdError);
    return newRow;
  }, []);

  useEffect(() => {
    !!rowIdError &&
      setRowModesModel((prev) => ({
        ...prev,
        [rowIdError]: { mode: GridRowModes.Edit },
      }));
  }, [rowIdError]);

  if (allowEdit || allowDelete) {
    headers.push({
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => {
        const { id } = params;
        const Component = (
          <TableActions
            id={id}
            enableDelete={allowDelete}
            onDelete={onDelete}
            enableEdit={allowEdit}
            setRows={setRows}
            setRowModesModel={setRowModesModel}
            setPopup={setPopup}
            onAdd={onAdd}
            onUpdate={onUpdate}
          />
        );

        return customAction ? [...customAction(params), Component] : [Component];
      },
    });
  }

  useEffect(() => {
    setRows(data);
  }, [data]);

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
          onCellEditStop={(params, event) => {
            if (params.reason !== GridCellEditStopReasons.enterKeyDown) {
              return;
            }
            if (isKeyboardEvent(event) && !event.ctrlKey && !event.metaKey) {
              event.defaultMuiPrevented = true;
            }
          }}
        />
      </ThemeProvider>
      {popup.isTriggered && <Popup data={popup} setShow={triggerPopup} width={400} />}
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
  hasToolbar: PropTypes.bool,

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
  hasToolbar: true,

  height: null,
  autoHeight: false,
  rowHeight: "auto",

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
