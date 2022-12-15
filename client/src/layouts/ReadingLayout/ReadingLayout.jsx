import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Footer from "layouts/components/Footer";
import {
  setChapterImages as setChapterImagesStore,
  setChapterInfo as setChapterInfoStore,
  setChapters as setChaptersStore,
  setUserLike as setUserLikeStore,
} from "libs/redux/slices/readingChapterSlice";
import {
  getAllChapters,
  getChapter,
  updateChapterView,
} from "services/chapter";
import { getAllChapterImages } from "services/chapterImage";
import { addReadingHistory } from "services/readingHistory";
import { getAllUserLike } from "services/userLike";
import ReadingHeader from "./components/ReadingHeader";

function ReadingLayout({ children }) {
  const dispatch = useDispatch();
  const { chapterId, titleId } = useParams();
  const userObject = useSelector((state) => state.user);
  const { user, isLoggingIn } = userObject;
  const [chapter, setChapter] = useState({});
  const [chapters, setChapters] = useState([]);
  const [chapterContents, setChapterContents] = useState([]);
  const [userLike, setUserLike] = useState({});

  const fetchData = () => {
    const chapterPromise = getChapter(chapterId, false);
    const chaptersPromise = getAllChapters(
      {
        titleId,
        sort: "order",
        order: "asc",
      },
      false
    );
    const chapterImagesPromise = getAllChapterImages({ chapterId });
    const userLikePromise = getAllUserLike({
      userId: user.guid,
      chapterId,
    });

    Promise.all([
      chapterPromise,
      chaptersPromise,
      chapterImagesPromise,
      userLikePromise,
    ])
      .then(
        ([
          chapterResponse,
          chaptersResponse,
          chapterImagesResponse,
          userLikeResponse,
        ]) => {
          setChapter(chapterResponse);
          setChapters(chaptersResponse);
          setChapterContents(chapterImagesResponse);
          setUserLike(userLikeResponse);
        }
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    chapter?.guid && dispatch(setChapterInfoStore(chapter));
  }, [chapter]);

  useEffect(() => {
    chapterContents.length > 0 &&
      dispatch(setChapterImagesStore(chapterContents));
  }, [chapterContents]);

  useEffect(() => {
    userLike?.guid && dispatch(setUserLikeStore(userLike));
  }, [userLike]);

  useEffect(() => {
    chapters.length > 0 && dispatch(setChaptersStore(chapters));
  }, [chapters]);

  useEffect(() => {
    setTimeout(() => {
      updateChapterView(chapterId);
      isLoggingIn && addReadingHistory(titleId, chapterId, user.guid);
    }, 60 * 1000);
  }, []);

  return (
    <>
      <ReadingHeader />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
}

ReadingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReadingLayout;
