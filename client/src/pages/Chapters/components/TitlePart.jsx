import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";

import Button from "components/Button";
import styles from "../assets/styles/TitlePart.module.scss";

const cx = classNames.bind(styles);

function TitlePart({ title, setPopup, setDeletedItem }) {
  const handlePopup = (titleId, publicId) => {
    setPopup((prev) => {
      return {
        ...prev,
        trigger: true,
        title: "Xóa truyện",
        content: "Bạn có muốn xóa truyện?",
      };
    });
    setDeletedItem({ titleId, publicId });
  };

  return (
    <Row className={cx("chapters__title")}>
      <Col>
        <Button
          wrapper
          to={`/comic/title/${title.guid}`}
          className={cx("chapters__title__box")}
        >
          <div className={cx("box-img")}>
            <img src={title.cover} alt="Title's cover " />
          </div>
          <span className={cx("title")}>{title.name}</span>
        </Button>
      </Col>
      <Col md="auto" className={cx("chapters__title__box")}>
        <Button
          outline
          to={`/my-title/update/${title.guid}`}
          className={cx("chapters__title-accelerate__button")}
        >
          <HiOutlinePencil />
          Chỉnh sửa
        </Button>
        <Button
          outline
          gray
          className={cx("chapters__title-accelerate__button")}
          onClick={() => handlePopup(title.guid, title.publicId)}
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
    guid: PropTypes.string.isRequired,
    publicId: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
  setDeletedItem: PropTypes.func.isRequired,
};

export default TitlePart;
