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
        const {
          index,
          id,
          coverImage,
          titleName,
          totalChapter,
          titleStatusId,
        } = title;
        const timeObj = formatTime(new Date(2022, 7, 16, 23, 16, 0, 0));

        return (
          <Row key={id} className={cx("my-title__container__content")}>
            <Col sm={1}>
              <span>{index}</span>
            </Col>
            <Col>
              <div className={cx("box-img")}>
                <img src={coverImage} alt={titleName} />
              </div>
            </Col>
            <Col md={3}>
              <Button text to={`/comic/title/${id}`} className={cx("title")}>
                {titleName}
              </Button>
            </Col>
            <Col>
              <span className={cx("total-chapter")}>{totalChapter}</span>
            </Col>
            <Col>
              <span className={cx(`approve-status status-${titleStatusId}`)}>
                {approveStatusString(titleStatusId)}
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
                to={`update/${id}`}
                className="action"
                title="Chỉnh sửa truyện"
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                gray
                to={`${id}`}
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
      index: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      titleName: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.node.isRequired,
            PropTypes.string.isRequired,
          ]).isRequired
        ).isRequired,
      ]).isRequired,
      coverImage: PropTypes.string.isRequired,
      totalChapter: PropTypes.number.isRequired,
      titleStatusId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MyTitleTable;
