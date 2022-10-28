import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation, useParams } from "react-router-dom";

import Button from "components/Button";
import { approveStatusString } from "database";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/ChaptersTableRow.module.scss";

const cx = classNames.bind(styles);

function ChaptersTableRow({ popup, setPopup, chapters }) {
  const { titleId } = useParams();
  const pathName = useLocation().pathname;
  const handlePopup = () => {
    setPopup({
      ...popup,
      trigger: true,
      title: "Xóa chương",
      content: "Bạn có muốn xóa chương?",
    });
  };

  return (
    <>
      {chapters.map((chapter) => {
        const createdTime = formatTime(chapter.createdAt);
        const updatedTime = formatTime(chapter.updatedAt);
        const scheduleTime = formatTime(chapter.schedule);
        return (
          <Row
            className={cx("chapters__container__content")}
            key={chapter.order}
          >
            <Col sm={1}>
              <span className={cx("order")}>{chapter.order}</span>
            </Col>
            <Col>
              <img
                className={cx("coverImage")}
                src={chapter.coverImage}
                alt={chapter.titleName}
              />
            </Col>
            <Col>
              <Button
                text
                to={`/comic/title/${titleId}/${chapter.order}`}
                className={cx("title")}
              >
                {chapter.titleName}
              </Button>
            </Col>
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
            <Col>
              <span className={cx("schedule")}>
                {`${scheduleTime.day}.${scheduleTime.month}.${scheduleTime.year}`}
              </span>
            </Col>
            <Col>
              <span className={cx("approve-status")}>
                {approveStatusString(chapter.statusId)}
              </span>
            </Col>
            <Col className={cx("actions")}>
              <Button
                outline
                gray
                to={`${pathName}/update/${chapter.id}`}
                className={cx("action")}
                title="Chỉnh sửa chương"
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                gray
                className={cx("action")}
                title="Xóa chương"
                onClick={handlePopup}
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

ChaptersTableRow.propTypes = {
  popup: PropTypes.shape({
    trigger: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  setPopup: PropTypes.func.isRequired,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
      order: PropTypes.number.isRequired,
      coverImage: PropTypes.string.isRequired,
      titleName: PropTypes.string.isRequired,
      statusId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChaptersTableRow;
