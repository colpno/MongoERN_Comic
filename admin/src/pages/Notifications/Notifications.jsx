import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import {
  useAddNotification,
  useDeleteNotification,
  useGetNotifications,
  useUpdateNotification,
} from "hooks";
import NotificationTable from "./components/NotificationTable";
import styles from "./styles/Notifications.module.scss";

const cx = classNames.bind(styles);

function Notifications() {
  const { data: notifications } = useGetNotifications();
  const { add: addNotification } = useAddNotification();
  const { update: updateNotification } = useUpdateNotification();
  const { del: deleteNotification } = useDeleteNotification();

  const handleAdd = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    addNotification(fields).catch(() => {
      setRowIdError(_id);
    });
  };

  const handleUpdate = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    updateNotification({ id: _id, data: fields }).catch(() => {
      setRowIdError(_id);
    });
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = { _id_in: ids };
    deleteNotification(params);
  };

  return (
    <Container>
      <Row className={cx("label-wrapper")}>
        <Col>
          <h4 className={cx("label")}>All Notifications</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingContainer className={cx("data-rows")}>
            <NotificationTable
              notifications={notifications}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onAdd={handleAdd}
            />
          </FloatingContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default Notifications;
