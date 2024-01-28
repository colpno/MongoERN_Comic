import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "libs/redux/slices/common.slice.js";
import { chapterTransactionService } from "services";
import PurchasedChaptersTable from "./components/PurchasedChaptersTable";

function PurchasedChapters({ cx }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));

    const params = {
      user_id: user._id,
      _embed: JSON.stringify([
        { collection: "title_id", fields: "cover title" },
        { collection: "chapter_id", fields: "title" },
      ]),
      _fields: "-__v -user_id",
    };

    chapterTransactionService.getAll(params).then((response) => {
      const purchasedChapters = response.data.filter(
        (purchasedChapter) => !purchasedChapter.expiredAt
      );

      setTransactions(purchasedChapters);
    });

    dispatch(setLoading(false));
  }, []);

  return <PurchasedChaptersTable transactions={transactions} cx={cx} />;
}

PurchasedChapters.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default PurchasedChapters;
