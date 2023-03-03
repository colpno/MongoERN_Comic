import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Loading } from "features";
import { useToast } from "hooks";
import { chapterTransactionService } from "services";
import HiredChaptersTable from "./components/HiredChaptersTable";

function HiredChapters({ cx }) {
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
        const hiredChapters = response.data.filter((hiredChapter) => hiredChapter.expiredAt);

        setTransactions(hiredChapters);
        setLoading(false);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <HiredChaptersTable transactions={transactions} cx={cx} />
      {loading && <Loading />}
      <Toast {...options} />
    </>
  );
}

HiredChapters.propTypes = {
  cx: PropTypes.func.isRequired,
};

export default HiredChapters;
