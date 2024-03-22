// TODO: In progress
/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Button } from "components";
import { Popup } from "features";
import { useGetChapterTransactions, usePopup } from "hooks";
import TicketExplainPopup from "pages/Title/components/TicketExplainPopup";
import { ReactComponent as TicketLogo } from "./assets/images/ticket.svg";
import styles from "./assets/styles/Inventory.module.scss";
import { InventoryTable, InventoryTickets } from "./components";

const cx = classNames.bind(styles);

function Inventory() {
  const user = useSelector((state) => state.user.user);
  const [chapters, setChapters] = useState([]);
  const { popup, setPopup, triggerPopup } = usePopup();
  const { data: chapterTransactions = [] } = useGetChapterTransactions({ user_id: user._id });

  const handleClickIcon = () => {
    setPopup({
      isTriggered: true,
      title: "Vé",
      content: <TicketExplainPopup />,
    });
  };

  useEffect(() => {
    // TODO const { purchasedChapters, hiredChapters } = response;

    // const allData = [...hiredChapters.data, purchasedChapters.data];
    // setChapters(allData);
    // setPaginationTotal(allData.length);
    setChapters([]);
  }, []);

  return (
    <>
      <header className={cx("inventory__header")}>
        <Container>
          <TicketLogo className={cx("inventory__header__image")} />
          <span className={cx("inventory__header__label")}>Hộp vé</span>
        </Container>
      </header>
      <Container className={cx("inventory")}>
        <Row className={cx("inventory__general")}>
          <InventoryTickets cx={cx} handleClickIcon={handleClickIcon} user={user} />
          <Col className={cx("inventory__general__options")}>
            <Button
              to="/profile/history/ticket"
              className={cx("inventory__general__options__redirect")}
            >
              Lịch sử nhận vé
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <InventoryTable hiredChapters={chapters} />
          </Col>
        </Row>
      </Container>
      <Popup data={popup} trigger={triggerPopup} />
    </>
  );
}

export default Inventory;
