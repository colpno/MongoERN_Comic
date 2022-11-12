import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Footer from "layouts/components/Footer";
import { setChapter, setChapters } from "libs/redux/slices/chapterSlice";
import { getChapterByID, sortChapters } from "services/chapter";
import { getAllChapterImagesByChapterID } from "services/chapterImage";
import ReadingHeader from "./components/ReadingHeader";

function ReadingLayout({ children }) {
  const dispatch = useDispatch();
  const { chapterId, titleId } = useParams();
  const { chapter } = getChapterByID(chapterId, titleId);
  const { chapters } = sortChapters(titleId, "order", true);
  const { chapterImages } = getAllChapterImagesByChapterID(chapterId);

  useEffect(() => {
    dispatch(setChapter({ info: chapter, images: chapterImages }));
  }, [chapter, chapterImages]);

  useEffect(() => {
    dispatch(setChapters(chapters));
  }, [chapters]);

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
