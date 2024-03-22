import { useCallback } from "react";
import TableActions from "../components/TableActions.jsx";

const defaultOptions = {
  allowEdit: false,
  allowDelete: false,
  customAction: null,
  headers: [],
  onAdd: () => {},
  onUpdate: () => {},
  onDelete: () => {},
  setRowIdError: () => {},
  setRows: () => {},
  setRowMode: () => {},
  setPopup: () => {},
};

function useTableActions(options = defaultOptions) {
  const {
    allowDelete,
    allowEdit,
    customAction,
    headers,
    onAdd,
    onDelete,
    onUpdate,
    setPopup,
    setRows,
    setRowIdError,
    setRowMode,
  } = options;

  const preventDefaultRowEdit = useCallback((params, event) => {
    event.defaultMuiPrevented = true;
  }, []);

  const processRowUpdate = useCallback((newRow) => {
    newRow.isNew ? onAdd(newRow, setRowIdError) : onUpdate(newRow, setRowIdError);
    return newRow;
  }, []);

  if (allowEdit || allowDelete || customAction) {
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
            setRowModesModel={setRowMode}
            setPopup={setPopup}
            onAdd={onAdd}
            onUpdate={onUpdate}
          />
        );

        return customAction ? [...customAction(params), Component] : [Component];
      },
    });
  }

  return {
    preventDefaultRowEdit,
    processRowUpdate,
  };
}

export default useTableActions;
