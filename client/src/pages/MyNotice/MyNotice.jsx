import classNames from "classnames/bind";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Loading, ProgressCircle } from "features";
import { useToast } from "hooks";
import { personalNotificationService } from "services";
import MyNoticeTable from "./components/MyNoticeTable";
import styles from "./MyNotice.module.scss";

const cx = classNames.bind(styles);

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

  const handleDelete = (data) => {
    setLoading(true);
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    personalNotificationService
      .delete(params)
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

  return (
    <>
      <Container className={cx("notification")}>
        <Row>
          <Col>
            <MyNoticeTable
              notifications={notifications}
              onRead={handleRead}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
      <Toast {...options} />
      {loading && <Loading />}
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default MyNotice;
