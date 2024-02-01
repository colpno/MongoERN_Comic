import classNames from "classnames/bind";
import { Radio } from "components";
import { useGetPaymentMethods } from "hooks/index.jsx";
import PropTypes from "prop-types";
import { useMemo } from "react";
import styles from "./PaymentOptions.module.scss";

const cx = classNames.bind(styles);

function PaymentOptions({ selectedPayment, setSelectedPayment }) {
  const { data: payMethods = [] } = useGetPaymentMethods();

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
    setSelectedPayment({
      ...option,
      value,
    });
  };

  return (
    <div>
      <p className={cx("title")}>Chọn phương thức thanh toán</p>
      <div className={cx("methods")}>
        {options.map((method) => {
          return (
            <div className={cx("method")} key={method.value}>
              <Radio
                field={{
                  name: "payMethod",
                  onChange: handleMethodChange,
                  value: selectedPayment.value,
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
    </div>
  );
}

PaymentOptions.propTypes = {
  selectedPayment: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedPayment: PropTypes.func.isRequired,
};

export default PaymentOptions;
