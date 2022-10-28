import classNames from "classnames/bind";

import styles from "../assets/styles/IncomePopup.module.scss";

const cx = classNames.bind(styles);

function IncomePopup() {
  return (
    <div className={cx("popup")}>
      <div className={cx("content")}>
        <p>
          Thu nhập của bạn sẽ được tính dựa trên số coin của chương người đọc đã
          mua.
          {/* Thu nhập của bạn sẽ được tính dựa trên số lượt thích của những chương
          truyện có trả phí bằng coin. */}
        </p>
      </div>
      {/* <div className={cx("attention-wrapper")}>
        <p className={cx("attention")}>Lưu ý:</p>
        <ul className={cx("attention-list")}>
          <li>
            - Nếu chương được chuyển từ trả phí sang miễn phí thì sẽ không tính
            thu nhập của chương đó dù lượt thích tăng.
          </li>
          <li>
            - Nếu chuyển từ miễn phí sang trả phí thì sẽ bắt đầu tính thu nhập
            của chương với điều kiện lượt thích đã có tại thời điểm đó sẽ không
            được bao gồm.
          </li>
        </ul>
      </div> */}
    </div>
  );
}

export default IncomePopup;
