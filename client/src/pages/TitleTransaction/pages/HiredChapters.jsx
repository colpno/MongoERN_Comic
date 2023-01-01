import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Loading, NoData } from "features";
import { chapterTransactionService } from "services";
import HiredChaptersTable from "./components/HiredChaptersTable";

function HiredChapters({ cx }) {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 30,
    total: 0,
  });

  useEffect(() => {
    setLoading(true);

    const params = {
      user_id: user._id,
      _page: pagination.page,
      _limit: pagination.limit,
    };

    chapterTransactionService
      .getAll(params)
      .then((response) => {
        const hiredChapters = response.data.filter(
          (purchasedChapter) => purchasedChapter.transaction.expiredAt
        );

        setTransactions(hiredChapters);
        setPagination((prev) => ({
          ...prev,
          total: response.paginate.total,
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {transactions.length > 0 ? (
        <HiredChaptersTable
          transactions={transactions}
          cx={cx}
          pagination={pagination}
          setPagination={setPagination}
        />
      ) : (
        <NoData>
          <h5>Hiện tại chưa có truyện nào được bạn thuê!</h5>
          <small>Vui lòng quay lại sau nhé!</small>
        </NoData>
      )}
      <div />
      {loading && <Loading />}
    </>
  );
}

HiredChapters.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default HiredChapters;
