import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "libs/redux/slices/common.slice.js";
import { chapterTransactionService } from "services";
import HiredChaptersTable from "./components/HiredChaptersTable";

function HiredChapters({ cx }) {
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
      const hiredChapters = response.data.filter((hiredChapter) => hiredChapter.expiredAt);

      setTransactions(hiredChapters);
    });

    dispatch(setLoading(false));
  }, []);

  return <HiredChaptersTable transactions={transactions} cx={cx} />;
}

HiredChapters.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default HiredChapters;
