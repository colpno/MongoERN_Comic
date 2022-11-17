import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

import Button from "components/Button";
import { separateNumberDigit } from "utils";
import { formatTime } from "utils/convertTime";
import styles from "../styles/AdminTableRow.module.scss";

const cx = classNames.bind(styles);

function AdminTableRow({ setPopup, admins, setDeletedItem }) {
  const handleDeleteClick = (guid) => {
    setPopup((prev) => {
      return {
        ...prev,
        trigger: true,
        title: "Xóa tài khoản",
        content: "Bạn có muốn xóa tài khoản?",
      };
    });
    setDeletedItem(guid);
  };

  return (
    <>
      {admins.map((admin) => {
        const {
          id,
          guid,
          username,
          // buyTicket,
          // rentTicket,
          coin,
          income,
          // point,
          createdAt,
          updatedAt,
        } = admin;
        const createdTime = formatTime(createdAt);
        const updatedTime = formatTime(updatedAt);

        return (
          <Row className={cx("chapters__container__content")} key={id}>
            <Col sm={1}>
              <span className={cx("id")}>{id}</span>
            </Col>
            <Col>
              <span className={cx("username")}>{username}</span>
            </Col>
            <Col>
              <span className={cx("coin")}>{coin}</span>
            </Col>
            <Col>
              <span className={cx("income")}>
                {separateNumberDigit(income)}
              </span>
            </Col>
            {/* <Col>
              <span className={cx("point")}>{point}</span>
            </Col>
            <Col>
              <span className={cx("buy-ticket")}>{buyTicket}</span>
            </Col>
            <Col>
              <span className={cx("rent-ticket")}>{rentTicket}</span>
            </Col> */}
            <Col>
              <span className={cx("createdAt")}>
                {`${createdTime.day}.${createdTime.month}.${createdTime.year}`}
              </span>
            </Col>
            <Col>
              <span className={cx("updatedAt")}>
                {`${updatedTime.day}.${updatedTime.month}.${updatedTime.year}`}
              </span>
            </Col>
            <Col sm={1} className={cx("actions")}>
              <Button
                outline
                gray
                className={cx("action")}
                title="Xóa chương"
                onClick={() => handleDeleteClick(guid)}
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
  setPopup: PropTypes.func.isRequired,
  admins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      // buyTicket: PropTypes.number.isRequired,
      // rentTicket: PropTypes.number.isRequired,
      coin: PropTypes.number.isRequired,
      income: PropTypes.number.isRequired,
      // point: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      guid: PropTypes.string.isRequired,
    })
  ).isRequired,
  setDeletedItem: PropTypes.func.isRequired,
};

export default AdminTableRow;
