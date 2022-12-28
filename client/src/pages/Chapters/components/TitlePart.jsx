import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";

import { Button } from "components";
import styles from "../styles/TitlePart.module.scss";

const cx = classNames.bind(styles);

function TitlePart({ title, setPopup, setDeletedItem }) {
  const handlePopup = (item) => {
    setPopup((prev) => {
      return {
        ...prev,
        trigger: true,
        title: "Xóa truyện",
        content: "Bạn có muốn xóa truyện?",
      };
    });
    setDeletedItem(item);
  };

  return (
    <Row className={cx("chapters__title")}>
      <Col>
        <Button
          wrapper
          to={`/comic/title/${title._id}`}
          className={cx("chapters__title__box")}
        >
          <div className={cx("box-img")}>
            <img src={title.cover.source} alt="Title's cover " />
          </div>
          <span className={cx("title")}>{title.title}</span>
        </Button>
      </Col>
      <Col
        sm={12}
        md="auto"
        className={cx("chapters__title__box", "button-container")}
      >
        <Button
          outline
          to={`/my-title/update/${title._id}`}
          className={cx("chapters__title-accelerate__button")}
        >
          <HiOutlinePencil />
          Chỉnh sửa
        </Button>
        <Button
          outline
          gray
          className={cx("chapters__title-accelerate__button")}
          onClick={() => handlePopup(title)}
        >
          <BsTrash />
          Xóa truyện
        </Button>
      </Col>
    </Row>
  );
}

TitlePart.propTypes = {
  title: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      source: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
  setDeletedItem: PropTypes.func.isRequired,
};

export default TitlePart;
