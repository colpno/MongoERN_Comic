import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import moment from "moment";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

import { Table } from "components";

function GenreTable({ genres, onDelete, onUpdate }) {
  const initialState = {
    pinnedColumns: { right: ["actions"] },
  };

  return (
    <Table
      headers={[
        {
          field: "name",
          headerName: "Thể loại",
          align: "left",
          headerAlign: "center",
          flex: 2,
          minWidth: 200,
          editable: true,
          renderCell: ({ value }) => <span className="bold">{value}</span>,
        },
        {
          field: "createdAt",
          headerName: "Ngày tạo",
          flex: 1,
          minWidth: 140,
          maxWidth: 200,
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => (
            <span className="timestamp">{moment(value).format("DD.MM.YYYY")}</span>
          ),
        },
        {
          headerName: "Ngày sửa",
          field: "updatedAt",
          align: "center",
          flex: 1,
          maxWidth: 200,
          minWidth: 140,
          headerAlign: "center",
          renderCell: ({ value }) => (
            <span className="timestamp">{moment(value).format("DD.MM.YYYY")}</span>
          ),
        },
        {
          field: "actions",
          type: "actions",
          width: 80,
          getActions: ({ row }) => [
            <GridActionsCellItem
              size="large"
              icon={<FaTrash />}
              label="Delete"
              onClick={() => onDelete(row._id)}
            />,
          ],
        },
      ]}
      data={genres}
      hasToolbar
      height={700}
      rowHeight={100}
      checkboxSelection
      initialState={initialState}
      onMultiDelete={onDelete}
      onRowEditCommit={onUpdate}
    />
  );
}

GenreTable.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GenreTable;
