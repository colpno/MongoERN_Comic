/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";

import Button from "components/Button";
import { formatTime } from "utils/convertTime";
import { separateNumberDigit } from "utils";
import styles from "../styles/MemberTableRow.module.scss";

const cx = classNames.bind(styles);

function MemberTableRow({
  popup,
  setPopup,
  members,
  setDeleteItem,
  setUpdate,
  setShowForm,
}) {
  const handleDeleteClick = (guid) => {
    setPopup({
      ...popup,
      trigger: true,
      title: "Xóa tài khoản",
      content: "Bạn có muốn xóa tài khoản?",
    });
    setDeleteItem(guid);
  };

  const handleUpdateClick = (genre) => {
    setShowForm(true);
    setUpdate((prev) => {
      return { ...prev, selected: genre };
    });
  };

  return (
    <>
      {members.map((member) => {
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
        } = member;
        const createdTime = formatTime(createdAt);
        const updatedTime = formatTime(updatedAt);

        return (
          <Row className={cx("chapters__container__content")} key={id}>
            <Col sm={1}>
              <span className={cx("order")}>{id}</span>
            </Col>
            <Col>
              <span className={cx("user-name")}>{username}</span>
            </Col>
            {/* <Col>
              <span className={cx("coin")}>{coin}</span>
            </Col>
            <Col>
              <span className={cx("income")}>
                {separateNumberDigit(income)}
              </span>
            </Col> */}
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
              <span className={cx("created-time")}>
                {`${createdTime.day}.${createdTime.month}.${createdTime.year}`}
              </span>
            </Col>
            <Col>
              <span className={cx("updated-time")}>
                {`${updatedTime.day}.${updatedTime.month}.${updatedTime.year}`}
              </span>
            </Col>
            <Col sm={1} className={cx("actions")}>
              {/* <Button
                outline
                gray
                className={cx("action")}
                title="Chỉnh sửa chương"
                onClick={() => handleUpdateClick(member)}
              >
                <HiOutlinePencil />
              </Button> */}
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

MemberTableRow.propTypes = {
  popup: PropTypes.shape({
    trigger: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      guid: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      // buyTicket: PropTypes.number.isRequired,
      // rentTicket: PropTypes.number.isRequired,
      coin: PropTypes.number.isRequired,
      income: PropTypes.number.isRequired,
      // point: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  setPopup: PropTypes.func.isRequired,
  setDeleteItem: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default MemberTableRow;
