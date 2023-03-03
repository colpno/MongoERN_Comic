import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

import { Button } from "components";
import { useToast } from "hooks";
import { titleService } from "services";
import MyTitleHeader from "./components/MyTitleHeader";
import MyTitleTable from "./components/MyTitleTable";
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
  const [titles, setTitles] = useState([]);
  const { Toast, options, toastEmitter } = useToast();

  useEffect(() => {
    const params = {
      user_id: user._id,
      _embed: JSON.stringify([
        { collection: "approved_status_id", fields: "-_id status color" },
        { collection: "status_id", fields: "-_id status" },
      ]),
      _fields: "-__v -_guid -cover.cloud_public_id",
    };
    titleService
      .getAll(params)
      .then((response) => setTitles(response.data))
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  return (
    <>
      <Container className={cx("my-title")}>
        <Row className={cx("my-title__header")}>
          <Col xs={6}>
            <MyTitleHeader cx={cx} totalTitle={titles.length} />
          </Col>
          <Col xs={6} className="right">
            <BtnCreate />
          </Col>
        </Row>
        <Row>
          <Col>
            <MyTitleTable titles={titles} />
          </Col>
        </Row>
      </Container>
      <Toast {...options} />
    </>
  );
}

export default MyTitle;
