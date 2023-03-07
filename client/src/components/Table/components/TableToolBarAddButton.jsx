import { GridRowModes } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { MdAdd } from "react-icons/md";

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

function TableToolBarAddButton({ cx, initialAddedData, setRows, setRowModesModel }) {
  const handleClick = () => {
    const id = makeid(6);
    const initData = {
      ...initialAddedData,
      _id: id,
      isNew: true,
    };
    setRows((oldRows) => [...oldRows, initData]);

    const focusField = getObjectKeys(initialAddedData).find((item) => typeof item === "string");
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: focusField },
    }));
  };

  return (
    <Button className={cx("add-icon")} onClick={handleClick}>
      <MdAdd className={cx("icon")} />
      Thêm
    </Button>
  );
}

TableToolBarAddButton.propTypes = {
  cx: PropTypes.func.isRequired,
  initialAddedData: PropTypes.shape({}).isRequired,
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default TableToolBarAddButton;
