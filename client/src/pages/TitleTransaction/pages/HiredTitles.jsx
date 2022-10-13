import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import GridTable from "components/GridTable";
import { useEffect, useState } from "react";
import hiredTitleApi from "api/hiredTitleApi";
import NoData from "features/NoData";

function HiredTitles({ cx }) {
  const userId = 1;
  const [hiredTitles, setHiredTitles] = useState([]);
  const titles = hiredTitles.map((hiredTitle) => hiredTitle.title);
  const hasData = titles.length > 0;

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 30,
    total: 0,
  });

  useEffect(() => {
    const fetchHiredTitles = async () => {
      try {
        const response = await hiredTitleApi.getAll(userId, {
          _limit: pagination.limit,
          _page: pagination.page,
        });
        setHiredTitles(response.data);
        setPagination({ ...pagination, total: response.pagination.total });
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchHiredTitles();
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

HiredTitles.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default HiredTitles;
