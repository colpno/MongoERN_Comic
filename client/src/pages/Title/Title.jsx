import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { NoData, Pagination, Popup, Recommend } from "features";
import { usePagination, useToast } from "hooks";
import { chapterService, followService, titleService } from "services";
import { ComicChapters, Introduction, TitleAbout } from "./components";
import styles from "./styles/Title.module.scss";

const cx = classNames.bind(styles);

function Title() {
  const CHAPTERS_PER_PAGE = 50;
  const { titleId } = useParams();
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState({});
  const [chapters, setChapters] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(CHAPTERS_PER_PAGE);
  const { Toast, options, toastEmitter } = useToast();
  const [isDESCSorting, setIsDESCSorting] = useState(false);
  const hasTitle = Object.keys(title).length > 0;
  const haveChapters = chapters.length > 0;
  const [popup, setPopup] = useState({
    trigger: false,
    title: "",
    content: "",
  });
  const backgroundImageCSS = hasTitle && {
    backgroundImage: `url(${title.cover.source})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 360px",
    filter: "blur(4px)",
    height: "360px",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
  };

  const fetchData = () => {
    const chapterApiParams = {
      title_id: titleId,
      _sort: "order",
      _order: isDESCSorting ? "desc" : "asc",
      _page: pagination.page,
      _limit: pagination.limit,
    };

    const titlePromise = titleService.getOne(titleId, false);
    const chaptersPromise = chapterService.getAll(chapterApiParams, false);

    Promise.all([titlePromise, chaptersPromise])
      .then(([titleResponse, chapterResponse]) => {
        setTitle(titleResponse.data);
        setChapters(chapterResponse.data);
        setPaginationTotal(chapterResponse.paginate.total);
      })
      .catch((error) => console.error(error));
  };

  const handleSorting = () => {
    setIsDESCSorting(!isDESCSorting);
  };

  const handleFollow = (titleID) => {
    followService
      .add(titleID)
      .then(() => {
        toastEmitter(`Bạn đã theo dõi truyện ${title.name}`, "success");
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });
  };

  useEffect(() => {
    fetchData();
  }, [titleId]);

  return (
    <>
      <main className={cx("title-page")}>
        {hasTitle && (
          <div style={backgroundImageCSS} className={cx("background-image")} />
        )}
        <div className={cx("title-page__wrapper")}>
          {hasTitle && (
            <Introduction
              title={title}
              firstChapter={chapters.length > 0 ? chapters[0]._id : "#"}
              setPopup={setPopup}
              handleFollow={handleFollow}
            />
          )}
          <Container fluid="md" className={cx("title-page__wrapper__content")}>
            {hasTitle && (
              <TitleAbout title={title} user={user} setPopup={setPopup} />
            )}
            <div className={cx("chapters")}>
              {hasTitle && haveChapters ? (
                <ComicChapters
                  title={title}
                  chapters={chapters}
                  user={user}
                  isDESCSorting={isDESCSorting}
                  handleSorting={handleSorting}
                />
              ) : (
                <NoData>
                  <h6>Không có chương nào để hiển thị!</h6>
                </NoData>
              )}
              {haveChapters && (
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
                />
              )}
            </div>
          </Container>
          {/* TODO: random title */}
          <Recommend />
        </div>
      </main>
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...options} />
    </>
  );
}

export default Title;
