import moment from "moment";
import PropTypes from "prop-types";
import { Table } from "components";
import { renderEditTextarea } from "components/Table/components/EditTextArea.jsx";

function CommentTable({ comments, onUpdate }) {
  const initialState = {
    pinnedColumns: { right: ["actions"] },
  };

  return (
    <Table
      headers={[
        {
          field: "author",
          headerName: "Người đăng",
          align: "center",
          headerAlign: "center",
          minWidth: 200,
          valueGetter: ({ value }) => value._id,
          renderCell: ({ value: { username } }) => (
            <span className="bold" title={username}>
              {username}
            </span>
          ),
        },
        {
          field: "text",
          headerName: "Nội dung",
          align: "left",
          headerAlign: "center",
          minWidth: 300,
          flex: 1,
          renderCell: ({ value }) => <span title={value}>{value}</span>,
          renderEditCell: renderEditTextarea,
        },
        {
          field: "comment_replies_num",
          headerName: "Số lượng phản hồi",
          align: "center",
          headerAlign: "center",
          minWidth: 140,
          renderCell: ({ value }) => <span title={value}>{value}</span>,
        },
        {
          headerName: "Ngày sửa",
          field: "updatedAt",
          align: "center",
          maxWidth: 200,
          minWidth: 140,
          headerAlign: "center",
          renderCell: ({ value }) => (
            <span className="timestamp">{moment(value).format("DD.MM.YYYY")}</span>
          ),
        },
      ]}
      data={comments}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
      allowEdit
      onUpdate={onUpdate}
    />
  );
}

CommentTable.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentTable;
