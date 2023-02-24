/* INFO
  MUI license warn file path: 
  client/node_modules/@mui/x-license-pro/legacy/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/modern/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/node/utils/licenseErrorMessageUtils.js
  client/node_modules/@mui/x-license-pro/utils/licenseErrorMessageUtils.js
  Table.scss
 */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGridPro, viVN } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { memo, useState } from "react";

import { Popup } from "features";
import { usePopup } from "hooks";
import { getObjectKeys } from "utils";
import { CustomFooter, CustomToolBar, TablePopup } from "./components";
import "./styles/Table.module.scss";

const theme = createTheme(
  {},
  viVN // x-data-grid translations
);

function Table({
  headers,
  data,

  onMultiDelete,
  height,
  autoHeight,
  rowHeight,
  initialState,
  rowsPerPageOptions,
  hasToolbar,
  disableColumnFilter,
  disableDensitySelector,
  disableColumnMenu,
  onRowEditCommit,
  checkboxSelection,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { popup, triggerPopup } = usePopup({
    title: "Các thao tác sẵn có",
    content: <TablePopup />,
  });

  const dataGridProps = {
    components: {
      Footer: CustomFooter,
    },
    initialState,
    componentsProps: {
      toolbar: {
        rowsPerPage,
        checkboxSelection,
        triggerPopup,
        onMultiDelete,
      },
    },
    autoHeight: false,
    sx: {},
  };

  if (hasToolbar) dataGridProps.components.Toolbar = CustomToolBar;
  if (height) dataGridProps.sx.height = height;
  if (autoHeight) dataGridProps.autoHeight = true;

  const handleRowEditCommit = (a, b, { api }) => {
    const row = api.getEditRowsModel();
    const rowIds = getObjectKeys(row);

    const finalData = rowIds.reduce((finalResult, id) => {
      const keys = getObjectKeys(row[id]);
      const editedData = keys.reduce(
        (result, field) => ({
          ...result,
          [field]: row[id][field].value,
        }),
        {}
      );

      return [
        ...finalResult,
        {
          _id: id,
          ...editedData,
        },
      ];
    }, []);

    onRowEditCommit(finalData);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <DataGridPro
          {...dataGridProps}
          // Data
          columns={headers}
          rows={data}
          // Height
          autoHeight
          checkboxSelection={checkboxSelection}
          disableColumnFilter={disableColumnFilter}
          disableColumnMenu={disableColumnMenu}
          disableDensitySelector={disableDensitySelector}
          // Row
          getRowHeight={() => rowHeight}
          getRowId={(row) => row._id}
          editMode="row"
          onRowEditCommit={handleRowEditCommit}
          // Page
          pagination
          rowsPerPageOptions={rowsPerPageOptions}
          pageSize={rowsPerPage}
          onPageSizeChange={(size) => setRowsPerPage(size)}
        />
      </ThemeProvider>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} width={400} />}
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
  onMultiDelete: PropTypes.func,
  height: PropTypes.number,
  autoHeight: PropTypes.bool,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number.isRequired),
  hasToolbar: PropTypes.bool,
  disableColumnFilter: PropTypes.bool,
  disableDensitySelector: PropTypes.bool,
  disableColumnMenu: PropTypes.bool,
  onRowEditCommit: PropTypes.func,
  checkboxSelection: PropTypes.bool,
};

Table.defaultProps = {
  initialState: {},
  onMultiDelete: () => {},
  height: null,
  autoHeight: false,
  rowHeight: "auto",
  rowsPerPageOptions: [25, 50, 100],
  hasToolbar: true,
  disableColumnFilter: false,
  disableDensitySelector: false,
  disableColumnMenu: false,
  onRowEditCommit: () => {},
  checkboxSelection: false,
};

export default memo(Table);
