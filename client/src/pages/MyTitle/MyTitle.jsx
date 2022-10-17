import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "components/Button";
import NoData from "features/NoData";
import { getTitlesByUerID } from "services/titleServices";
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
  const userID = 1;
  const TITLES_PER_PAGE = 50;
  const {
    titles: titlesByPage,
    pagination,
    setPagination,
  } = getTitlesByUerID(userID, TITLES_PER_PAGE);
  const hasData = titlesByPage?.length > 0;

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
