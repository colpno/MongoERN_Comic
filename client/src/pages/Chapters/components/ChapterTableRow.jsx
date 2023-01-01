import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { useParams } from "react-router-dom";

import { Button } from "components";
import { approvedStatusService } from "services";
import { formatTime } from "utils/convertTime";
import styles from "../styles/ChaptersTableRow.module.scss";

const cx = classNames.bind(styles);

function ChaptersTableRow({ setPopup, setDeleteItem, chapters }) {
  const { titleId } = useParams();
  const [approvedStatuses, setApprovedStatuses] = useState([]);

  const options = useMemo(
    () =>
      approvedStatuses.map((status) => {
        return {
          value: status._id,
          label: status.status,
        };
      }),
    [approvedStatuses]
  );

  const fetchData = () => {
    approvedStatusService
      .getAll()
      .then((response) => setApprovedStatuses(response.data))
      .catch((error) => console.error(error));
  };

  const handleDeleteClick = (id) => {
    setPopup((prev) => {
      return {
        ...prev,
        trigger: true,
        title: "Xóa tài khoản",
        content: "Bạn có muốn xóa tài khoản?",
        yesno: true,
      };
    });
    setDeleteItem({ id, titleId });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {chapters.map((chapter) => {
        const createdTime = formatTime(chapter.createdAt);
        const updatedTime = formatTime(chapter.updatedAt);

        return (
          <Row className={cx("chapters__container__content")} key={chapter._id}>
            <Col xs={1}>
              <span className={cx("order")}>{chapter.order}</span>
            </Col>
            <Col>
              <img className={cx("cover")} src={chapter.cover.source} alt={chapter.title} />
            </Col>
            <Col xs={3}>
              <Button text to={`/comic/title/${titleId}/${chapter._id}`} className={cx("title")}>
                {chapter.title}
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
              <span className={cx(`approved-status-${chapter.approved_status_id}`)}>
                {options.length > 0 &&
                  options.find((option) => option.value === chapter.approved_status_id).label}
              </span>
            </Col>
            <Col className={cx("actions")}>
              <Button
                outline
                grey
                to={`update/${chapter._id}`}
                className="action"
                title="Chỉnh sửa truyện"
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                grey
                className={cx("action")}
                title="Xóa chương"
                onClick={() => handleDeleteClick(chapter._id)}
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
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      approved_status_id: PropTypes.string.isRequired,
    })
  ).isRequired,
  setPopup: PropTypes.func.isRequired,
  setDeleteItem: PropTypes.func.isRequired,
};

export default ChaptersTableRow;
