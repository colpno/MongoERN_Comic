import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Loading, Popup } from "features";
import { usePopup, useToast } from "hooks";
import { userService } from "services";
import AdminTable from "./components/AdminTable";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup({
    isShown: false,
    type: "confirm",
  });

  const handleUpdate = (data) => {
    const { _id, ...fields } = data[0];

    setPopup({
      title: "Cập nhật tài khoản",
      content: "Bạn có chắc chắn muốn thay đổi không?",
      isShown: true,
      onConfirm: () => {
        userService
          .update(_id, fields)
          .then((response) => {
            setAdmins((prev) =>
              prev.map((item) => (item._id === _id ? { ...response.data } : item))
            );
            toastEmitter(response.message);
          })
          .catch((error) => toastEmitter(error, "error"));
      },
    });
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    setPopup({
      title: "Xóa tài khoản",
      content: "Bạn có chắc chắn muốn xóa không?",
      isShown: true,
      onConfirm: () => {
        userService
          .delete(params)
          .then((response) => {
            setAdmins((prev) =>
              prev.filter((item) =>
                Array.isArray(ids) ? !ids.includes(item._id) : ids !== item._id
              )
            );
            toastEmitter(response.message);
          })
          .catch((error) => toastEmitter(error, "error"));
      },
    });
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
          <AdminTable admins={admins} onDelete={handleDelete} onUpdate={handleUpdate} />
        </FloatingContainer>
      </Container>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default Admins;
