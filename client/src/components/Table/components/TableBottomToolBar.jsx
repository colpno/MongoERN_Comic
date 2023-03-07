import { GridRowModes } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { MdAdd, MdDelete } from "react-icons/md";

import { Button } from "components";
import { getObjectKeys } from "utils";

function makeid(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function TableBottomToolBar({
  cx,

  enableMultiDelete,
  onDelete,
  tableRef,
  setPopup,

  enableAddNewRow,
  initialNewRowData,
  setRows,
  setRowModesModel,
}) {
  const handleDelete = () => {
    const rows = tableRef.current.getSelectedRows();
    if (rows.size > 0) {
      setPopup({
        isShown: true,
        title: "Xác nhận xóa",
        content: <p>Bạn có chắc chắn muốn xóa không?</p>,
        type: "confirm",
        onConfirm: () => {
          onDelete(rows);
        },
      });
    } else
      setPopup({
        isShown: true,
        title: "Thông báo",
        type: "normal",
        content:
          "Chưa có dữ liệu nào được chọn. Vui lòng chọn ít nhất 1 khi sử dụng chức năng này.",
      });
  };

  const handleAdd = () => {
    const id = makeid(6);
    const initData = {
      ...initialNewRowData,
      _id: id,
      isNew: true,
    };

    setRows((oldRows) => [initData, ...oldRows]);

    const focusField = getObjectKeys(initialNewRowData).find((item) => typeof item === "string");
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: focusField },
    }));
  };

  return (
    <>
      {enableMultiDelete && (
        <Button xsmall primary className={cx("delete-button")} onClick={handleDelete}>
          <MdDelete className={cx("icon")} />
          <span>XÓA</span>
        </Button>
      )}
      {enableAddNewRow && (
        <Button xsmall secondary className={cx("add-button")} onClick={handleAdd}>
          <MdAdd className={cx("icon")} />
          <span>THÊM</span>
        </Button>
      )}
    </>
  );
}

TableBottomToolBar.propTypes = {
  cx: PropTypes.func.isRequired,

  tableRef: PropTypes.shape({
    current: PropTypes.shape({
      getSelectedRows: PropTypes.func,
    }),
  }),
  setPopup: PropTypes.func,
  enableMultiDelete: PropTypes.bool,
  onDelete: PropTypes.func,

  enableAddNewRow: PropTypes.bool,
  initialNewRowData: PropTypes.shape({}),
  setRowModesModel: PropTypes.func,
  setRows: PropTypes.func,
};

TableBottomToolBar.defaultProps = {
  tableRef: {},
  setPopup: () => {},
  enableMultiDelete: false,
  onDelete: false,

  enableAddNewRow: false,
  initialNewRowData: {},
  setRowModesModel: () => {},
  setRows: () => {},
};

export default TableBottomToolBar;
