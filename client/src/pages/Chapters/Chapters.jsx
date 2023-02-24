import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "components";
import { Popup, ProgressCircle } from "features";
import { usePopup, useToast } from "hooks";
import { chapterService, titleService } from "services";
import { handlePromiseAllSettled } from "utils";
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
  const [popup, setPopup, triggerPopup] = usePopup({
    isShown: false,
    title: "Thông báo",
  });

  const handleDeleteTitle = (id) => {
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

  const handleDeleteChapter = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    const handleDelete = () => {
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
          toastEmitter(error, "error");
          setProgress(0);
        });
    };

    setPopup({
      title: "Xóa chương",
      content: "Bạn có muốn xóa chương không?",
      type: "confirm",
      isShown: true,
      onConfirm: handleDelete,
    });
  };

  useEffect(() => {
    (async () => {
      const chapterParams = {
        title_id: titleId,
        _sort: "order",
        _order: "asc",
        _embed: JSON.stringify([
          { collection: "status_id", fields: "-_id status" },
          { collection: "approved_status_id", fields: "-_id status color" },
        ]),
        _fields: "-__v -_guid -cover.cloud_public_id -contents.cloud_public_id",
      };

      const titlePromise = titleService.getOne(titleId);
      const chapterPromise = chapterService.getAll(chapterParams);
      const promises = [titlePromise, chapterPromise];

      const result = await Promise.allSettled(promises);
      const { fulfilledResults } = handlePromiseAllSettled(result, toastEmitter);
      const [titleResult, chapterResult] = fulfilledResults;

      titleResult && setTitle(titleResult.data);
      chapterResult && setChapters(chapterResult.data);
    })();
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
