import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { IoTrashSharp } from "react-icons/io5";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/FollowTable.module.scss";

const cx = classNames.bind(styles);

function FollowTable({ popup, setPopup, titles }) {
  const handlePopup = () => {
    setPopup({
      ...popup,
      trigger: true,
      title: "Xóa mục yêu thích",
      content: "Bạn có muốn xóa yêu thích?",
    });
  };

  return (
    <>
      {titles.map((title) => {
        const timeObj = formatTime(title.updatedAt);
        return (
          <Row className={cx("follow__container__content")} key={title.id}>
            <Col
              md={8}
              className={cx("follow__container__content__title-info")}
            >
              <div className={cx("box-img")}>
                <img
                  src={title.coverImage}
                  alt={title.titleName}
                  className={cx("cover-image")}
                />
              </div>
              <div>
                <p className={cx("title")}>{title.titleName}</p>
                <p className={cx("authors")}>{title.authors}</p>
              </div>
            </Col>
            <Col className="center">
              <span>{`${timeObj.day}.${timeObj.month}.${timeObj.year}`}</span>
            </Col>
            <Col className="center">
              <button type="button" className={cx("trash-can-button")}>
                <IoTrashSharp onClick={handlePopup} />
              </button>
            </Col>
          </Row>
        );
      })}
    </>
  );
}

FollowTable.propTypes = {
  popup: PropTypes.shape({
    trigger: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      updatedAt: PropTypes.string.isRequired,
      coverImage: PropTypes.string.isRequired,
      titleName: PropTypes.string.isRequired,
      authors: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FollowTable;
