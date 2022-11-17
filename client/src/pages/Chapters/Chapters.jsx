import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "components/Button";
import { NoData, Popup, ProgressCircle, Search } from "features";
import { useDelete, useToast } from "hooks";
import { deleteChapter, filterChapters, sortChapters } from "services/chapter";
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
  const searchText = useSelector((state) => state.global.searchText);
  const { titleId } = useParams();
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const { title } = getTitleByID(titleId, {}, true);
  const {
    chapters,
    setChapters,
    pagination,
    setPagination,
    sorting,
    refetch: fetchChapters,
  } = sortChapters(titleId, "order", true);
  const { chapters: filteredChapters, fetch: fetchFilterChapters } =
    filterChapters(null, pagination.limit);
  const hasData = chapters.length > 0;

  const {
    deletedItem: titleDeletedItem,
    popup: titlePopup,
    setDeletedItem: setTitleDeletedItem,
    setPopup: setTitlePopup,
  } = useDelete(async () => {
    deleteTitle(
      titleDeletedItem.titleId,
      {
        publicId: titleDeletedItem.publicId,
      },
      setProgress
    )
      .then((response) => {
        if (response.errno === 1451) {
          setTitlePopup((prev) => ({
            ...prev,
            trigger: false,
            yesno: true,
          }));
          toastEmitter("Không thể xóa do vẫn tồn tại các chương", "error");
          setProgress(0);
        }
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được xóa thành công", "success");
          setProgress(0);
          navigate(-1);
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  const {
    deletedItem: chapterDeletedItem,
    popup: chapterPopup,
    setDeletedItem: setChapterDeletedItem,
    setPopup: setChapterPopup,
  } = useDelete(async () => {
    const { guid, titleId: titleID } = chapterDeletedItem;
    const data = { titleId: titleID };
    deleteChapter(guid, data, setProgress)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Truyện đã được xóa thành công", "success");
          fetchChapters();
          setProgress(0);
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  useEffect(() => {
    if (searchText.length > 0) {
      const property = {
        name: searchText,
        titleId,
      };
      fetchFilterChapters(property);
    }
    if (searchText.length === 0) fetchChapters();
  }, [searchText]);

  useEffect(() => {
    setChapters(filteredChapters);
  }, [filteredChapters]);

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
          <Col>
            <Search />
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
      <ProgressCircle percentage={progress} />
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
      <Toast {...toastOptions} />
    </>
  );
}

export default Chapters;
