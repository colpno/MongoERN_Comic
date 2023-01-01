import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { AiFillCloseCircle } from "react-icons/ai";

import { Button } from "components";
import { Dialog } from "features";
import styles from "../styles/PurchaseBox.module.scss";

const cx = classNames.bind(styles);

function PurchaseBox({ chapter, payments, handleSubmit, handleClose }) {
  return (
    <Dialog handleClickOutside={handleClose}>
      <div className={cx("purchase-box")}>
        <AiFillCloseCircle className={cx("close-button")} onClick={handleClose} />
        <div className={cx("image-box")}>
          <h4 className={cx("title")}>{chapter.title}</h4>
          <img src={chapter.cover.source} alt="title cover" />
        </div>
        <div className={cx("payment-box")}>
          <div className={cx("choices")}>
            {payments.map((payment, index) => {
              return (
                <Button outline className={cx("button")} key={index}>
                  <span>{payment.amount}</span>
                  <img src={payment.icon} alt="payment icon" />
                </Button>
              );
            })}
            <Button primary round className={cx("submit")} onClick={handleSubmit}>
              Mua/Thuê
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

PurchaseBox.propTypes = {
  chapter: PropTypes.shape({
    cover: PropTypes.shape({
      source: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      icon: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired,
    }).isRequired
  ).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PurchaseBox;
