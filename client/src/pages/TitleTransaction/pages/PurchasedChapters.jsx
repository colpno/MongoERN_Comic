import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Loading, NoData } from "features";
import { useToast } from "hooks";
import { chapterTransactionService } from "services";
import PurchasedChaptersTable from "./components/PurchasedChaptersTable";

function PurchasedChapters({ cx }) {
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const { Toast, options, toastEmitter } = useToast();

  useEffect(() => {
    setLoading(true);

    const params = {
      user_id: user._id,
      _embed: JSON.stringify([
        { collection: "title_id", fields: "cover title" },
        { collection: "chapter_id", fields: "title" },
      ]),
      _fields: "-__v -user_id",
    };

    chapterTransactionService
      .getAll(params)
      .then((response) => {
        const purchasedChapters = response.data.filter(
          (purchasedChapter) => !purchasedChapter.expiredAt
        );

        setTransactions(purchasedChapters);
        setLoading(false);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setLoading(false);
      });
  }, []);

  return (
    <>
      {transactions.length > 0 ? (
        <PurchasedChaptersTable transactions={transactions} cx={cx} />
      ) : (
        <NoData>
          <h5>Hiện tại chưa có truyện nào được bạn theo dõi!</h5>
          <small>Vui lòng quay lại sau nhé!</small>
        </NoData>
      )}
      <div />
      {loading && <Loading />}
      <Toast {...options} />
    </>
  );
}

PurchasedChapters.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default PurchasedChapters;
