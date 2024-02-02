import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import { useGetChapterTransactions } from "hooks/index.jsx";
import HiredChaptersTable from "./components/HiredChaptersTable";
import styles from "../styles/TitleTransaction.module.scss";

const cx = classNames.bind(styles);

function HiredChapters() {
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

export default HiredChapters;
