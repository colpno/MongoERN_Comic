import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

import { Button } from "components";
import { useGetTitles } from "hooks/index.jsx";
import MyTitleHeader from "./components/MyTitleHeader";
import MyTitleTable from "./components/MyTitleTable";
import styles from "./styles/MyTitle.module.scss";

const cx = classNames.bind(styles);

function MyTitle() {
  const user = useSelector((state) => state.user.user);
  const { data: titles = [] } = useGetTitles({
    user_id: user._id,
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "-_id status color" },
      { collection: "status_id", fields: "-_id status" },
    ]),
    _fields: "-__v -_guid -cover.cloud_public_id",
  });

  return (
    <Container className={cx("my-title")}>
      <Row className={cx("my-title__header")}>
        <Col xs={6}>
          <MyTitleHeader cx={cx} totalTitle={titles.length} />
        </Col>
        <Col xs={6} className="right">
          <Button primary to="create" className={cx("my-title__header__create")}>
            <AiOutlinePlus />
            Thêm truyện
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <MyTitleTable titles={titles} />
        </Col>
      </Row>
    </Container>
  );
}

export default MyTitle;
