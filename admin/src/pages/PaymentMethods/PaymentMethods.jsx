import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import {
  useAddPaymentMethod,
  useDeletePaymentMethod,
  useGetPaymentMethods,
  useUpdatePaymentMethod,
} from "hooks";
import PaymentMethodsTable from "./components/PaymentMethodsTable";
import styles from "./styles/PaymentMethods.module.scss";

const cx = classNames.bind(styles);

function PaymentMethods() {
  const { data: paymentMethods } = useGetPaymentMethods();
  const { add: addMethod } = useAddPaymentMethod();
  const { update: updateMethod } = useUpdatePaymentMethod();
  const { delete: deleteMethod } = useDeletePaymentMethod();

  const handleUpdate = (data) => {
    const { _id, ...fields } = data;
    updateMethod({ id: _id, data: fields });
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };
    deleteMethod(params);
  };

  const handleAdd = (data, setRowIdError) => {
    addMethod(data).catch(() => {
      setRowIdError(data._id);
    });
  };

  return (
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
  );
}

export default PaymentMethods;
