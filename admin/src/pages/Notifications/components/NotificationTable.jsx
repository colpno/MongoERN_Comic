import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { Table } from "components";
import moment from "moment";
import styles from "../styles/NotificationTableRow.module.scss";

const cx = classNames.bind(styles);

function NotificationTable({ notifications, onDelete, onUpdate, onAdd }) {
  const initialState = {
    pinnedColumns: { right: ["actions"] },
  };

  const initialNewRowData = {
    cover: "",
    title: "",
    subTitle: "",
    content: "",
  };

  return (
    <Table
      headers={[
        {
          field: "cover",
          headerName: "Cover",
          flex: 1,
          minWidth: 200,
          maxWidth: 250,
          editable: true,
          valueGetter: ({ value }) => value?.source || value,
          renderCell: ({ value }) => {
            return (
              <div className={cx("cover-wrapper")}>
                <div className={cx("box-img")}>
                  <img src={value} alt={value} />
                </div>
                <span className={cx("title")}>{value}</span>
              </div>
            );
          },
        },
        {
          field: "title",
          headerName: "Tiêu đề",
          align: "left",
          headerAlign: "center",
          flex: 2,
          minWidth: 200,
          editable: true,
          renderCell: ({ value }) => <span title={value}>{value}</span>,
        },
        {
          field: "subTitle",
          headerName: "Tiêu đề phụ",
          flex: 1,
          minWidth: 140,
          maxWidth: 200,
          align: "center",
          headerAlign: "center",
          editable: true,
          renderCell: ({ value }) => <span title={value}>{value}</span>,
        },
        {
          headerName: "Nội dung",
          field: "content",
          align: "center",
          flex: 2,
          width: 300,
          headerAlign: "center",
          editable: true,
          renderCell: ({ value }) => <span title={value}>{value}</span>,
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
            <span className="timestamp">{moment(value).format("DD.MM.YYYY HH:mm")}</span>
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
            <span className="timestamp">{moment(value).format("DD.MM.YYYY HH:mm")}</span>
          ),
        },
      ]}
      data={notifications}
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

NotificationTable.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default NotificationTable;
