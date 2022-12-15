import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { NoData, Pagination, Popup, Recommend } from "features";
import { usePagination, useToast } from "hooks";
import styles from "pages/Title/assets/styles/Title.module.scss";
import { getAllChapters } from "services/chapter";
import { addFollow } from "services/follow";
import { getAllGenres } from "services/genre";
import { getTitle } from "services/title";
import { getAllTitleGenres } from "services/titleGenre";
import { ComicChapters, Introduction, TitleAbout } from "./components";

const cx = classNames.bind(styles);

function Title() {
  const CHAPTERS_PER_PAGE = 50;
  const { titleId } = useParams();
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState({});
  const [chapters, setChapters] = useState([]);
  const [genres, setGenres] = useState([]);
  const [titleGenres, setTitleGenres] = useState([]);
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
    backgroundImage: `url(${title.cover})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 360px",
    filter: "blur(4px)",
    height: "360px",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
  };
  const chapterApiParams = {
    titleId,
    sort: "order",
    order: isDESCSorting ? "desc" : "asc",
    page: pagination.page,
    limit: pagination.limit,
  };

  const fetchData = () => {
    const titlePromise = getTitle(titleId, false);
    const genrePromise = getAllGenres();
    const titleGenrePromise = getAllTitleGenres({ titleId });
    const chaptersPromise = getAllChapters(chapterApiParams, false);

    Promise.all([
      titlePromise,
      genrePromise,
      titleGenrePromise,
      chaptersPromise,
    ])
      .then(
        ([
          titleResponse,
          genreResponse,
          titleGenreResponse,
          chapterResponse,
        ]) => {
          setTitle(titleResponse);
          setGenres(genreResponse);
          setTitleGenres(titleGenreResponse);
          setChapters(chapterResponse.data);
          setPaginationTotal(chapterResponse.pagination.total);
        }
      )
      .catch((error) => console.log(error));
  };

  const handleSorting = () => {
    setIsDESCSorting(!isDESCSorting);
  };

  const handleFollow = (titleID) => {
    addFollow({ titleId: titleID })
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter(`Bạn đã theo dõi truyện ${title.name}`, "success");
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error, "error");
      });
  };

  const convertGenreIdToString = () => {
    const genreString = titleGenres.reduce((str, titleGenre, index) => {
      const genre = genres.find((res) => res.guid === titleGenre.genreId);
      return index === 0 ? `${str}${genre.name}` : `${str}, ${genre.name}`;
    }, "");
    return genreString;
  };

  const fetchChapters = async () => {
    const response = await getAllChapters(chapterApiParams, false);
    setChapters(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchChapters();
  }, [isDESCSorting, pagination.page]);

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
              genres={convertGenreIdToString()}
              firstChapter={chapters.length > 0 ? chapters[0].guid : "#"}
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
