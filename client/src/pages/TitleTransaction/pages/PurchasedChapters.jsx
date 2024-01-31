import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { useGetChapterTransactions } from "hooks/index.jsx";
import PurchasedChaptersTable from "./components/PurchasedChaptersTable";

function PurchasedChapters({ cx }) {
  const user = useSelector((state) => state.user.user);
  const { data: transactions = [] } = useGetChapterTransactions({
    user_id: user._id,
    expiredAt: "null",
    _embed: JSON.stringify([
      { collection: "title_id", fields: "cover title" },
      { collection: "chapter_id", fields: "title order" },
    ]),
    _fields: "-__v -user_id",
  });

  return <PurchasedChaptersTable transactions={transactions} cx={cx} />;
}

PurchasedChapters.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default PurchasedChapters;
