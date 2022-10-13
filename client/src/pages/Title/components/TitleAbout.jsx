import classNames from "classnames/bind";
import { memo } from "react";
import PropTypes from "prop-types";
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";

import { BuyTicket, ChargeIcon, RentTicket } from "assets/images";
import { UserArray } from "database";
import styles from "pages/Title/assets/styles/TitleAbout.module.scss";
import ChargeBar from "./ChargeBar";
import ChargeExplainPopup from "./ChargeExplainPopup";
import TicketExplainPopup from "./TicketExplainPopup";

function TitleAbout({ title, setPopup }) {
  const cx = classNames.bind(styles);
  const user = UserArray()[0];
  const status = {
    finished: "Hoàn thành",
    paused: "Tạm dừng",
  };

  const handleClickIcon = (content) => {
    setPopup({ ...content, trigger: true });
  };

  return (
    <div className={cx("title-page__about")}>
      <div className={cx("title-page__about__published-status", "side-info")}>
        {title.titleStatus.status === "ongoing" ? (
          <>
            Cập nhật mỗi tuần vào:
            <span className={cx("day-in-week")}>{title.schedule}</span>
          </>
        ) : (
          <>
            Tình trạng cập nhật:
            <span className={cx(title.titleStatus.status)}>
              {status[title.titleStatus.status]}
            </span>
          </>
        )}
      </div>
      <div className={cx("title-page__about__ticket-info", "side-info")}>
        <span className={cx("title")}>
          Vé đang có:
          <AiOutlineQuestionCircle
            className={cx("icon-question")}
            onClick={() =>
              handleClickIcon({
                title: "Vé",
                content: <TicketExplainPopup />,
              })
            }
          />
        </span>
        <div className={cx("user-tickets")}>
          <span className={cx("ticket")}>
            Vé thuê chương:
            <span className={cx("rent-quantity")}>{user.rentTicket}</span>
            <strong className={cx("ticket-separate")}>x</strong>
            <RentTicket />
          </span>
          <span className={cx("ticket")}>
            Vẽ mua chương:
            <span className={cx("buy-quantity")}>{user.buyTicket}</span>
            <strong className={cx("ticket-separate")}>x</strong>
            <BuyTicket />
          </span>
        </div>
      </div>
      <div className={cx("title-page__about__charge", "side-info")}>
        <div className={cx("charge-info")}>
          <div className={cx("charge__icon")}>
            <ChargeIcon />
            <span className={cx("charge__icon__label")}>
              {title.chargeTime}
            </span>
          </div>
          <span>
            {`Đọc miễn phí 1 chương như có "Vé thuê" khi sạc đủ`}
            <span className={cx("charge-time")}>{title.chargeTime}h</span>
            <AiOutlineQuestionCircle
              className={cx("icon-question")}
              onClick={() =>
                handleClickIcon({
                  title: "Sạc điện",
                  content: <ChargeExplainPopup />,
                })
              }
            />
          </span>
        </div>
        <ChargeBar user={user} title={title} />
      </div>
      <div className={cx("title-page__about__notifications", "side-info")}>
        <div className={cx("title-page__about__notifications__notification")}>
          <AiOutlineInfoCircle className={cx("icon-info")} />
          {/* TODO: what data is stored in db */}
          <span>7 chuong moi nhat chi ap dung Coin hoac Ve mua</span>
        </div>
      </div>
    </div>
  );
}

TitleAbout.propTypes = {
  setPopup: PropTypes.func.isRequired,
  title: PropTypes.shape({
    titleStatus: PropTypes.shape({
      status: PropTypes.string.isRequired,
    }).isRequired,
    schedule: PropTypes.string.isRequired,
    chargeTime: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(TitleAbout);
