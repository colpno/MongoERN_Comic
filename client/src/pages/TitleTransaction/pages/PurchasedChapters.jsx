import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { GridTable } from "components";
import { NoData, Pagination } from "features";
import { chapterTransactionService } from "services";

function PurchasedChapters({ cx, titles }) {
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
      userId: user.id,
      _page: pagination.page,
      _limit: pagination.limit,
    };
    chapterTransactionService
      .getAll(params)
      .then((response) => {
        const purchasedChapters = response.data.filter(
          (purchasedChapter) =>
            purchasedChapter.expiredAt !== "" &&
            purchasedChapter.expiredAt !== null
        );

        setChapters(purchasedChapters);
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
        <GridTable
          head={[
            {
              label: `Hiển thị có tổng cộng ${chapters.length} nội dung`,
            },
          ]}
        >
          <>
            {finalData.map((titleAndChapter) => {
              const { title, chapter } = titleAndChapter;

              return (
                <Row className={cx("transaction__container")} key={chapter._id}>
                  <Col md={8} className={cx("transaction__container__content")}>
                    <div className={cx("box-img")}>
                      <img src={title.cover.source} alt={title.title} />
                    </div>
                    <div>
                      <p className={cx("title")}>{title.title}</p>
                      <p className={cx("chapter")}>{chapter.title}</p>
                    </div>
                  </Col>
                </Row>
              );
            })}
          </>
          <Pagination pagination={pagination} setPagination={setPagination} />
        </GridTable>
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

PurchasedChapters.propTypes = {
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

export default PurchasedChapters;
