import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";

import { Radio } from "components";
import { NoData } from "features";
import { paymentMethodService } from "services";
import styles from "./AddCoin.module.scss";
import { PayPalForm } from "./components";

const cx = classNames.bind(styles);

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
  const [choseMethod, setChoseMethod] = useState({
    value: "",
    label: "",
  });
  const [payMethods, setPayMethods] = useState([]);

  const options = useMemo(
    () =>
      payMethods.map((payMethod) => {
        return {
          value: payMethod.name,
          label: payMethod.name,
        };
      }),
    [payMethods]
  );

  const handleMethodChange = (e) => {
    const { value } = e.target;
    const option = options.find((method) => {
      return method.value === value;
    });
    setChoseMethod({
      ...option,
      value,
    });
  };

  useEffect(() => {
    paymentMethodService
      .getAll()
      .then((response) => setPayMethods(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container className={cx("add-coin")}>
      <Row className={cx("add-coin__step")}>
        <p className={cx("add-coin__step__title")}>Chọn phương thức thanh toán</p>
        <div className={cx("add-coin__step__methods")}>
          {options.map((method) => {
            return (
              <div className={cx("add-coin__step__methods__method")} key={method.value}>
                <Radio
                  field={{
                    name: "payMethod",
                    onChange: handleMethodChange,
                    value: choseMethod.value,
                  }}
                  value={method.value}
                >
                  <span>{method.label}</span>
                  {!!method.subLabel && <span className={cx("sub-label")}>{method.subLabel}</span>}
                </Radio>
              </div>
            );
          })}
        </div>
      </Row>
      <Row className={cx("add-coin__step")}>
        <Form form={choseMethod.label} />
      </Row>
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
