import { RentTicket, BuyTicket } from "assets/images";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function InventoryTickets({ cx, handleClickIcon, user }) {
  return (
    <Col className={cx("inventory__general__tickets")}>
      <span className={cx("title")}>
        Tổng số vé:
        <AiOutlineQuestionCircle
          className={cx("question-icon")}
          onClick={handleClickIcon}
        />
      </span>
      <div className={cx("tickets")}>
        <span className={cx("ticket")}>
          <RentTicket />
          <strong>x</strong>
          <span className={cx("rent-quantity")}>{user.rentTicket}</span>
        </span>
        <div className={cx("divider")} />
        <span className={cx("ticket")}>
          <BuyTicket />
          <strong>x</strong>
          <span className={cx("buy-quantity")}>{user.buyTicket}</span>
        </span>
      </div>
    </Col>
  );
}

InventoryTickets.propTypes = {
  cx: PropTypes.func.isRequired,
  handleClickIcon: PropTypes.func.isRequired,
  user: PropTypes.shape({
    rentTicket: PropTypes.number.isRequired,
    buyTicket: PropTypes.number.isRequired,
  }).isRequired,
};

export default InventoryTickets;
