import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { useToast } from "hooks";
import { paymentMethodService } from "services";
import PaymentMethodsTable from "./components/PaymentMethodsTable";
import styles from "./styles/PaymentMethods.module.scss";

const cx = classNames.bind(styles);

function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { Toast, options, toastEmitter } = useToast();

  const handleUpdate = (data) => {
    const { _id, ...fields } = data[0];

    paymentMethodService
      .update(_id, fields)
      .then((response) => {
        setPaymentMethods((prev) =>
          prev.map((item) => (item._id === _id ? { ...response.data } : item))
        );
        toastEmitter(response.message);
      })
      .catch((error) => toastEmitter(error, "error"));
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    paymentMethodService
      .delete(params)
      .then(() => {
        setPaymentMethods((prev) =>
          prev.filter((item) => (Array.isArray(ids) ? !ids.includes(item._id) : ids !== item._id))
        );
        toastEmitter("Xóa thành công");
      })
      .catch((error) => toastEmitter(error, "error"));
  };

  const handleAdd = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    paymentMethodService
      .add(fields)
      .then((response) => {
        setPaymentMethods((prev) => [response.data, ...prev]);
        toastEmitter(response.message);
      })
      .catch((error) => {
        setRowIdError(_id);
        toastEmitter(error, "error");
      });
  };

  useEffect(() => {
    paymentMethodService
      .getAll()
      .then((response) => setPaymentMethods(response.data))
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  return (
    <>
      <Container>
        <Row className={cx("label-wrapper")}>
          <Col>
            <h4 className={cx("label")}>All Payment Methods</h4>
          </Col>
        </Row>
        <FloatingContainer>
          <PaymentMethodsTable
            paymentMethods={paymentMethods}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            onAdd={handleAdd}
          />
        </FloatingContainer>
      </Container>
      <Toast {...options} />
    </>
  );
}

export default PaymentMethods;
