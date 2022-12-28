import classNames from "classnames/bind";
import { Button } from "components";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { IoTrashSharp } from "react-icons/io5";
import { formatTime } from "utils/convertTime";
import styles from "../styles/FollowTable.module.scss";

const cx = classNames.bind(styles);

function FollowTable({ setDeletedItem, popup, setPopup, follows }) {
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
      {follows.map((follow) => {
        const { ttl } = follow;
        const timeObj = formatTime(follow.updatedAt);

        return (
          <Row className={cx("follow__container__content")} key={follow._id}>
            <Col
              xs={8}
              className={cx("follow__container__content__title-info")}
            >
              <div className={cx("box-img")}>
                <img
                  src={ttl.cover.source}
                  alt={ttl.name}
                  className={cx("cover-image")}
                />
              </div>
              <div>
                <p className={cx("title")}>{ttl.name}</p>
                <p className={cx("author")}>{ttl.author}</p>
              </div>
            </Col>
            <Col className="center">
              <span>{`${timeObj.day}.${timeObj.month}.${timeObj.year}`}</span>
            </Col>
            <Col className="center">
              <Button
                wrapper
                className={cx("trash-can-button")}
                onClick={() => handleClick(ttl._id)}
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
  follows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      title: PropTypes.shape({
        id: PropTypes.string.isRequired,
        cover: PropTypes.shape({
          source: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
      }),
    }).isRequired
  ).isRequired,
  setDeletedItem: PropTypes.func.isRequired,
};

export default FollowTable;
