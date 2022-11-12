import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

import Button from "components/Button";
import { NoData } from "features";
import { sortTitlesByUserID } from "services/title";
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
  const TITLES_PER_PAGE = 50;
  const { titles, pagination, setPagination, sorting } = sortTitlesByUserID(
    user.guid,
    "id",
    true,
    TITLES_PER_PAGE
  );
  const hasData = titles?.length > 0;

  return (
    <Container className={cx("my-title")}>
      <Row className={cx("my-title__header")}>
        <Col>
          <MyTitleHeader cx={cx} totalTitle={pagination.total} />
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
