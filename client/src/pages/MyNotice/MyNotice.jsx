import classNames from "classnames/bind";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { useToast } from "hooks";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { personalNotificationService } from "services";
import styles from "./MyNotice.module.scss";
import MyNoticeTable from "./components/MyNoticeTable";

const cx = classNames.bind(styles);

function MyNotice() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [notifications, setNotifications] = useState([]);
  const { Toast, options, toastEmitter } = useToast();

  const handleRead = useCallback((row) => {
    dispatch(setLoading(true));

    const now = moment().toISOString();
    const data = { read_at: row.read_at ? null : now };

    personalNotificationService
      .update(row._id, data)
      .then((response) => {
        const { data: newNotice } = response;
        setNotifications((prev) => {
          return prev.map((notification) => {
            return notification._id === newNotice._id ? newNotice : notification;
          });
        });
      })
      .catch((error) => toastEmitter(error, "error"));

    dispatch(setLoading(false));
  }, []);

  const handleDelete = (data) => {
    dispatch(setLoading(true));
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

    dispatch(setLoading(false));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const params = {
      user_id: user._id,
      _fields: "-user_id",
    };

    personalNotificationService
      .getAll(params)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });

    dispatch(setLoading(false));
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
    </>
  );
}

export default MyNotice;
