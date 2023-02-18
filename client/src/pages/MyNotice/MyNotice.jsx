import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";

import { noNotification } from "assets/images";
import { Table } from "components";
import { Loading, NoData, ProgressCircle } from "features";
import { useToast } from "hooks";
import { personalNotificationService } from "services";
import styles from "./MyNotice.module.scss";

const cx = classNames.bind(styles);

const getHeaders = (handleDelete = () => {}) => [
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
  {
    field: "read_at",
    type: "boolean",
    headerName: "Đã đọc",
    headerAlign: "center",
    align: "center",
    width: 100,
    editable: true,
  },
  {
    field: "actions",
    type: "actions",
    width: 80,
    getActions: ({ row }) => [
      <GridActionsCellItem
        icon={<BsTrash />}
        onClick={() => handleDelete(row._id)}
        label="Delete"
      />,
    ],
  },
];

function MyNotice() {
  const user = useSelector((state) => state.user.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { Toast, options, toastEmitter } = useToast();

  const handleRead = useCallback(({ row }) => {
    const now = moment().toISOString();
    const data = { read_at: row.read_at ? null : now };

    personalNotificationService
      .update(row._id, data, setProgress)
      .then((response) => {
        const { data: newNotice } = response;
        setNotifications((prev) => {
          return prev.map((notification) => {
            return notification._id === newNotice._id ? newNotice : notification;
          });
        });
      })
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    personalNotificationService
      .delete(id)
      .then(() => {
        toastEmitter("Xóa thông báo thành công", "succes");
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const params = {
      user_id: user._id,
      _fields: "-user_id",
    };

    personalNotificationService
      .getAll(params)
      .then((response) => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastEmitter(error, "error");
      });
  }, []);

  const headers = getHeaders(handleDelete);
  const initialState = {
    pinnedColumns: { right: ["read_at", "actions"] },
    sorting: {
      sortModel: [
        { field: "read_at", sort: "asc" },
        { field: "createdAt", sort: "desc" },
      ],
    },
  };

  return (
    <>
      {notifications.length > 0 ? (
        <Container className={cx("notification")}>
          <Row>
            <Col>
              <Table
                headers={headers}
                data={notifications}
                rowHeight={60}
                initialState={initialState}
                handleCellCommit={handleRead}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <NoData image={noNotification}>
          <h5>Hiện tại chưa có thông báo nào dành cho bạn!</h5>
          <small>Vui lòng quay lại sau nhé!</small>
        </NoData>
      )}
      <Toast {...options} />
      {loading && <Loading />}
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default MyNotice;
