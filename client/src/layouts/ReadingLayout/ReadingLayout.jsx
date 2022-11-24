import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Footer from "layouts/components/Footer";
import {
  setChapterImages,
  setChapterInfo,
  setChapters,
  setUserLike,
} from "libs/redux/slices/readingChapterSlice";
import {
  getChapterByID,
  sortChapters,
  updateChapterView,
} from "services/chapter";
import { getAllChapterImagesByChapterID } from "services/chapterImage";
import { addReadingHistory } from "services/readingHistory";
import { getUserLike } from "services/userLike";
import ReadingHeader from "./components/ReadingHeader";

function ReadingLayout({ children }) {
  const dispatch = useDispatch();
  const { chapterId, titleId } = useParams();
  const { chapter } = getChapterByID(chapterId, titleId, false);
  const { chapters } = sortChapters(titleId, "order", true);
  const { chapterImages } = getAllChapterImagesByChapterID(chapterId);
  const user = useSelector((state) => state.user.user);
  const { userLike } = getUserLike(user.guid, chapterId);

  useEffect(() => {
    chapter?.guid && dispatch(setChapterInfo(chapter));
  }, [chapter]);

  useEffect(() => {
    chapterImages.length > 0 && dispatch(setChapterImages(chapterImages));
  }, [chapterImages]);

  useEffect(() => {
    userLike?.guid && dispatch(setUserLike(userLike));
  }, [userLike]);

  useEffect(() => {
    chapters.length > 0 && dispatch(setChapters(chapters));
  }, [chapters]);

  useEffect(() => {
    setTimeout(() => {
      updateChapterView(chapterId);
      addReadingHistory(titleId, chapterId, user.guid);
    }, 5 * 1000);
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
