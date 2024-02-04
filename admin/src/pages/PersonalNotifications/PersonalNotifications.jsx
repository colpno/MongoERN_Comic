import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import {
  useAddPersonalNotification,
  useDeletePersonalNotification,
  useGetPersonalNotifications,
  useUpdatePersonalNotification,
} from "hooks";
import PersonalNotificationTable from "./components/PersonalNotificationTable";
import styles from "./styles/PersonalNotifications.module.scss";

const cx = classNames.bind(styles);

function PersonalNotifications() {
  const { data: notifications } = useGetPersonalNotifications({
    _embed: JSON.stringify([{ collection: "user_id", fields: "username" }]),
    _fields: "-cover.cloud_public_id -__v",
  });
  const { add: addNotification } = useAddPersonalNotification();
  const { update: updateNotification } = useUpdatePersonalNotification();
  const { del: deleteNotification } = useDeletePersonalNotification();

  const handleAdd = (data, setRowIdError) => {
    addNotification(data).catch(() => {
      setRowIdError(data._id);
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
          <h4 className={cx("label")}>All Personal Notifications</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingContainer className={cx("data-rows")}>
            <PersonalNotificationTable
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

export default PersonalNotifications;
