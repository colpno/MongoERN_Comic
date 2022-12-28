import { BuyTicket, RentTicket } from "assets/images";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/InventoryTable.module.scss";

const cx = classNames.bind(styles);

function InventoryTable({ hiredChapters }) {
  return (
    <>
      {hiredChapters.map((hiredTitle) => {
        const beginTime = formatTime(hiredTitle.createdAt);
        const expiredTime = hiredTitle.expiredAt
          ? formatTime(hiredTitle.expiredAt)
          : "";
        const { chapter } = hiredTitle;

        return (
          <Row
            className={cx("inventory__container__content")}
            key={hiredTitle._id}
          >
            <Col md={6} className={cx("chapter")}>
              <div className={cx("box-img")}>
                <img src={chapter.cover.source} alt={chapter.title} />
              </div>
              <span className={cx("chapter")}>{chapter.title}</span>
            </Col>
            <Col>
              <span className={cx("chapter")}>
                {hiredTitle.ticket_id === 1 ? <BuyTicket /> : <RentTicket />}
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
  hiredChapters: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      expiredAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      chapter: PropTypes.shape({
        cover: PropTypes.shape({
          source: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default InventoryTable;
