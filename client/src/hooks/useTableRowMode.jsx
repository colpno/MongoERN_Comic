import { GridRowModes } from "@mui/x-data-grid-pro";
import { useEffect, useState } from "react";

function useTableRowMode() {
  const [rowModesModel, setRowModesModel] = useState({});
  const [rowIdError, setRowIdError] = useState("");

  useEffect(() => {
    !!rowIdError &&
      setRowModesModel((prev) => ({
        ...prev,
        [rowIdError]: { mode: GridRowModes.Edit },
      }));
  }, [rowIdError]);

  return {
    rowModesModel,
    setRowModesModel,
    rowIdError,
    setRowIdError,
  };
}

export default useTableRowMode;
