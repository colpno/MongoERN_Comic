import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import GridTable from "components/GridTable";
import { NoData, Pagination } from "features";
import { getAllPurchasedChapters } from "services/purchasedChapter";

function PurchasedChapters({ cx, titles }) {
  const user = useSelector((state) => state.user.user);
  const [chapters, setChapters] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 30,
    total: 0,
  });

  const finalData = [];
  chapters.forEach((chapter) => {
    finalData.push({
      chapter,
      title: titles.find((title) => chapter.titleId === title.id),
    });
  });
  const hasData = finalData.length > 0;

  const fetchData = () => {
    const params = {
      userId: user.guid,
      page: pagination.page,
      limit: pagination.limit,
    };
    getAllPurchasedChapters(params)
      .then((response) => {
        const purchasedChapters = response.data.map(
          (purchasedChapter) => purchasedChapter.chapter
        );

        setChapters(purchasedChapters);
        setPagination((prev) => ({
          ...prev,
          total: response.pagination.total,
        }));
      })
      .catch((error) => console.log(error));
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
                <Row className={cx("transaction__container")} key={chapter.id}>
                  <Col md={8} className={cx("transaction__container__content")}>
                    <div className={cx("box-img")}>
                      <img src={title.cover} alt={title.name} />
                    </div>
                    <div>
                      <p className={cx("title")}>{title.name}</p>
                      <p className={cx("chapter")}>{chapter.name}</p>
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
      guid: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default PurchasedChapters;
