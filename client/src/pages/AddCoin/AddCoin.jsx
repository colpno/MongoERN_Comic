import classNames from "classnames/bind";
import { Button, Radio } from "components";
import { NoData } from "features";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { getAllPayMethods } from "services/payMethod";
import styles from "./assets/styles/AddCoin.module.scss";

const cx = classNames.bind(styles);

function AddCoin() {
  const [choseMethod, setChoseMethod] = useState({ value: "0", label: "" });
  const { payMethods } = getAllPayMethods();

  const options = payMethods.map((payMethod) => {
    return { value: payMethod.id, label: payMethod.label };
  });

  const onMethodChange = (e) => {
    const { value } = e.target;
    setChoseMethod({
      value,
      label: options.find((method) => {
        return method.value === value;
      }).label,
    });
  };

  return (
    <Container className={cx("add-coin")}>
      <div className={cx("add-coin__step")}>
        <p className={cx("add-coin__step__title")}>
          Chọn phương thức thanh toán
        </p>
        <div className={cx("add-coin__step__methods")}>
          {options.map((method) => {
            return (
              <div
                className={cx("add-coin__step__methods__method")}
                key={method.value}
              >
                <Radio
                  field={{
                    name: "payMethod",
                    onChange: onMethodChange,
                    value: choseMethod.value,
                  }}
                  value={method.value}
                >
                  <span>{method.label}</span>
                  {!!method.subLabel && (
                    <span className={cx("sub-label")}>{method.subLabel}</span>
                  )}
                </Radio>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cx("add-coin__step")}>
        <div className={cx("add-coin__step__title")}>{choseMethod.label}</div>
        {choseMethod.value === "0" && (
          <NoData>
            <h5>Bạn chưa chọn phương thức thanh toán nào!</h5>
            <p>Vui lòng chọn hình thức thanh toán!</p>
          </NoData>
        )}
      </div>
      <div className={cx("add-coin__step")}>
        <div className={cx("note")}>
          <p className={cx("note__title")}>GHI CHÚ</p>
          <p className={cx("note__content")}>
            Coin được nạp vào hệ thống sẽ được sử dụng trên tất cả các nền tảng
            bao gồm Website / Android / iOS.
            <br />
            Coin sẽ được sử dụng để mua Chương truyện.
            <br />
            Không thể hoàn trả lại tiền sau khi đã mua Coin.
            <br />
            Nếu có lỗi trong việc nạp Coin, xin vui lòng liên hệ{" "}
            <span className={cx("note__content--mark")}>Hỗ trợ.</span>
          </p>
        </div>
        <Button primary large className={cx("add-coin__step__submit")}>
          Xác nhận
        </Button>
      </div>
    </Container>
  );
}

export default AddCoin;
