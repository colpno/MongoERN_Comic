import classNames from "classnames/bind";
import Button from "components/Button";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import styles from "../assets/styles/TitlePart.module.scss";

const cx = classNames.bind(styles);

function TitlePart({ title, popup, setPopup }) {
  const handlePopup = () => {
    setPopup({
      ...popup,
      trigger: true,
      title: "Xóa truyện",
      content: "Bạn có muốn xóa truyện?",
    });
  };

  return (
    <Row className={cx("chapters__title")}>
      <Col>
        <Button
          wrapper
          to={`/comic/title/${title.id}`}
          className={cx("chapters__title__box")}
        >
          <div className={cx("box-img")}>
            <img src={title.coverImage} alt="Title's cover " />
          </div>
          <span className={cx("title")}>{title.titleName}</span>
        </Button>
      </Col>
      <Col md="auto" className={cx("chapters__title__box")}>
        <Button
          outline
          to={`/my-title/update/${title.id}`}
          className={cx("chapters__title-accelerate__button")}
        >
          <HiOutlinePencil />
          Chỉnh sửa
        </Button>
        <Button
          outline
          gray
          className={cx("chapters__title-accelerate__button")}
          onClick={handlePopup}
        >
          <BsTrash />
          Xóa truyện
        </Button>
      </Col>
    </Row>
  );
}

TitlePart.propTypes = {
  popup: PropTypes.shape({
    trigger: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
  title: PropTypes.shape({
    id: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    titleName: PropTypes.string.isRequired,
  }).isRequired,
};

export default TitlePart;
