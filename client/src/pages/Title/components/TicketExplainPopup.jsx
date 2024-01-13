import { BuyTicket, RentTicket } from "assets/images";
import classNames from "classnames/bind";

import styles from "../styles/TicketExplainPopup.module.scss";

const cx = classNames.bind(styles);

function TicketExplainPopup() {
  return (
    <div className={cx("popup")}>
      <div className={cx("ticket-buy")}>
        <div className={cx("box-img")}>
          <BuyTicket />
        </div>
        <p>Vé mua được sử dụng để mua chương.</p>
      </div>
      <div className={cx("ticket-rent")}>
        <div className={cx("box-img")}>
          <RentTicket />
        </div>
        <div className={cx("box-text")}>
          <p>Vé thuê được sử dụng để thuê chương, được chia thành 3 loại khác nhau:</p>
          <ul>
            <li>- Dành cho một truyện nhất định.</li>
            <li>- Dành cho một số truyện nhất định.</li>
            <li>- Dành cho tất cả truyện.</li>
          </ul>
        </div>
      </div>
      <div className={cx("attention-wrapper")}>
        <p className={cx("attention")}>Lưu ý:</p>
        <small className={cx("box-text")}>
          - Vé được ưu tiên sử dụng trước Coin và Point, mỗi vé chỉ mở được 1 chương.
        </small>
      </div>
    </div>
  );
}

export default TicketExplainPopup;
