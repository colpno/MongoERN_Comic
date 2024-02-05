import { GRID_CHECKBOX_SELECTION_COL_DEF, GridActionsCellItem } from "@mui/x-data-grid-pro";
import PropTypes from "prop-types";
import { memo } from "react";
import { TbList } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { Table } from "components";
import { useUpdateTitle } from "hooks/index.jsx";
import { replaceAll } from "utils";
import { getTitleHeaders } from "../helpers/getTitleHeaders.jsx";

function TitleTable({ titles, approvedStatuses }) {
  const { update: updateTitle } = useUpdateTitle();
  const navigate = useNavigate();
  const initialState = {
    sorting: {
      sortModel: [{ field: "approved_status_id", sort: "asc" }],
    },
    pinnedColumns: { left: [GRID_CHECKBOX_SELECTION_COL_DEF.field, "title"], right: ["actions"] },
  };

  const handleUpdate = (data, setRowIdError) => {
    const { _id, approved_status_id: approvedStatusId } = data;
    updateTitle({ id: _id, data: { approved_status_id: approvedStatusId } }).catch(() => {
      setRowIdError(_id);
    });
  };

  return (
    <Table
      headers={getTitleHeaders(approvedStatuses)}
      data={titles}
      hasToolbar
      rowHeight={100}
      height={700}
      initialState={initialState}
      allowEdit
      onUpdate={handleUpdate}
      customAction={({ row }) => [
        <GridActionsCellItem
          size="large"
          title="Xem danh sách chương"
          icon={<TbList />}
          label="Show chapters"
          onClick={() => {
            const { title } = row;
            const titleParam = replaceAll(title.toLowerCase(), /\s/, "-");
            const URLParam = `/chapters?title=${titleParam}`;
            navigate(URLParam);
          }}
        />,
      ]}
    />
  );
}

TitleTable.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  approvedStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default memo(TitleTable);
