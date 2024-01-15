import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Loading } from "features";
import { useToast } from "hooks";
import notificationService from "services/notification.service";
import NotificationTable from "./components/NotificationTable";
import styles from "./styles/Notifications.module.scss";

const cx = classNames.bind(styles);

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Toast, options: toastOptions, toastEmitter } = useToast();

  const handleAdd = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    notificationService
      .add(fields)
      .then((response) => {
        setNotifications((prev) => [...response.data, ...prev]);
        toastEmitter(response.message);
      })
      .catch((error) => {
        setRowIdError(_id);
        toastEmitter(error, "error");
      });
  };

  const handleUpdate = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    notificationService
      .update(_id, fields)
      .then((response) => {
        setNotifications((prev) =>
          prev.map((item) => (item._id === _id ? { ...response.data } : item))
        );
        toastEmitter(response.message);
      })
      .catch((error) => {
        setRowIdError(_id);
        toastEmitter(error, "error");
      });
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = { _id_in: ids };

    notificationService
      .delete(params)
      .then((response) => {
        setNotifications((prev) =>
          prev.filter((item) => (Array.isArray(ids) ? !ids.includes(item._id) : ids !== item._id))
        );
        toastEmitter(response.message);
      })
      .catch((error) => toastEmitter(error, "error"));
  };

  useEffect(() => {
    setLoading(true);

    notificationService
      .getAll()
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
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default Notifications;
