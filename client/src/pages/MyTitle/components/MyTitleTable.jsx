import classNames from "classnames/bind";
import Button from "components/Button";
import { approveStatusString } from "database";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { TbList } from "react-icons/tb";
import { formatTime } from "utils/convertTime";
import styles from "../assets/styles/MyTitleTable.module.scss";

const cx = classNames.bind(styles);

function MyTitleTable({ data }) {
  return (
    <>
      {data.map((title) => {
        const timeObj = formatTime(new Date(2022, 7, 16, 23, 16, 0, 0));
        return (
          <Row key={title.id} className={cx("my-title__container__content")}>
            <Col>
              <div className={cx("box-img")}>
                <img src={title.coverImage} alt={title.titleName} />
              </div>
            </Col>
            <Col md={3}>
              <Button
                text
                to={`/comic/title/${title.id}`}
                className={cx("title")}
              >
                {title.titleName}
              </Button>
            </Col>
            <Col>
              <span className={cx("total-chapter")}>{title.totalChapter}</span>
            </Col>
            <Col>
              <span className={cx("approve-status")}>
                {approveStatusString(title.titleStatusId)}
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
                to={`update/${title.id}`}
                className="action"
                title="Chỉnh sửa truyện"
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                gray
                to={`${title.id}`}
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
      titleName: PropTypes.string.isRequired,
      coverImage: PropTypes.string.isRequired,
      totalChapter: PropTypes.number.isRequired,
      titleStatusId: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MyTitleTable;
