import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";

import Button from "components/Button";
import { formatTime } from "utils/convertTime";
import styles from "../styles/PaymentMethodTableRow.module.scss";

const cx = classNames.bind(styles);

function PaymentMethodTableRow({
  setPopup,
  paymentMethods,
  setDeleteItem,
  setUpdate,
  setShowForm,
}) {
  const handleDeleteClick = (guid) => {
    setPopup((prev) => {
      return {
        ...prev,
        trigger: true,
        title: "Xóa tài khoản",
        content: "Bạn có muốn xóa tài khoản?",
      };
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
      {paymentMethods.map((method) => {
        const { id, name, createdAt, updatedAt, guid } = method;
        const createdTime = formatTime(createdAt);
        const updatedTime = formatTime(updatedAt);

        return (
          <Row className={cx("chapters__container__content")} key={id}>
            <Col sm={1}>
              <span className={cx("id")}>{id}</span>
            </Col>
            <Col sm={4}>
              <span className={cx("name")}>{name}</span>
            </Col>
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
            <Col sm={2} className={cx("actions")}>
              <Button
                outline
                gray
                className={cx("action")}
                title="Chỉnh sửa chương"
                onClick={() => handleUpdateClick(method)}
              >
                <HiOutlinePencil />
              </Button>
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

PaymentMethodTableRow.propTypes = {
  setPopup: PropTypes.func.isRequired,
  paymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      guid: PropTypes.string.isRequired,
    })
  ).isRequired,
  setDeleteItem: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default PaymentMethodTableRow;
