import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Button from "components/Button";
import { NoData, Popup, ProgressCircle, Search } from "features";
import { useDelete, usePagination, useToast } from "hooks";
import { deleteChapter, getAllChapters } from "services/chapter";
import { deleteTitle, getTitle } from "services/title";
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
  const CHAPTERS_PER_PAGE = 50;
  const navigate = useNavigate();
  const { titleId } = useParams();
  const searchText = useSelector((state) => state.global.searchText);
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const defaultChapterApiParams = {
    sort: "order",
    order: "asc",
  };
  const [chapterApiParams, setChapterApiParams] = useState(
    defaultChapterApiParams
  );
  const [title, setTitle] = useState({});
  const [chapters, setChapters] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(CHAPTERS_PER_PAGE);
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const [isTableColDescSort, setIsTableColDescSort] = useState(false);
  const hasData = chapters.length > 0;

  const fetchData = (params) => {
    const titlePromise = getTitle(titleId);
    const chapterPromise = getAllChapters(params);

    Promise.all([titlePromise, chapterPromise])
      .then(([titleResponse, chaptersResponse]) => {
        setTitle(titleResponse);
        setChapters(chaptersResponse.data);
        setPaginationTotal(chaptersResponse.pagination.total);
      })
      .catch((error) => console.log(error));
  };

  const handleSortingColumn = (column) => {
    fetchData({
      ...chapterApiParams,
      sort: column,
      order: !isTableColDescSort,
    });
    setIsTableColDescSort((prev) => !prev);
  };

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
          fetchData(chapterApiParams);
          setProgress(0);
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
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
        name: searchText,
        titleId,
      };
      fetchData(params);
      setChapterApiParams(params);
    }
    if (searchText.length === 0 && title?.guid) {
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
        {chapters.length > 0 ? (
          <ChapterTable
            chapters={chapters}
            pagination={pagination}
            setPopup={setChapterPopup}
            setDeleteItem={setChapterDeletedItem}
            setPagination={setPagination}
            sorting={handleSortingColumn}
          />
        ) : (
          <NoData>
            <h5>Không tìm thấy chương phù hợp!</h5>
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
