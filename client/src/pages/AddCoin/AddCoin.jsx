import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

import { PaymentOptions } from "components/index.jsx";
import { NoData } from "features";
import styles from "./AddCoin.module.scss";
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
    // case "vnpay": return <VNPayForm />;
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
      <div className={cx("add-coin__step")}>
        <div className={cx("note")}>
          <p className={cx("note__title")}>GHI CHÚ</p>
          <p className={cx("note__content")}>
            Coin được nạp vào hệ thống sẽ được sử dụng trên tất cả các nền tảng bao gồm Website.
            <br />
            Coin sẽ được sử dụng để mua Chương truyện.
            <br />
            Không thể hoàn trả lại tiền sau khi đã mua Coin.
            <br />
            Nếu có lỗi trong việc nạp Coin, xin vui lòng liên hệ{" "}
            <span className={cx("note__content--mark")}>Hỗ trợ.</span>
          </p>
        </div>
      </div>
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
