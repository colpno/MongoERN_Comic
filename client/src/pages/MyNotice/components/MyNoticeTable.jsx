import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import moment from "moment";
import PropTypes from "prop-types";
import { MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";

import { Table } from "components";

const headers = [
  {
    field: "text",
    headerName: "Nội dung",
    headerAlign: "center",
    flex: 3,
    minWidth: 500,
    renderCell: ({ value }) => (
      <span className="bold" title={value}>
        {value}
      </span>
    ),
  },
  {
    field: "createdAt",
    headerName: "Thời gian gửi",
    headerAlign: "center",
    align: "center",
    width: 250,
    renderCell: ({ value }) => <span>{moment(value).format("DD/MM/YYYY hh:mm:ss")}</span>,
  },
];

function MyNoticeTable({ notifications, onDelete, onRead }) {
  const initialState = {
    pinnedColumns: { right: ["read_at", "actions"] },
    sorting: {
      sortModel: [
        { field: "read_at", sort: "asc" },
        { field: "createdAt", sort: "desc" },
      ],
    },
  };

  const readAction = ({ row }) => {
    return [
      row.read_at ? (
        <GridActionsCellItem
          size="medium"
          icon={<MdMarkEmailRead />}
          onClick={() => onRead(row)}
          label="Mark as unread"
          title="Đánh dầu chưa đọc"
        />
      ) : (
        <GridActionsCellItem
          size="medium"
          icon={<MdMarkEmailUnread />}
          onClick={() => onRead(row)}
          label="Mark as read"
          title="Đánh dầu đã đọc"
        />
      ),
    ];
  };

  return (
    <Table
      headers={headers}
      data={notifications}
      rowHeight={60}
      height={700}
      allowDelete
      onDelete={onDelete}
      customAction={readAction}
      initialState={initialState}
    />
  );
}

MyNoticeTable.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onRead: PropTypes.func.isRequired,
};

export default MyNoticeTable;
