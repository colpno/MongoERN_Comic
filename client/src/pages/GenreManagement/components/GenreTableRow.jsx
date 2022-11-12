import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";

import Button from "components/Button";
import { formatTime } from "utils/convertTime";
import styles from "../styles/GenreTableRow.module.scss";

const cx = classNames.bind(styles);

function GenreTableRow({
  genres,
  setPopup,
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
      {genres.map((genre) => {
        const { id, guid, name, createdAt, updatedAt } = genre;
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
                onClick={() => handleUpdateClick(genre)}
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

GenreTableRow.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      guid: PropTypes.string.isRequired,
    })
  ).isRequired,
  setPopup: PropTypes.func.isRequired,
  setDeleteItem: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default GenreTableRow;
