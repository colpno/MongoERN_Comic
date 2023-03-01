import moment from "moment";
import PropTypes from "prop-types";

import { Table } from "components";

function GenreTable({ genres, onDelete, onUpdate, onAdd }) {
  const initialState = {
    pinnedColumns: { right: ["actions"] },
  };

  const initialNewRowData = {
    name: "",
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
          renderCell: ({ value }) => (
            <span className="bold" title={value}>
              {value}
            </span>
          ),
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
      ]}
      data={genres}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
      allowDelete
      onDelete={onDelete}
      allowEdit
      onUpdate={onUpdate}
      allowAdd
      onAdd={onAdd}
      initialNewRowData={initialNewRowData}
    />
  );
}

GenreTable.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default GenreTable;
