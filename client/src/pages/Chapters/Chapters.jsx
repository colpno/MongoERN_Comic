import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "components";
import { Popup, ProgressCircle } from "features";
import { usePopup, useToast } from "hooks";
import { chapterService, titleService } from "services";
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
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [title, setTitle] = useState({});
  const [chapters, setChapters] = useState([]);
  const { popup, setPopup, triggerPopup } = usePopup();

  const handleDeleteTitle = (id) => {
    if (chapters.length > 0) {
      setPopup({
        isShown: true,
        title: "Thông báo",
        content: "Không thể xóa vì chương vẫn còn tồn tại.",
      });
      return;
    }

    const handleDelete = () => {
      titleService
        .delete(id, {}, setProgress)
        .then(() => {
          setProgress(0);
          navigate(-1);
        })
        .catch((error) => {
          toastEmitter(error, "error");
          setProgress(0);
        });
    };

    setPopup({
      title: "Xóa truyện",
      content: "Bạn có muốn xóa truyện?",
      type: "confirm",
      isShown: true,
      onConfirm: handleDelete,
    });
  };

  const handleDeleteChapter = (data, setRowErrorId) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    chapterService
      .delete(params, setProgress)
      .then((response) => {
        setChapters((prev) =>
          prev.filter((item) => (Array.isArray(ids) ? !ids.includes(item._id) : ids !== item._id))
        );
        toastEmitter(response.message);
        setProgress(0);
      })
      .catch((error) => {
        setRowErrorId(ids);
        toastEmitter(error, "error");
        setProgress(0);
      });
  };

  useEffect(() => {
    titleService
      .getOne({ _id: titleId })
      .then(async (titleResult) => {
        const chapterParams = {
          title_id: titleId,
          _embed: JSON.stringify([{ collection: "status_id", fields: "-_id status" }]),
          _fields: "-__v -_guid -cover.cloud_public_id -contents.cloud_public_id",
        };

        chapterService
          .getAll(chapterParams)
          .then((chapterResult) => {
            titleResult && setTitle(titleResult.data);
            chapterResult && setChapters(chapterResult.data);
          })
          .catch((error) => toastEmitter(error, "error"));
      })
      .catch((error) => toastEmitter(error, "error"));
  }, []);

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
      <ProgressCircle percentage={progress} />
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
    </>
  );
}

export default Chapters;
