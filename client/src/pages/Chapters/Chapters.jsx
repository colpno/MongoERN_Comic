import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "components/Button";
import { NoData, Popup, ProgressCircle } from "features";
import { useDelete } from "hooks";
import { deleteChapter, sortChapters } from "services/chapter";
import { deleteTitle, getTitleByID } from "services/title";
import styles from "./assets/styles/Chapters.module.scss";
import ChapterTable from "./components/ChapterTable";
import TitlePart from "./components/TitlePart";

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
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const { title } = getTitleByID(titleId);
  const {
    chapters,
    pagination,
    setPagination,
    sorting,
    refetch: fetchChapters,
  } = sortChapters(titleId, "order", true);
  const hasData = chapters.length > 0;

  const {
    deletedItem: titleDeletedItem,
    popup: titlePopup,
    setDeletedItem: setTitleDeletedItem,
    setPopup: setTitlePopup,
    progress: deleteTitleProgress,
    setProgress: setDeleteTitleProgress,
  } = useDelete(async () => {
    deleteTitle(
      titleDeletedItem.titleId,
      {
        publicId: titleDeletedItem.publicId,
      },
      setDeleteTitleProgress
    ).then((response) => {
      if (response.errno === 1451) {
        setTitlePopup((prev) => ({
          ...prev,
          trigger: false,
          yesno: true,
        }));
        setPopup((prev) => ({
          ...prev,
          trigger: true,
          content: "Không thể xóa do vẫn tồn tại các chương",
        }));
        setDeleteTitleProgress(0);
      }
      if (response.affectedRows > 0) {
        setTitlePopup((prev) => ({
          ...prev,
          trigger: true,
          content: "Xóa thành công",
          yesno: false,
        }));
        setDeleteTitleProgress(0);
        navigate(-1);
      }
    });
  });

  const {
    deletedItem: chapterDeletedItem,
    popup: chapterPopup,
    setDeletedItem: setChapterDeletedItem,
    setPopup: setChapterPopup,
    progress: deleteChapterProgress,
    setProgress: setDeleteChapterProgress,
  } = useDelete(async () => {
    const { guid, titleId: titleID } = chapterDeletedItem;
    const data = { titleId: titleID };
    deleteChapter(guid, data, setDeleteChapterProgress).then((response) => {
      if (response.affectedRows > 0) {
        setChapterPopup((prev) => ({
          ...prev,
          trigger: true,
          content: "Xóa thành công",
          yesno: false,
        }));
        fetchChapters();
        setDeleteChapterProgress(0);
      }
      console.log(response);
    });
  });

  return (
    <>
      <Container className={cx("chapters")}>
        <Row className={cx("chapters__header")}>
          <h3>Danh sách chương</h3>
        </Row>
        {Object.keys(title).length !== 0 && (
          <TitlePart
            title={title}
            setPopup={setTitlePopup}
            setDeletedItem={setTitleDeletedItem}
          />
        )}
        <Row className={cx("chapters__general")}>
          <Col className={cx("chapters__general__box")}>
            <span className={cx("chapters__general__total")}>
              Tổng số chương:{" "}
              <span className={cx("chapters__general__total__number")}>
                {pagination.total}
              </span>
            </span>
          </Col>
          <Col xs={6} sm={4} lg={20} className={cx("chapters__general__box")}>
            {hasData && <BtnCreate />}
          </Col>
        </Row>
        {hasData ? (
          <ChapterTable
            chapters={chapters}
            pagination={pagination}
            setPopup={setChapterPopup}
            setDeleteItem={setChapterDeletedItem}
            setPagination={setPagination}
            sorting={sorting}
          />
        ) : (
          <NoData>
            <h5>Hiện tại truyện chưa có chương nào!</h5>
            <BtnCreate />
          </NoData>
        )}
      </Container>
      <ProgressCircle percentage={deleteChapterProgress} />
      <ProgressCircle percentage={deleteTitleProgress} />
      <Popup
        yesno={chapterPopup.yesno}
        popup={chapterPopup}
        setPopup={setChapterPopup}
      />
      <Popup
        yesno={titlePopup.yesno}
        popup={titlePopup}
        setPopup={setTitlePopup}
      />
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default Chapters;
