import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  setChapterImages,
  setChapterInfo,
  setChapters,
  setUserLike,
} from "libs/redux/slices/readingChapterSlice";
import { getChapterByID, sortChapters } from "services/chapter";
import { getAllChapterImagesByChapterID } from "services/chapterImage";
import { getUserLike } from "services/userLike";

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

  return <div className="content">{children}</div>;
}

ReadingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReadingLayout;
