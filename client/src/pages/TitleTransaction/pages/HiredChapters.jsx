/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

import { NoData } from "features";
import { useSelector } from "react-redux";
import { getLimitedHiredChaptersByUserID } from "services/hiredChapter";
import HiredChaptersTable from "./components/HiredChaptersTable";

function HiredChapters({ cx, titles }) {
  const user = useSelector((state) => state.user.user);
  const { hiredChapters, pagination, setPagination } =
    getLimitedHiredChaptersByUserID(user.id, 30);
  const chapters = hiredChapters.map((hiredChapter) => hiredChapter.chapter);
  const finalData = [];
  chapters.forEach((chapter) => {
    finalData.push({
      chapter,
      title: titles.find((title) => chapter.titleId === title.id),
    });
  });
  const hasData = finalData.length > 0;

  return (
    <>
      {hasData ? (
        <HiredChaptersTable
          titlesAndChapters={finalData}
          cx={cx}
          pagination={pagination}
          setPagination={setPagination}
        />
      ) : (
        <NoData>
          <h5>Hiện tại chưa có truyện nào được bạn theo dõi!</h5>
          <small>Vui lòng quay lại sau nhé!</small>
        </NoData>
      )}
      <div />
    </>
  );
}

HiredChapters.propTypes = {
  cx: PropTypes.func.isRequired,
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      coverImage: PropTypes.string.isRequired,
      titleName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default HiredChapters;
