import { BuyTicket, RentTicket } from "assets/images";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/InventoryTable.module.scss";

const cx = classNames.bind(styles);

function InventoryTable({ hiredTitles }) {
  return (
    <>
      {hiredTitles.map((hiredTitle) => {
        const beginTime = formatTime(hiredTitle.createdAt);
        const expiredTime = hiredTitle.expiredDay
          ? formatTime(hiredTitle.expiredDay)
          : "";
        const { title } = hiredTitle;

        return (
          <Row
            className={cx("inventory__container__content")}
            key={hiredTitle.id}
          >
            <Col md={6} className={cx("title")}>
              <div className={cx("box-img")}>
                <img src={title.coverImage} alt={title.titleName} />
              </div>
              <span className={cx("title")}>{title.titleName}</span>
            </Col>
            <Col>
              <span className={cx("title")}>
                {hiredTitle.ticketId === 1 ? <BuyTicket /> : <RentTicket />}
                <strong className={cx("separate")}>x</strong>
                <strong className={cx("rent-quantity")}>1</strong>
              </span>
            </Col>
            <Col className={cx("begin-time")}>
              {`${beginTime.day}.${beginTime.month}.${beginTime.year}`}
            </Col>
            {expiredTime !== "" ? (
              <Col className={cx("expired-time")}>
                {`${expiredTime.day}.${expiredTime.month}.${expiredTime.year} ${expiredTime.hour}:${expiredTime.minute}`}
              </Col>
            ) : (
              <Col />
            )}
          </Row>
        );
      })}
    </>
  );
}

InventoryTable.propTypes = {
  hiredTitles: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      expiredDay: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.shape({
        coverImage: PropTypes.string.isRequired,
        titleName: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default InventoryTable;
