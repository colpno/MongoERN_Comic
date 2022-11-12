/* eslint-disable no-unused-vars */
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

function TitleAbout({ user, title, setPopup }) {
  const cx = classNames.bind(styles);
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
    setPopup({ ...content, trigger: true });
  };

  return (
    <div className={cx("title-page__about")}>
      <div className={cx("title-page__about__published-status", "side-info")}>
        {title.releaseDay === "finished" || title.releaseDay === "paused" ? (
          <>
            Tình trạng cập nhật:
            <span className={cx(title.releaseDay)}>
              {status(title.releaseDay)}
            </span>
          </>
        ) : (
          <>
            Cập nhật mỗi tuần vào:
            <span className={cx("day-in-week")}>
              {status(title.releaseDay)}
            </span>
          </>
        )}
      </div>
      {/* <div className={cx("title-page__about__ticket-info", "side-info")}>
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
      </div> */}
      {/* <div className={cx("title-page__about__charge", "side-info")}>
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
      </div> */}
      {/* <div className={cx("title-page__about__notifications", "side-info")}>
        <div className={cx("title-page__about__notifications__notification")}>
          <AiOutlineInfoCircle className={cx("icon-info")} />
          <span>7 chuong moi nhat chi ap dung Coin hoac Ve mua</span>
        </div>
      </div> */}
    </div>
  );
}

TitleAbout.propTypes = {
  setPopup: PropTypes.func.isRequired,
  title: PropTypes.shape({
    approvedStatusId: PropTypes.string.isRequired,
    releaseDay: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
};

export default memo(TitleAbout);
