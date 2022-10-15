import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import chapterApi from "api/chapterApi";
import genreApi from "api/genreApi";
import { Fullsize } from "assets/images";
import { UserArray } from "database";
import Pagination from "features/Pagination";
import Popup from "features/Popup";
import Recommend from "features/Recommend";
import styles from "pages/Title/assets/styles/Title.module.scss";
import { getTitleByID } from "services/titleServices";
import { ComicChapters, Introduction, TitleAbout } from "./components";

const cx = classNames.bind(styles);

function Title() {
  const { titleId } = useParams();
  const { title } = getTitleByID(titleId);
  const user = UserArray()[0];
  const [genres, setGenres] = useState("");
  const [chapters, setChapters] = useState([]);
  const [isDESCSorting, setIsDESCSorting] = useState(false);
  const hasData = Object.keys(title).length > 0;

  const [popup, setPopup] = useState({
    trigger: false,
    title: "",
    content: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
  });
  const backgroundImageCSS = {
    backgroundImage: `url(${Fullsize})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 360px",
    filter: "blur(4px)",
    height: "360px",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await genreApi.getAll();
        const genreString = title?.genreId?.reduce((str, id, index) => {
          const genre = response.find((res) => res.id === id);
          return index === 0
            ? `${str}${genre.genre}`
            : `${str}, ${genre.genre}`;
        }, "");
        setGenres(genreString);
      } catch (error) {
        throw new Error(error);
      }
    };

    Object.keys(title).length > 0 && fetchGenres();
  }, [title]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await chapterApi.sort(
          titleId,
          {
            key: "order",
            order: isDESCSorting ? "desc" : "asc",
          },
          { _limit: pagination.limit, _page: pagination.page }
        );
        setChapters(response.data);
        setPagination({ ...pagination, total: response.pagination.total });
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChapters();
  }, [pagination.page, isDESCSorting]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleSort = () => {
    setIsDESCSorting(!isDESCSorting);
  };

  return (
    <main className={cx("title-page")}>
      {hasData && (
        <>
          <div style={backgroundImageCSS} />
          <div className={cx("title-page__wrapper")}>
            <Introduction title={title} genres={genres} setPopup={setPopup} />
            <Container className={cx("title-page__wrapper__content")}>
              <TitleAbout title={title} setPopup={setPopup} />
              <div className={cx("title-page__wrapper__content__chapters")}>
                <ComicChapters
                  title={title}
                  chapters={chapters}
                  user={user}
                  isDESCSorting={isDESCSorting}
                  handleSort={handleSort}
                />
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </Container>
            {/* TODO: random title */}
            <Recommend />
          </div>
          <Popup popup={popup} setPopup={setPopup} />
        </>
      )}
    </main>
  );
}

export default Title;
