import classNames from "classnames/bind";
import { memo } from "react";
import PropTypes from "prop-types";
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";

import { BuyTicket, ChargeIcon, RentTicket } from "assets/images";
import styles from "../styles/TitleAbout.module.scss";
// TODO: import ChargeBar from "./ChargeBar";
import ChargeExplainPopup from "./ChargeExplainPopup";
import TicketExplainPopup from "./TicketExplainPopup";

const cx = classNames.bind(styles);

function TitleAbout({ user, title, setPopup }) {
  const status = (sta) => {
    switch (sta) {
      case "finished":
        return "Hoàn thành";
      case "paused":
        return "Tạm dừng";
      default:
        return sta;
    }
  };

  const handleClickIcon = (content) => {
    setPopup({ ...content, isTriggered: true });
  };

  return (
    <section className={cx("title-page__about")}>
      <div className={cx("title-page__about__published-status", "side-info")}>
        {title.release_day === "finished" || title.release_day === "paused" ? (
          <>
            Tình trạng cập nhật:
            <span className={cx(title.release_day)}>{status(title.release_day)}</span>
          </>
        ) : (
          <>
            Cập nhật mỗi tuần vào:
            <span className={cx("day-in-week")}>{status(title.release_day)}</span>
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
            <span className={cx("rent-quantity")}>{user.ticket_for_renting}</span>
            <strong className={cx("ticket-separate")}>x</strong>
            <RentTicket />
          </span>
          <span className={cx("ticket")}>
            Vẽ mua chương:
            <span className={cx("buy-quantity")}>{user.ticket_for_buying}</span>
            <strong className={cx("ticket-separate")}>x</strong>
            <BuyTicket />
          </span>
        </div>
      </div>
      <div className={cx("title-page__about__charge", "side-info")}>
        <div className={cx("charge-info")}>
          <div className={cx("charge__icon")}>
            <ChargeIcon />
            <span className={cx("charge__icon__label")}>{/* TODO: {title.chargeTime} */}6</span>
          </div>
          <span>
            {`Đọc miễn phí 1 chương như có "Vé thuê" khi sạc đủ`}
            <span className={cx("charge-time")}>
              {/* TODO: {title.chargeTime} */}
              6h
            </span>
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
        {/* TODO: <ChargeBar user={user} title={title} /> */}
      </div>
      <div className={cx("title-page__about__notifications", "side-info")}>
        <div className={cx("title-page__about__notifications__notification")}>
          <AiOutlineInfoCircle className={cx("icon-info")} />
          <span>7 chuong moi nhat chi ap dung Coin hoac Ve mua</span>
        </div>
      </div>
    </section>
  );
}

TitleAbout.propTypes = {
  setPopup: PropTypes.func.isRequired,
  title: PropTypes.shape({
    release_day: PropTypes.string.isRequired,
    // TODO: chargeTime: PropTypes.number.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    ticket_for_renting: PropTypes.number.isRequired,
    ticket_for_buying: PropTypes.number.isRequired,
  }).isRequired,
};

export default memo(TitleAbout);
