/* eslint-disable no-unused-vars */
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
    user.id,
    "index",
    true,
    TITLES_PER_PAGE
  );
  const hasData = titles?.length > 0;

  return (
    <div className={cx("my-title")}>
      <Container className={cx("my-title__header")}>
        <MyTitleHeader cx={cx} totalTitle={pagination.total} />
        {hasData && <BtnCreate />}
      </Container>
      {hasData ? (
        <Container>
          <Row>
            <Col>
              <MyTitleContent
                sorting={sorting}
                titles={titles}
                pagination={pagination}
                setPagination={setPagination}
              />
            </Col>
          </Row>
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
