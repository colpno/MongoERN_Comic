import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import GridTable from "components/GridTable";
import { NoData, Pagination } from "features";
import { useSelector } from "react-redux";
import { getLimitedPurchasedChaptersByUserID } from "services/purchasedChapter";

function PurchasedChapters({ cx, titles }) {
  const user = useSelector((state) => state.user.user);
  const { purchasedChapters, pagination, setPagination } =
    getLimitedPurchasedChaptersByUserID(user.id, 30);
  const chapters = purchasedChapters.map(
    (purchasedChapter) => purchasedChapter.chapter
  );

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
                      <img src={title.coverImage} alt={title.titleName} />
                    </div>
                    <div>
                      <p className={cx("title")}>{title.titleName}</p>
                      <p className={cx("chapter")}>{chapter.titleName}</p>
                    </div>
                  </Col>
                </Row>
              );
            })}{" "}
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
      coverImage: PropTypes.string.isRequired,
      titleName: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default PurchasedChapters;
