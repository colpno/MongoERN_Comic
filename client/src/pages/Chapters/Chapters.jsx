import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "components";
import { Popup } from "features";
import { useDeleteChapter, useDeleteTitle, useGetChapters, useGetTitle, usePopup } from "hooks";
import ChapterTable from "./components/ChapterTable";
import TitlePart from "./components/TitlePart";
import styles from "./styles/Chapters.module.scss";

const cx = classNames.bind(styles);

function BtnCreate() {
  return (
    <Button primary to="create" className={cx("chapters__button")}>
      <AiOutlinePlus />
      Thêm chương
    </Button>
  );
}

function Chapters() {
  const navigate = useNavigate();
  const { titleId } = useParams();
  const { popup, setPopup, triggerPopup } = usePopup();
  const { del: deleteTitle } = useDeleteTitle();
  const { del: deleteChapter } = useDeleteChapter();
  const { data: title = [] } = useGetTitle({ params: { _id: titleId } });
  const { data: chapters = [] } = useGetChapters({
    params: {
      title_id: titleId,
      _embed: JSON.stringify([{ collection: "status_id", fields: "-_id status" }]),
      _fields: "-__v -_guid -cover.cloud_public_id -contents.cloud_public_id",
    },
  });

  const handleDeleteTitle = (id) => {
    if (chapters.length > 0) {
      setPopup({
        isTriggered: true,
        title: "Thông báo",
        content: "Không thể xóa vì chương vẫn còn tồn tại.",
      });
      return;
    }

    setPopup({
      title: "Xóa truyện",
      content: "Bạn có muốn xóa truyện?",
      variation: "confirm",
      isTriggered: true,
      onConfirm: () => {
        deleteTitle({ id }).then(() => navigate(-1));
      },
    });
  };

  const handleDeleteChapter = (data, setRowErrorId) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    deleteChapter(params).catch(() => {
      setRowErrorId(ids);
    });
  };

  return (
    <>
      <Container className={cx("chapters")}>
        <Row className={cx("chapters__header")}>
          <h3>Danh sách chương</h3>
        </Row>
        {Object.keys(title).length !== 0 && (
          <TitlePart title={title} onDelete={handleDeleteTitle} />
        )}
        <Row className={cx("chapters__general")}>
          <Col className={cx("chapters__general__total")}>
            Tổng số chương:{" "}
            <span className={cx("chapters__general__total__number")}>{chapters.length}</span>
          </Col>
          <Col className={`${cx("chapters__general__box")}`}>
            <BtnCreate />
          </Col>
        </Row>
        <ChapterTable chapters={chapters} onDelete={handleDeleteChapter} />
      </Container>
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default Chapters;
