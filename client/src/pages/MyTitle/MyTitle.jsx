import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

import { Button } from "components";
import { NoData } from "features";
import { titleService } from "services";
import MyTitleTable from "./components/MyTitleTable";
import MyTitleHeader from "./components/MyTitleHeader";
import styles from "./styles/MyTitle.module.scss";

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
  const [titles, setTitles] = useState([]);
  const defaultTitleApiParams = {
    user_id: user._id,
    _sort: "_id",
    _order: "asc",
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "-_id status color" },
      { collection: "status_id", fields: "-_id status" },
    ]),
    _fields: "-__v -_guid -cover.cloud_public_id",
  };
  const [titleApiParams, setTitleApiParams] = useState(defaultTitleApiParams);
  const hasData = titles.length > 0;

  const fetchData = (params) => {
    titleService
      .getAll(params)
      .then((response) => setTitles(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData(titleApiParams);
  }, [titleApiParams]);

  useEffect(() => {
    if (searchText) {
      setTitleApiParams((prev) => ({ ...prev, title_like: searchText }));
    }
    if (searchText.length === 0) {
      setTitleApiParams(defaultTitleApiParams);
    }
  }, [searchText]);

  return (
    <Container className={cx("my-title")}>
      <Row className={cx("my-title__header")}>
        <Col xs={6}>
          <MyTitleHeader cx={cx} totalTitle={titles.length} />
        </Col>
        <Col xs={6} className="right">
          {hasData && <BtnCreate />}
        </Col>
      </Row>
      {hasData ? (
        <Row>
          <MyTitleTable titles={titles} />
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
