import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import GridTable from "components/GridTable";
import purchaseTitleApi from "api/purchaseTitleApi";
import { NoData } from "features";

function PurchasedTitles({ cx }) {
  const userId = 1;
  const [purchasedTitles, setPurchasedTitles] = useState([]);
  const titles = purchasedTitles.map((purchasedTitle) => purchasedTitle.title);
  const hasData = titles.length > 0;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 30,
    total: 0,
  });

  useEffect(() => {
    const fetchPurchasedTitles = async () => {
      try {
        const response = await purchaseTitleApi.getAll(userId, {
          _limit: pagination.limit,
          _page: pagination.page,
        });
        setPurchasedTitles(response.data);
        setPagination({ ...pagination, total: response.pagination.total });
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchPurchasedTitles();
  }, [pagination.page]);

  return (
    <>
      {hasData ? (
        <GridTable
          head={[
            {
              label: `Hiển thị có tổng cộng ${titles.length} nội dung`,
            },
          ]}
        >
          <>
            {titles.map((title) => {
              return (
                <Row className={cx("transaction__container")} key={title.id}>
                  <Col md={8} className={cx("transaction__container__content")}>
                    <div className={cx("box-img")}>
                      <img src={title.coverImage} alt={title.titleName} />
                    </div>
                    <div>
                      <p className={cx("title")}>{title.titleName}</p>
                      <p className={cx("authors")}>{title.authors}</p>
                    </div>
                  </Col>
                </Row>
              );
            })}{" "}
          </>
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

PurchasedTitles.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default PurchasedTitles;
