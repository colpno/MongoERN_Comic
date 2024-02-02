import classNames from "classnames/bind";
import { Button } from "components";
import { Dialog } from "features";
import { emitToast } from "features/Toast.jsx";
import { useCheckUseService } from "hooks/index.jsx";
import moment from "moment";
import PropTypes from "prop-types";
import { memo } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../styles/PurchaseBox.module.scss";

const cx = classNames.bind(styles);

function PurchaseBox({ purchase, chapter, payments, handleClose }) {
  const { titleId } = useParams();
  const { user, isLoggingIn } = useSelector((state) => state.user);
  const { handleLazyCheck } = useCheckUseService(true);

  const checkEnoughUnit = (method, amount) => {
    let isOK = false;
    switch (method.toLowerCase()) {
      case "coin":
        isOK = user.coin >= amount;
        break;
      case "point":
        isOK = user.point >= amount;
        break;
      case "rent ticket":
        isOK = user.ticket_for_renting >= amount;
        break;
      case "purchase ticket":
        isOK = user.ticket_for_buying >= amount;
        break;
      default:
        isOK = false;
        break;
    }
    !isOK && emitToast("Không đủ để thực hiện chức năng", "error");
    return isOK;
  };

  const handleClick = async (payment) => {
    const { amount, method } = payment;
    const { _id: chapterId } = chapter;
    if (!isLoggingIn) {
      emitToast("Bạn cần phải đăng nhập để thực thiện chức năng", "error");
      return;
    }

    const isPassed = await handleLazyCheck();
    if (checkEnoughUnit(method, amount) && isPassed) {
      const rentList = ["rent ticket"];
      const expiredAt = rentList.includes(method) ? moment().add(5, "days").toISOString() : null;

      await purchase({ titleId, chapterId, method, cost: amount, expiredAt }).unwrap();
    }
  };

  return (
    <Dialog handleClickOutside={handleClose}>
      <div className={cx("purchase-box")}>
        <AiFillCloseCircle className={cx("close-button")} onClick={handleClose} />
        <div className={cx("image-box")}>
          <h4 className={cx("title")}>
            Chương {chapter.order}
            {chapter.title ? `: ${chapter.title}` : ""}
          </h4>
          <img src={chapter.cover.source} alt="title cover" />
        </div>
        <div className={cx("payment-box")}>
          <div className={cx("choices")}>
            {payments.map((payment, index) => (
              <Button
                primary
                className={cx("button")}
                key={index}
                onClick={() => handleClick(payment, chapter)}
              >
                <span>{payment.amount}</span>
                <img src={payment.icon} alt="payment icon" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Dialog>
  );
}

PurchaseBox.propTypes = {
  chapter: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      source: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
  }).isRequired,
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      icon: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]).isRequired,
    }).isRequired
  ).isRequired,
  handleClose: PropTypes.func.isRequired,
  purchase: PropTypes.func.isRequired,
};

export default memo(PurchaseBox);
