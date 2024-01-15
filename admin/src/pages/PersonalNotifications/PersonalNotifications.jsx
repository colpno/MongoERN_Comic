import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Loading } from "features";
import { useToast } from "hooks";
import { personalNotificationService } from "services";
import PersonalNotificationTable from "./components/PersonalNotificationTable";
import styles from "./styles/PersonalNotifications.module.scss";

const cx = classNames.bind(styles);

function PersonalNotifications() {
  const [notifications, setPersonalNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Toast, options: toastOptions, toastEmitter } = useToast();

  const handleAdd = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    personalNotificationService
      .add(fields)
      .then((response) => {
        setPersonalNotifications((prev) => [...prev, response.data]);
        toastEmitter(response.message);
      })
      .catch((error) => {
        setRowIdError(_id);
        toastEmitter(error, "error");
      });
  };

  const handleUpdate = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    personalNotificationService
      .update(_id, fields)
      .then((response) => {
        setPersonalNotifications((prev) =>
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

    personalNotificationService
      .delete(params)
      .then((response) => {
        setPersonalNotifications((prev) =>
          prev.filter((item) => (Array.isArray(ids) ? !ids.includes(item._id) : ids !== item._id))
        );
        toastEmitter(response.message);
      })
      .catch((error) => toastEmitter(error, "error"));
  };

  useEffect(() => {
    setLoading(true);

    const params = {
      _embed: JSON.stringify([{ collection: "user_id", fields: "username" }]),
      _fields: "-cover.cloud_public_id -__v",
    };

    personalNotificationService
      .getAll(params)
      .then((response) => {
        setPersonalNotifications(response.data);
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
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default PersonalNotifications;
