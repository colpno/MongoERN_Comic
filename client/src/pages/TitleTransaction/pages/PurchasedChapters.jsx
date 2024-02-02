import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import { useGetChapterTransactions } from "hooks/index.jsx";
import PurchasedChaptersTable from "./components/PurchasedChaptersTable";
import styles from "../styles/TitleTransaction.module.scss";

const cx = classNames.bind(styles);

function PurchasedChapters() {
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

export default PurchasedChapters;
