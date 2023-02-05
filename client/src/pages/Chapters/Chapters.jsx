import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "components";
import { NoData, Popup, ProgressCircle } from "features";
import { useDelete, useToast } from "hooks";
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
  const searchText = useSelector((state) => state.global.searchText);
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const defaultChapterApiParams = {
    title_id: titleId,
    _sort: "order",
    _order: "asc",
    _embed: JSON.stringify([
      { collection: "status_id", fields: "-_id status" },
      { collection: "approved_status_id", fields: "-_id status color" },
    ]),
    _fields: "-__v -_guid -cover.cloud_public_id -contents.cloud_public_id",
  };
  const [chapterApiParams, setChapterApiParams] = useState(defaultChapterApiParams);
  const [title, setTitle] = useState({});
  const [chapters, setChapters] = useState([]);
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const hasData = chapters.length > 0;

  const fetchData = (params) => {
    const titlePromise = titleService.getOne(titleId);
    const chapterPromise = chapterService.getAll(params);

    Promise.all([titlePromise, chapterPromise])
      .then(([titleResponse, chaptersResponse]) => {
        setTitle(titleResponse.data);
        setChapters(chaptersResponse.data);
      })
      .catch((error) => console.error(error));
  };

  const {
    deletedItem: titleDeletedItem,
    popup: titlePopup,
    setDeletedItem: setTitleDeletedItem,
    setPopup: setTitlePopup,
  } = useDelete(() => {
    const { _id, _guid } = titleDeletedItem;

    titleService
      .delete(_id, setProgress, { guid: _guid })
      .then((response) => {
        toastEmitter(response.message, "success");
        setProgress(0);
        navigate(-1);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setProgress(0);
      });
  });

  const {
    deletedItem: chapterDeletedItem,
    popup: chapterPopup,
    setDeletedItem: setChapterDeletedItem,
    setPopup: setChapterPopup,
  } = useDelete(() => {
    const { id } = chapterDeletedItem;
    chapterService
      .delete(id, setProgress)
      .then(() => {
        toastEmitter("Truyện đã được xóa thành công", "success");
        fetchData(chapterApiParams);
        setProgress(0);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setProgress(0);
      });
  });

  useEffect(() => {
    fetchData(chapterApiParams);
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      const params = {
        ...chapterApiParams,
        title: searchText,
        title_id: titleId,
      };
      fetchData(params);
      setChapterApiParams(params);
    }
    if (searchText.length === 0 && title?._id) {
      setChapterApiParams(defaultChapterApiParams);
    }
  }, [searchText]);

  return (
    <>
      <Container className={cx("chapters")}>
        <Row className={cx("chapters__header")}>
          <h3>Danh sách chương</h3>
        </Row>
        {Object.keys(title).length !== 0 && (
          <TitlePart title={title} setPopup={setTitlePopup} setDeletedItem={setTitleDeletedItem} />
        )}
        <Row className={cx("chapters__general")}>
          <Col className={cx("chapters__general__total")}>
            Tổng số chương:{" "}
            <span className={cx("chapters__general__total__number")}>{chapters.length}</span>
          </Col>
          {hasData && (
            <Col className={`${cx("chapters__general__box")}`}>
              <BtnCreate />
            </Col>
          )}
        </Row>
        {chapters.length > 0 ? (
          <ChapterTable
            chapters={chapters}
            setPopup={setChapterPopup}
            setDeleteItem={setChapterDeletedItem}
          />
        ) : (
          <NoData>
            <h5>Hiện tại truyện không có chương nào</h5>
            <BtnCreate />
          </NoData>
        )}
      </Container>
      <ProgressCircle percentage={progress} />
      <Popup yesno popup={chapterPopup} setPopup={setChapterPopup} />
      <Popup yesno popup={titlePopup} setPopup={setTitlePopup} />
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...toastOptions} />
    </>
  );
}

export default Chapters;
