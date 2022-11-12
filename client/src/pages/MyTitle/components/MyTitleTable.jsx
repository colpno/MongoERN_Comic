import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { TbList } from "react-icons/tb";

import Button from "components/Button";
import { getAllApprovedStatuses } from "services/approvedStatus";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/MyTitleTable.module.scss";

const cx = classNames.bind(styles);

function MyTitleTable({ data }) {
  const { approvedStatuses } = getAllApprovedStatuses();
  const options = approvedStatuses.map((status) => {
    return {
      value: status.guid,
      label: status.name,
    };
  });

  return (
    <>
      {data.map((title) => {
        const { id, guid, cover, name, totalChapter, approvedStatusId } = title;
        const timeObj = formatTime(new Date(2022, 7, 16, 23, 16, 0, 0));
        const approvedStatus =
          options.length > 0 &&
          options.find((option) => option.value === approvedStatusId);

        return (
          <Row key={guid} className={cx("my-title__container__content")}>
            <Col sm={1}>
              <span>{id}</span>
            </Col>
            <Col>
              <div className={cx("box-img")}>
                <img src={cover} alt={name} />
              </div>
            </Col>
            <Col sm={3}>
              <Button text to={`/comic/title/${guid}`} className={cx("title")}>
                {name}
              </Button>
            </Col>
            <Col>
              <span className={cx("total-chapter")}>{totalChapter}</span>
            </Col>
            <Col>
              <span
                className={cx(
                  `approve-approvedStatusIdapprovedStatus-${approvedStatusId}`
                )}
              >
                {approvedStatus.label}
              </span>
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
                gray
                to={`update/${guid}`}
                className="action"
                title="Chỉnh sửa truyện"
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                gray
                to={`${guid}`}
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
      id: PropTypes.number.isRequired,
      guid: PropTypes.string.isRequired,
      name: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.node.isRequired,
            PropTypes.string.isRequired,
          ]).isRequired
        ).isRequired,
      ]).isRequired,
      cover: PropTypes.string.isRequired,
      totalChapter: PropTypes.number.isRequired,
      approvedStatusId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MyTitleTable;
