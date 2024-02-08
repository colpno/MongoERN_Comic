import { circleC, circleP } from "assets/images";
import classNames from "classnames/bind";
import { useAddChapterTransaction, useGetChapterTransactions } from "hooks/index.jsx";
import PropTypes from "prop-types";
import { memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../styles/ComicChapters.module.scss";
import PurchaseBox from "./PurchaseBox.jsx";
import TitleChapterListItem from "./TitleChapterListItem";

const cx = classNames.bind(styles);

function TitleChapterList({ title, chapters }) {
  const { titleId } = useParams();
  const { user } = useSelector((state) => state.user);
  const [selectedChapter, setSelectedChapter] = useState();
  const { data: chapterTransactions = [] } = useGetChapterTransactions({
    title_id: titleId,
  });
  const { add: addChapterTransaction } = useAddChapterTransaction();
  const paymentChoices = useMemo(() => {
    if (title) {
      const choices = [{ amount: title.coin, icon: circleC, method: "coin" }];
      if (title.point !== 0) {
        choices.push({ amount: title.point, icon: circleP, method: "point" });
      }
      return choices;
    }
    return [];
  }, [title]);

  const handleClosePurchaseBox = () => {
    setSelectedChapter(undefined);
  };

  const handleOpenPurchaseBox = (chapter) => {
    setSelectedChapter(chapter);
  };

  const findPurchasedChapter = (chapterId) => {
    const isPurchased = chapterTransactions.some((history) => history.chapter_id === chapterId);
    return isPurchased;
  };

  return (
    <div className={cx("chapters__content")}>
      {chapters.map((chapter) => (
        <TitleChapterListItem
          user={user}
          title={title}
          chapter={chapter}
          checkIsPurchased={findPurchasedChapter}
          onOpenPurchasedBox={handleOpenPurchaseBox}
          key={chapter._id}
        />
      ))}
      {selectedChapter && (
        <PurchaseBox
          chapter={selectedChapter}
          payments={paymentChoices}
          handleClose={handleClosePurchaseBox}
          onPurchase={addChapterTransaction}
        />
      )}
    </div>
  );
}

TitleChapterList.propTypes = {
  title: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
    coin: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
  }).isRequired,
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default memo(TitleChapterList);
