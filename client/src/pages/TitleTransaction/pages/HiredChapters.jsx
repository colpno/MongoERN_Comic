import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { NoData } from "features";
import { useSelector } from "react-redux";
import { chapterTransactionService } from "services";
import HiredChaptersTable from "./components/HiredChaptersTable";

function HiredChapters({ cx, titles }) {
  const user = useSelector((state) => state.user.user);
  const [chapters, setChapters] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 30,
    total: 0,
  });
  const finalData = [];
  chapters.forEach((chapter) => {
    finalData.push({
      chapter,
      title: titles.find((title) => chapter.title_id === title._id),
    });
  });
  const hasData = finalData.length > 0;

  const fetchData = () => {
    const params = {
      userId: user._id,
      _page: pagination.page,
      _limit: pagination.limit,
    };
    chapterTransactionService
      .getAll(params)
      .then((response) => {
        const hiredChapters = response.data.map(
          (hiredChapter) => hiredChapter.chapter
        );

        setChapters(hiredChapters);
        setPagination((prev) => ({
          ...prev,
          total: response.paginate.total,
        }));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      cover: PropTypes.shape({
        source: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default HiredChapters;
