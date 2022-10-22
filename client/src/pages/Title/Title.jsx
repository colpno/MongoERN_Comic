import classNames from "classnames/bind";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { Fullsize } from "assets/images";
import { UserArray } from "database";
import { Pagination, Popup, Recommend } from "features";
import styles from "pages/Title/assets/styles/Title.module.scss";
import { sortChapters } from "services/chapter";
import { getAllGenres } from "services/genre";
import { getTitleByID } from "services/title";
import { ComicChapters, Introduction, TitleAbout } from "./components";

const cx = classNames.bind(styles);

function Title() {
  const { titleId } = useParams();
  const { title } = getTitleByID(titleId);
  const { genres } = getAllGenres();
  const user = UserArray()[0];
  const [isDESCSorting, setIsDESCSorting] = useState(false);
  const hasData = Object.keys(title).length > 0;

  const { chapters, pagination, setPagination, sorting } = sortChapters(
    titleId,
    "order",
    true
  );
  const [popup, setPopup] = useState({
    trigger: false,
    title: "",
    content: "",
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

  const handleSort = () => {
    setIsDESCSorting(!isDESCSorting);
  };

  const convertGenreIdToString = () => {
    const genreString = title.genreId.reduce((str, id, index) => {
      const genre = genres.find((res) => res.id === id);
      return index === 0 ? `${str}${genre.genre}` : `${str}, ${genre.genre}`;
    }, "");
    return genreString;
  };

  return (
    <main className={cx("title-page")}>
      {hasData && (
        <>
          <div style={backgroundImageCSS} />
          <div className={cx("title-page__wrapper")}>
            <Introduction
              title={title}
              genres={convertGenreIdToString()}
              setPopup={setPopup}
            />
            <Container className={cx("title-page__wrapper__content")}>
              <TitleAbout title={title} setPopup={setPopup} />
              <div className={cx("title-page__wrapper__content__chapters")}>
                <ComicChapters
                  title={title}
                  chapters={chapters}
                  user={user}
                  sorting={sorting}
                  isDESCSorting={isDESCSorting}
                  handleSort={handleSort}
                />
                <Pagination
                  pagination={pagination}
                  setPagination={setPagination}
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
