import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "components/Button";
import { NoData, Search } from "features";
import { getLimitedTitlesByProperty, sortTitlesByUserID } from "services/title";
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
  const user = useSelector((state) => state.user.user);
  const searchText = useSelector((state) => state.global.searchText);
  const TITLES_PER_PAGE = 50;
  const { titles, setTitles, pagination, setPagination, sorting, fetch } =
    sortTitlesByUserID(user.guid, "id", true, TITLES_PER_PAGE);
  const { titles: limitedTitles, fetch: fetchLimitedTitles } =
    getLimitedTitlesByProperty(null, 30);
  const hasData = titles?.length > 0;

  useEffect(() => {
    if (searchText) {
      const prop = { name: searchText, userId: user.guid };
      fetchLimitedTitles(prop);
    }
    if (searchText.length === 0) {
      fetch();
    }
  }, [searchText]);

  useEffect(() => {
    limitedTitles.length > 0 && setTitles(limitedTitles);
  }, [limitedTitles]);

  return (
    <Container className={cx("my-title")}>
      <Row className={cx("my-title__header")}>
        <Col>
          <MyTitleHeader cx={cx} totalTitle={pagination.total} />
        </Col>
        <Col>
          <Search />
        </Col>
        <Col xs={5} sm={3} lg={20}>
          {hasData && <BtnCreate />}
        </Col>
      </Row>
      {hasData ? (
        <Row>
          <MyTitleContent
            sorting={sorting}
            titles={titles}
            pagination={pagination}
            setPagination={setPagination}
          />
        </Row>
      ) : (
        <NoData>
          <h5>Hiện tại chưa có truyện nào!</h5>
          <BtnCreate />
        </NoData>
      )}
    </Container>
  );
}

export default MyTitle;
