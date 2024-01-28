/* eslint-disable no-unused-vars */
import { GridActionsCellItem, GridRowModes, useGridApiContext } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { MdCancel, MdDelete, MdEdit, MdSave } from "react-icons/md";

function TableActions({
  id,
  onDelete,
  enableEdit,
  enableDelete,
  setRows,
  setRowModesModel,
  setPopup,
  onAdd,
  onUpdate,
}) {
  const apiRef = useGridApiContext();
  const rowMode = apiRef.current.getRowMode(id);
  const rows = apiRef.current.getSortedRows();
  const isInEditMode = rowMode === "edit";
  const Components = [];

  const handleEditClick = (_id) => () => {
    setRowModesModel((prev) => ({ ...prev, [_id]: { mode: GridRowModes.Edit } }));
  };

  const handleCancelClick =
    (_id, currentRows = []) =>
    () => {
      setRowModesModel((prev) => ({
        ...prev,
        [_id]: { mode: GridRowModes.View, ignoreModifications: true },
      }));

      const editedRow = currentRows.find((row) => row._id === _id);
      if (editedRow?.isNew) {
        setRows((prev) => prev.filter((row) => row._id !== _id));
      }
    };

  const handleSaveClick = (_id) => () => {
    const popupContent = (
      <div>
        <p>Bạn có chắc chắn muốn lưu không?</p>
        <small style={{ fontWeight: "500" }}>
          Tip: Hãy kiểm tra lại thông tin trước khi lưu để chắc chắn bạn đã nhập đúng.
        </small>
      </div>
    );

    setPopup({
      isTriggered: true,
      title: "Xác nhận lưu",
      content: popupContent,
      type: "confirm",
      onConfirm: () => {
        setRowModesModel((prev) => ({ ...prev, [_id]: { mode: GridRowModes.View } }));
      },
    });
  };

  const handleDelete = (_id) => () => {
    setPopup({
      isTriggered: true,
      title: "Xác nhận xóa",
      content: <p>Bạn có chắc chắn muốn xóa không?</p>,
      type: "confirm",
      onConfirm: () => {
        onDelete(_id);
      },
    });
  };

  if (enableEdit) {
    if (isInEditMode) {
      return [
        <GridActionsCellItem
          size="medium"
          icon={<MdSave />}
          label="Save"
          title="Lưu"
          onClick={handleSaveClick(id)}
          key={`${id}1`}
        />,
        <GridActionsCellItem
          size="medium"
          icon={<MdCancel />}
          label="Cancel"
          title="Hủy"
          onClick={handleCancelClick(id, rows)}
          key={`${id}2`}
        />,
      ];
    }

    Components.push(
      <GridActionsCellItem
        size="medium"
        icon={<MdEdit />}
        label="Edit"
        title="Cập nhật"
        onClick={handleEditClick(id)}
        key={`${id}3`}
      />
    );
  }

  if (enableDelete) {
    Components.push(
      <GridActionsCellItem
        size="medium"
        icon={<MdDelete />}
        label="Delete"
        title="Xóa"
        onClick={handleDelete(id)}
        key={`${id}4`}
      />
    );
  }

  return Components;
}

TableActions.propTypes = {
  id: PropTypes.string.isRequired,

  onDelete: PropTypes.func,
  enableEdit: PropTypes.bool,
  enableDelete: PropTypes.bool,

  setRows: PropTypes.func.isRequired,
  setRowModesModel: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
};

TableActions.defaultProps = {
  onDelete: () => {},
  enableEdit: false,
  enableDelete: false,
};

export default TableActions;
