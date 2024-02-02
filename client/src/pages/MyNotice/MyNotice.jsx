import classNames from "classnames/bind";
import moment from "moment";
import { useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  useDeletePersonalNotification,
  useGetPersonalNotifications,
  useUpdatePersonalNotification,
} from "hooks/index.jsx";
import styles from "./MyNotice.module.scss";
import MyNoticeTable from "./components/MyNoticeTable";

const cx = classNames.bind(styles);

function MyNotice() {
  const user = useSelector((state) => state.user.user);
  const { update } = useUpdatePersonalNotification();
  const { del } = useDeletePersonalNotification();
  const { data: notifications = [] } = useGetPersonalNotifications({
    user_id: user._id,
    _fields: "-user_id",
  });

  const handleRead = useCallback((row) => {
    if (!row.read_at) {
      const now = moment().toISOString();
      const data = { read_at: row.read_at ? null : now };
      update({ id: row._id, data });
    }
  }, []);

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    del({ _id_in: ids });
  };

  return (
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
  );
}

export default MyNotice;
