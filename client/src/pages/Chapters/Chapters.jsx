/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "components";
import { NoData, Popup, ProgressCircle, Search } from "features";
import { useDelete, usePagination, useToast } from "hooks";
import { chapterService, titleService } from "services";
import styles from "./styles/Chapters.module.scss";
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
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(CHAPTERS_PER_PAGE);
  const defaultChapterApiParams = {
    title_id: titleId,
    _sort: "order",
    _order: "asc",
    _page: pagination.page,
    _limit: pagination.limit,
  };
  const [chapterApiParams, setChapterApiParams] = useState(
    defaultChapterApiParams
  );
  const [title, setTitle] = useState({});
  const [chapters, setChapters] = useState([]);
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
  });
  const [isTableColDescSort, setIsTableColDescSort] = useState(false);
  const hasData = chapters.length > 0;

  const fetchData = (params) => {
    const titlePromise = titleService.getOne(titleId);
    const chapterPromise = chapterService.getAll(params);

    Promise.all([titlePromise, chapterPromise])
      .then(([titleResponse, chaptersResponse]) => {
        setTitle(titleResponse.data);
        setChapters(chaptersResponse.data);
        setPaginationTotal(chaptersResponse.paginate.total);
      })
      .catch((error) => console.error(error));
  };

  const handleSortingColumn = (column) => {
    fetchData({
      ...chapterApiParams,
      _sort: column,
      _order: !isTableColDescSort,
    });
    setIsTableColDescSort((prev) => !prev);
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
