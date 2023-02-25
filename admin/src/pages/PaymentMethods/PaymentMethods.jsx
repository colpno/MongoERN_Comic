import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { paymentMethodService } from "services";
import PaymentMethodsTable from "./components/PaymentMethodsTable";
import styles from "./styles/PaymentMethods.module.scss";

const cx = classNames.bind(styles);

function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { Toast, options, toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup({
    type: "confirm",
  });

  const handleUpdate = (data) => {
    const { _id, ...fields } = data[0];

    setPopup({
      title: "Cập nhật tài khoản",
      content: "Bạn có chắc chắn muốn thay đổi không?",
      isShown: true,
      onConfirm: () => {
        paymentMethodService
          .update(_id, fields)
          .then((response) => {
            setPaymentMethods((prev) =>
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
        paymentMethodService
          .delete(params)
          .then((response) => {
            setPaymentMethods((prev) =>
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
          {/* <Col md={4}>
                <Button primary onClick={() => setShowAddForm(true)}>
                  <AiOutlinePlus />
                  Thêm
                </Button>
              </Col> */}
        </Row>
        <FloatingContainer>
          <PaymentMethodsTable
            paymentMethods={paymentMethods}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </FloatingContainer>
      </Container>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...options} />
    </>
  );
}

export default PaymentMethods;
