import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { useGetChapterTransactions } from "hooks/index.jsx";
import HiredChaptersTable from "./components/HiredChaptersTable";

function HiredChapters({ cx }) {
  const user = useSelector((state) => state.user.user);
  const { data: transactions = [] } = useGetChapterTransactions({
    user_id: user._id,
    expiredAt_ne: "null",
    _embed: JSON.stringify([
      { collection: "title_id", fields: "cover title" },
      { collection: "chapter_id", fields: "title order" },
    ]),
    _fields: "-__v -user_id",
  });

  return <HiredChaptersTable transactions={transactions} cx={cx} />;
}

HiredChapters.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default HiredChapters;
