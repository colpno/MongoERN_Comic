/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import followApi from "api/followApi";
import { FloatingContainer } from "components";
import { NoData, Pagination, Popup } from "features";
import { useToast } from "hooks";
import styles from "pages/Title/assets/styles/Title.module.scss";
import { sortChapters } from "services/chapter";
import { getAllGenres } from "services/genre";
import { getTitleByID } from "services/title";
import { searchTitleGenre } from "services/titleGenre";
import { ComicChapters, Introduction, TitleAbout } from "./components";

const cx = classNames.bind(styles);

function Title() {
  const user = useSelector((state) => state.user.user);
  const { titleId } = useParams();
  const { title } = getTitleByID(titleId);
  const { genres } = getAllGenres();
  const { Toast, options, toastEmitter } = useToast();
  const { titleGenres } = searchTitleGenre("titleId", titleId);
  const [isDESCSorting, setIsDESCSorting] = useState(false);
  const { chapters, pagination, setPagination, sorting } = sortChapters(
    titleId,
    "order",
    true
  );
  const hasTitle = Object.keys(title).length > 0;
  const haveChapters = chapters.length > 0;

  const [popup, setPopup] = useState({
    trigger: false,
    title: "",
    content: "",
  });

  const handleSort = () => {
    setIsDESCSorting(!isDESCSorting);
  };

  const handleFollow = (titleID) => {
    followApi
      .add({ titleId: titleID })
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

  return (
    <>
      <main className={cx("title-page")}>
        <div className={cx("title-page__wrapper")}>
          <Container fluid="md">
            {hasTitle && (
              <FloatingContainer>
                <Introduction
                  title={title}
                  genres={convertGenreIdToString()}
                  firstChapter={chapters.length > 0 ? chapters[0].guid : "#"}
                  setPopup={setPopup}
                  handleFollow={handleFollow}
                />
              </FloatingContainer>
            )}
          </Container>
          <Container fluid="md" className={cx("title-page__wrapper__content")}>
            <FloatingContainer>
              {hasTitle && (
                <TitleAbout title={title} user={user} setPopup={setPopup} />
              )}
              <div className={cx("chapters")}>
                {hasTitle && haveChapters ? (
                  <ComicChapters
                    title={title}
                    chapters={chapters}
                    user={user}
                    sorting={sorting}
                    isDESCSorting={isDESCSorting}
                    handleSort={handleSort}
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
            </FloatingContainer>
          </Container>
        </div>
      </main>
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...options} />
    </>
  );
}

export default Title;
