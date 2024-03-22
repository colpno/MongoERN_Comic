import { TableFooter, TableToolBar } from "../components";

const defaultOptions = {
  initialState: {},
  rowsPerPage: 10,
  allowAdd: false,
  allowDelete: false,
  setPopup: () => {},
  newRowInitialData: {},
  setRows: () => {},
  setRowMode: () => {},
  onDelete: () => {},
};

function useTableProps(options = defaultOptions) {
  const {
    allowAdd,
    allowDelete,
    initialState,
    rowsPerPage,
    newRowInitialData,
    setRows,
    setPopup,
    setRowMode,
    onDelete,
  } = options;

  const dataGridProps = {
    components: {
      Footer: TableFooter,
      Toolbar: TableToolBar,
    },
    initialState,
    componentsProps: {
      toolbar: {
        rowsPerPage,
        setPopup,
      },
    },
    autoHeight: false,
    sx: {},
  };

  if (allowAdd || allowDelete) {
    if (allowAdd) {
      dataGridProps.componentsProps.toolbar = {
        ...dataGridProps.componentsProps.toolbar,
        enableAdd: allowAdd,
        initialNewRowData: newRowInitialData,
        setRows,
        setRowModesModel: setRowMode,
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

  return dataGridProps;
}

export default useTableProps;
