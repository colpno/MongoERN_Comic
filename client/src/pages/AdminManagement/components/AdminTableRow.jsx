import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";

import Button from "components/Button";
import { formatTime } from "utils/convertTime";
import styles from "../styles/AdminTableRow.module.scss";

const cx = classNames.bind(styles);

function AdminTableRow({ popup, setPopup, admins }) {
  const handlePopup = () => {
    setPopup({
      ...popup,
      trigger: true,
      title: "Xóa chương",
      content: "Bạn có muốn xóa chương?",
    });
  };

  return (
    <>
      {admins.map((admin) => {
        const {
          index,
          userName,
          buyTicket,
          rentTicket,
          coin,
          point,
          createdAt,
          updatedAt,
        } = admin;
        const createdTime = formatTime(createdAt);
        const updatedTime = formatTime(updatedAt);
        return (
          <Row className={cx("chapters__container__content")} key={index}>
            <Col sm={1}>
              <span className={cx("order")}>{index}</span>
            </Col>
            <Col>
              <span className={cx("user-name")}>{userName}</span>
            </Col>
            <Col>
              <span className={cx("coin")}>{coin}</span>
            </Col>
            <Col>
              <span className={cx("point")}>{point}</span>
            </Col>
            <Col>
              <span className={cx("buy-ticket")}>{buyTicket}</span>
            </Col>
            <Col>
              <span className={cx("rent-ticket")}>{rentTicket}</span>
            </Col>
            <Col>
              <span className={cx("created-time")}>
                {`${createdTime.day}.${createdTime.month}.${createdTime.year}`}
              </span>
            </Col>
            <Col>
              <span className={cx("updated-time")}>
                {`${updatedTime.day}.${updatedTime.month}.${updatedTime.year}`}
              </span>
            </Col>
            <Col className={cx("actions")}>
              <Button
                outline
                gray
                to={`update/${index}`}
                className={cx("action")}
                title="Chỉnh sửa chương"
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                gray
                className={cx("action")}
                title="Xóa chương"
                onClick={handlePopup}
              >
                <BsTrash />
              </Button>
            </Col>
          </Row>
        );
      })}
    </>
  );
}

AdminTableRow.propTypes = {
  popup: PropTypes.shape({
    trigger: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
  admins: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
      buyTicket: PropTypes.number.isRequired,
      rentTicket: PropTypes.number.isRequired,
      coin: PropTypes.number.isRequired,
      point: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AdminTableRow;
