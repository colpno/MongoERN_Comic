import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { useParams } from "react-router-dom";

import Button from "components/Button";
import { getAllApprovedStatuses } from "services/approvedStatus";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/ChaptersTableRow.module.scss";

const cx = classNames.bind(styles);

function ChaptersTableRow({ setPopup, setDeleteItem, chapters }) {
  const { titleId } = useParams();
  const [approvedStatuses, setApprovedStatuses] = useState([]);
  const options = approvedStatuses.map((status) => {
    return {
      value: status.guid,
      label: status.name,
    };
  });

  const fetchData = () => {
    getAllApprovedStatuses()
      .then((response) => setApprovedStatuses(response))
      .catch((error) => console.log(error));
  };

  const handleDeleteClick = (guid) => {
    setPopup((prev) => {
      return {
        ...prev,
        trigger: true,
        title: "Xóa tài khoản",
        content: "Bạn có muốn xóa tài khoản?",
        yesno: true,
      };
    });
    setDeleteItem({ guid, titleId });
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
          <Row
            className={cx("chapters__container__content")}
            key={chapter.guid}
          >
            <Col xs={1}>
              <span className={cx("order")}>{chapter.order}</span>
            </Col>
            <Col>
              <img
                className={cx("cover")}
                src={chapter.cover}
                alt={chapter.name}
              />
            </Col>
            <Col xs={3}>
              <Button
                text
                to={`/comic/title/${titleId}/${chapter.guid}`}
                className={cx("title")}
              >
                {chapter.name}
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
              <span
                className={cx(`approved-status-${chapter.approvedStatusId}`)}
              >
                {options.length > 0 &&
                  options.find(
                    (option) => option.value === chapter.approvedStatusId
                  ).label}
              </span>
            </Col>
            <Col className={cx("actions")}>
              <Button
                outline
                gray
                to={`update/${chapter.guid}`}
                className="action"
                title="Chỉnh sửa truyện"
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                gray
                className={cx("action")}
                title="Xóa chương"
                onClick={() => handleDeleteClick(chapter.guid)}
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
      guid: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      approvedStatusId: PropTypes.string.isRequired,
    })
  ).isRequired,
  setPopup: PropTypes.func.isRequired,
  setDeleteItem: PropTypes.func.isRequired,
};

export default ChaptersTableRow;
