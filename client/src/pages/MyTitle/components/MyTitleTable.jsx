import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { TbList } from "react-icons/tb";

import { Button } from "components";
import { approvedStatusService } from "services";
import { formatTime } from "utils/convertTime";
import styles from "../styles/MyTitleTable.module.scss";

const cx = classNames.bind(styles);

function MyTitleTable({ data }) {
  const [approvedStatuses, setApprovedStatuses] = useState([]);
  const options = approvedStatuses.map((status) => {
    return {
      value: status._id,
      label: status.status,
    };
  });

  const getHexColor = (approvedStatusId) => {
    const approvedStatus = approvedStatuses.find((status) => status._id === approvedStatusId);
    return approvedStatus.color.hex;
  };

  const fetchData = () => {
    approvedStatusService
      .getAll()
      .then((response) => {
        setApprovedStatuses(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data.map((title, index) => {
        const timeObj = formatTime(new Date(2022, 7, 16, 23, 16, 0, 0));
        const approvedStatus =
          options.length > 0 && options.find((option) => option.value === title.approved_status_id);

        return (
          <Row key={title._id} className={cx("my-title__container__content")}>
            <Col xs={1}>
              <span>{index}</span>
            </Col>
            <Col>
              <div className={cx("box-img")}>
                <img src={title.cover.source} alt={title.title} />
              </div>
            </Col>
            <Col xs={3}>
              <Button text to={`/comic/title/${title._id}`} className={cx("title")}>
                {title.title}
              </Button>
            </Col>
            <Col>
              <span className={cx("total-chapter")}>{title.total_chapter}</span>
            </Col>
            <Col>
              {approvedStatuses.length > 0 ? (
                <span
                  className={cx("approved-status")}
                  style={{ color: getHexColor(title.approved_status_id) }}
                >
                  {approvedStatus.label}
                </span>
              ) : null}
            </Col>
            <Col>
              <span
                className={cx("posted-time")}
              >{`${timeObj.day}.${timeObj.month}.${timeObj.year}`}</span>
            </Col>
            <Col>
              <span
                className={cx("updated-time")}
              >{`${timeObj.day}.${timeObj.month}.${timeObj.year}`}</span>
            </Col>
            <Col className="actions">
              <Button
                outline
                grey
                to={`update/${title._id}`}
                className="action"
                title="Chỉnh sửa truyện"
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                grey
                to={`${title._id}`}
                className="action"
                title="Xem danh sách chương"
              >
                <TbList />
              </Button>
            </Col>
          </Row>
        );
      })}
    </>
  );
}

MyTitleTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.node.isRequired, PropTypes.string.isRequired]).isRequired
        ).isRequired,
      ]).isRequired,
      cover: PropTypes.shape({
        source: PropTypes.string.isRequired,
      }).isRequired,
      total_chapter: PropTypes.number.isRequired,
      approved_status_id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MyTitleTable;
