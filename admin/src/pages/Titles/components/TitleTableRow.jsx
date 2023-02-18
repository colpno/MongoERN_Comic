import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { HiOutlinePencil } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import { TbList } from "react-icons/tb";

import Button from "components/Button";
import { getAllApprovedStatuses } from "services/approvedStatus";
import { formatTime } from "utils/convertTime";
import styles from "../styles/TitleTableRow.module.scss";

const cx = classNames.bind(styles);

function TitleTableRow({
  data,
  setPopup,
  setDeletedItem,
  setShowForm,
  setUpdate,
}) {
  const { approvedStatuses } = getAllApprovedStatuses();
  const options = approvedStatuses.map((status) => {
    return {
      value: status.guid,
      label: status.name,
    };
  });

  const handleDeleteClick = (guid) => {
    setPopup((prev) => {
      return {
        ...prev,
        trigger: true,
        title: "Xóa tài khoản",
        content: "Bạn có muốn xóa tài khoản?",
      };
    });
    setDeletedItem(guid);
  };

  const handleUpdateClick = (genre) => {
    setShowForm(true);
    setUpdate((prev) => {
      return { ...prev, selected: genre };
    });
  };

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
            <Col xs={1}>
              <span>{id}</span>
            </Col>
            <Col>
              <div className={cx("box-img")}>
                <img src={cover} alt={name} />
              </div>
            </Col>
            <Col xs={2}>
              <Button text to={`/comic/title/${guid}`} className={cx("title")}>
                {name}
              </Button>
            </Col>
            <Col>
              <span className={cx("total-chapter")}>{totalChapter}</span>
            </Col>
            <Col>
              <span className={cx(`approved-status-${approvedStatus.value}`)}>
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
            <Col className="actions" sm={2}>
              <Button
                outline
                gray
                className="action"
                title="Chỉnh sửa truyện"
                onClick={() => handleUpdateClick(title)}
              >
                <HiOutlinePencil />
              </Button>
              <Button
                outline
                gray
                className={cx("action")}
                title="Xóa chương"
                onClick={() => handleDeleteClick(guid)}
              >
                <BsTrash />
              </Button>
              <Button
                outline
                gray
                to={`/title/${guid}`}
                className="action"
                title="Xem truyện"
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

TitleTableRow.propTypes = {
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
  setPopup: PropTypes.func.isRequired,
  setDeletedItem: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default TitleTableRow;
