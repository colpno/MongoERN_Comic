/* eslint-disable no-unused-vars */
// TODO: import ChargeBar from "./ChargeBar";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { AiOutlineInfoCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

import { BuyTicket, ChargeIcon, RentTicket } from "assets/images";
import { NoData, Popup } from "features/index.jsx";
import { usePopup } from "hooks/index.jsx";
import styles from "../styles/TitleAbout.module.scss";
import ChargeExplainPopup from "./ChargeExplainPopup";
import TicketExplainPopup from "./TicketExplainPopup";

const cx = classNames.bind(styles);

function TitleAbout() {
  const user = useSelector((state) => state.user.user);
  const title = useSelector((state) => state.title.title);
  const { popup, setPopup, triggerPopup } = usePopup();

  if (!title) {
    return (
      <NoData>
        <h6>Không có truyện nào để hiển thị!</h6>
      </NoData>
    );
  }

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
      </div> */}
      {/* <div className={cx("title-page__about__charge", "side-info")}>
        <div className={cx("charge-info")}>
          <div className={cx("charge__icon")}>
            <ChargeIcon />
            <span className={cx("charge__icon__label")}>{title.chargeTime}6</span>
          </div>
          <span>
            {`Đọc miễn phí 1 chương như có "Vé thuê" khi sạc đủ`}
            <span className={cx("charge-time")}>
              {title.chargeTime}
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
        <ChargeBar user={user} title={title} />
      </div> */}
      {/* <div className={cx("title-page__about__notifications", "side-info")}>
        <div className={cx("title-page__about__notifications__notification")}>
          <AiOutlineInfoCircle className={cx("icon-info")} />
          <span>7 chuong moi nhat chi ap dung Coin hoac Ve mua</span>
        </div>
      </div> */}
      <Popup data={popup} trigger={triggerPopup} />
    </section>
  );
}

TitleAbout.propTypes = {};

export default memo(TitleAbout);
