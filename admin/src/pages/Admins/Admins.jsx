import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Loading } from "features";
import { useToast } from "hooks";
import { userService } from "services";
import AdminTable from "./components/AdminTable";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Toast, options: toastOptions, toastEmitter } = useToast();

  const handleAdd = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    userService
      .register(fields)
      .then((response) => {
        setAdmins((prev) => [response.data, ...prev]);
        toastEmitter(response.message);
      })
      .catch((error) => {
        setRowIdError(_id);
        toastEmitter(error, "error");
      });
  };

  const handleUpdate = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    userService
      .update(_id, fields)
      .then((response) => {
        setAdmins((prev) => prev.map((item) => (item._id === _id ? { ...response.data } : item)));
        toastEmitter(response.message);
      })
      .catch((error) => {
        setRowIdError(_id);
        toastEmitter(error, "error");
      });
  };

  useEffect(() => {
    const params = { role: "member" };

    userService
      .getAll(params)
      .then((response) => setAdmins(response.data))
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    userService
      .delete(params)
      .then((response) => {
        setAdmins((prev) =>
          prev.filter((item) => (Array.isArray(ids) ? !ids.includes(item._id) : ids !== item._id))
        );
        toastEmitter(response.message);
      })
      .catch((error) => toastEmitter(error, "error"));
  };

  useEffect(() => {
    const params = {
      role: "administrator",
    };

    userService
      .getAll(params)
      .then((response) => {
        setAdmins(response.data);
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
        <Row>
          <Col>
            <h4>All Administrators</h4>
          </Col>
        </Row>
        <FloatingContainer>
          {admins.length > 0 && (
            <AdminTable
              admins={admins}
              onDelete={handleDelete}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
            />
          )}
        </FloatingContainer>
      </Container>
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default Admins;
