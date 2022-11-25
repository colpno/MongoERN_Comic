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
    setTitleID,
    pagination,
    setPagination,
    sorting,
    refetch: fetchChapters,
  } = sortChapters(null, "order", true);
  const {
    chapters: filteredChapters,
    setChapters: setFilteredChapters,
    pagination: filteredChapterPagination,
    setPagination: setFilteredChapterPagination,
    fetch: fetchFilterChapters,
  } = filterChapters(null, pagination.limit);
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
            // yesno: true,
          }));
          toastEmitter("Không thể xóa do các chương vẫn tồn tại", "error");
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
    if (searchText.length === 0 && title?.guid) setFilteredChapters([]);
  }, [searchText]);

  useEffect(() => {
    Object.keys(title).length > 0 && setTitleID(title.guid);
  }, [title]);

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
          <Col xs={12} md="auto" className={cx("chapters__general__box")}>
            <span className={cx("chapters__general__total")}>
              Tổng số chương:{" "}
              <span className={cx("chapters__general__total__number")}>
                {pagination.total}
              </span>
            </span>
          </Col>
          {hasData && (
            <>
              <Col
                xs={6}
                md={4}
                lg={4}
                className={`${cx("chapters__general__box")} right`}
              >
                <Search />
              </Col>
              <Col
                xs={6}
                md={3}
                lg={3}
                className={`${cx("chapters__general__box")} right`}
              >
                <BtnCreate />
              </Col>{" "}
            </>
          )}
        </Row>
        {filteredChapters.length > 0 && (
          <ChapterTable
            chapters={filteredChapters}
            pagination={filteredChapterPagination}
            setPopup={setChapterPopup}
            setDeleteItem={setChapterDeletedItem}
            setPagination={setFilteredChapterPagination}
            sorting={sorting}
          />
        )}
        {searchText.length > 0 && filteredChapters.length === 0 && (
          <NoData>
            <h5>Không tìm thấy chương phù hợp!</h5>
          </NoData>
        )}
        {hasData &&
          searchText.length === 0 &&
          filteredChapters.length === 0 && (
            <ChapterTable
              chapters={chapters}
              pagination={pagination}
              setPopup={setChapterPopup}
              setDeleteItem={setChapterDeletedItem}
              setPagination={setPagination}
              sorting={sorting}
            />
          )}
        {!hasData && searchText.length === 0 && filteredChapters.length === 0 && (
          <NoData>
            <h5>Hiện tại truyện chưa có chương nào!</h5>
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
