import classNames from "classnames/bind";
import { Button } from "components";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { IoTrashSharp } from "react-icons/io5";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/FollowTable.module.scss";

const cx = classNames.bind(styles);

function FollowTable({ setDeletedItem, popup, setPopup, titles }) {
  const handleClick = (followId) => {
    setPopup({
      ...popup,
      trigger: true,
      title: "Xóa mục yêu thích",
      content: "Bạn có muốn xóa yêu thích?",
    });
    setDeletedItem(followId);
  };

  return (
    <>
      {titles.map((title) => {
        const timeObj = formatTime(title.updatedAt);

        return (
          <Row className={cx("follow__container__content")} key={title.guid}>
            <Col
              md={8}
              className={cx("follow__container__content__title-info")}
            >
              <div className={cx("box-img")}>
                <img
                  src={title.cover}
                  alt={title.name}
                  className={cx("cover-image")}
                />
              </div>
              <div>
                <p className={cx("title")}>{title.name}</p>
                <p className={cx("author")}>{title.author}</p>
              </div>
            </Col>
            <Col className="center">
              <span>{`${timeObj.day}.${timeObj.month}.${timeObj.year}`}</span>
            </Col>
            <Col className="center">
              <Button
                wrapper
                className={cx("trash-can-button")}
                onClick={() => handleClick(title.followId)}
              >
                <IoTrashSharp />
              </Button>
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
      cover: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
  setDeletedItem: PropTypes.func.isRequired,
};

export default FollowTable;
