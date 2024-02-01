import PropTypes from "prop-types";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

import { PaymentOptions } from "components";
import { NoData } from "features/index.jsx";
import PayPalForm from "./components/PayPalForm";

function EmptyForm() {
  return (
    <NoData>
      <h5>Bạn chưa chọn phương thức thanh toán nào!</h5>
      <p>Vui lòng chọn hình thức thanh toán!</p>
    </NoData>
  );
}

function Form({ form }) {
  switch (form.toLowerCase()) {
    // case "vnpay": return <VNPayForm />;
    case "paypal":
      return <PayPalForm />;
    default:
      return <EmptyForm />;
  }
}

function Withdraw() {
  const [selectedMethod, setSelectedMethod] = useState({
    value: "",
    label: "",
  });

  return (
    <Container>
      <Row style={{ marginTop: "4rem" }}>
        <PaymentOptions selectedPayment={selectedMethod} setSelectedPayment={setSelectedMethod} />
      </Row>
      <Row>
        <Form form={selectedMethod.value} />
      </Row>
    </Container>
  );
}

Form.propTypes = {
  form: PropTypes.string,
};

Form.defaultProps = {
  form: "",
};
export default Withdraw;
