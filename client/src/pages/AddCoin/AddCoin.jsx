import classNames from "classnames/bind";
import { PaymentOptions } from "components/index.jsx";
import { NoData } from "features";
import PropTypes from "prop-types";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./AddCoin.module.scss";
import AddCoinQuotes from "./components/AddCoinQuotes";
import { PayPalForm } from "./components";

export const cx = classNames.bind(styles);

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
    case "paypal":
      return <PayPalForm />;
    default:
      return <EmptyForm />;
  }
}

function AddCoin() {
  const [selectedMethod, setSelectedMethod] = useState({
    value: "",
    label: "",
  });

  return (
    <Container className={cx("add-coin")}>
      <AddCoinQuotes />
      <Row>
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

export default AddCoin;
