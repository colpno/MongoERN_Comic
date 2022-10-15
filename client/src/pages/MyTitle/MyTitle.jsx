import classNames from "classnames/bind";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";

import Button from "components/Button";
import NoData from "features/NoData";
import { addStatisticCountData } from "libs/redux/slices/statisticCountSlice";
import { getTitles } from "services/titleServices";
import styles from "./assets/styles/MyTitle.module.scss";
import MyTitleContent from "./components/MyTitleContent";
import MyTitleHeader from "./components/MyTitleHeader";

const cx = classNames.bind(styles);

function BtnCreate() {
  return (
    <Button primary to="create" className={cx("my-title__header__create")}>
      <AiOutlinePlus />
      Thêm truyện
    </Button>
  );
}

function MyTitle() {
  const dispatch = useDispatch();
  const TITLES_PER_PAGE = 50;
  const { titles } = getTitles();
  const {
    titles: titlesByPage,
    pagination,
    setPagination,
  } = getTitles(TITLES_PER_PAGE);
  const hasData = titlesByPage?.length > 0;

  useEffect(() => {
    const dispatchStatisticCount = () => {
      const likes = titles.reduce((total, title) => total + title.like, 0);
      const views = titles.reduce((total, title) => total + title.view, 0);
      dispatch(
        addStatisticCountData({ totalChapters: titles.length, likes, views })
      );
    };

    titles.length > 0 && dispatchStatisticCount();
  }, [titles]);

  return (
    <div className={cx("my-title")}>
      <Container className={cx("my-title__header")}>
        <MyTitleHeader cx={cx} totalTitle={pagination.total} />
        {hasData && <BtnCreate />}
      </Container>
      {hasData ? (
        <Container>
          <MyTitleContent
            titles={titlesByPage}
            pagination={pagination}
            setPagination={setPagination}
          />
        </Container>
      ) : (
        <NoData>
          <h5>Hiện tại chưa có truyện nào!</h5>
          <BtnCreate />
        </NoData>
      )}
    </div>
  );
}

export default MyTitle;
