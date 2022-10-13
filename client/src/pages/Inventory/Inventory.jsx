import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import hiredTitleApi from "api/hiredTitleApi";
import purchaseTitleApi from "api/purchaseTitleApi";
import GridTable from "components/GridTable";
import { UserArray } from "database";
import Popup from "features/Popup";
import TicketExplainPopup from "pages/Title/components/TicketExplainPopup";
import { ReactComponent as TicketLogo } from "./assets/images/ticket.svg";
import styles from "./assets/styles/Inventory.module.scss";
import InventoryInteract from "./components/InventoryInteract";
import InventoryTable from "./components/InventoryTable";
import InventoryTickets from "./components/InventoryTickets";

const cx = classNames.bind(styles);

function Inventory() {
  const user = UserArray()[0];
  const [hiredTitles, setHiredTitles] = useState([]);
  const [purchasedTitles, setPurchasedTitles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [sorter, setSorter] = useState({ key: "createdAt", isAsc: false });

  const sortOptions = [
    { value: "createdAt", label: "Ngày nhận" },
    { value: "expiredDay", label: "Ngày hết hạn" },
  ];
  const [popup, setPopup] = useState({
    trigger: false,
    title: "",
    content: "",
  });

  const handleClickIcon = () => {
    setPopup({
      trigger: true,
      title: "Vé",
      content: <TicketExplainPopup />,
    });
  };

  const sorting = (array, asc, key) => {
    switch (asc) {
      case true:
        return array.sort((a, b) => a[key].localeCompare(b[key]));
      case false:
        return array.sort((a, b) => b[key].localeCompare(a[key]));
      default:
        return array;
    }
  };

  const handleSort = () => {
    let data = [];
    switch (sorter.key) {
      case "createdAt":
        data = sorting([...titles], !sorter.isAsc, sorter.key);
        break;
      case "expiredDay":
        data = sorting([...hiredTitles], !sorter.isAsc, sorter.key);
        data.push(...purchasedTitles);
        break;
      default:
        break;
    }
    setSorter({ ...sorter, isAsc: !sorter.isAsc });
    setTitles(data);
  };

  const handleFilter = (e) => {
    const { value } = e.target;

    if (sorter.key !== value) {
      const data = [...hiredTitles, ...purchasedTitles];

      switch (value) {
        case "createdAt":
          sorting(data, false, value);
          setSorter({ key: value, isAsc: false });
          break;
        case "expiredDay":
          sorting(
            data.filter((item) => item.ticketId === 2),
            true,
            value
          );
          setSorter({ key: value, isAsc: true });
          break;
        default:
          break;
      }

      setTitles(data);
    }
  };

  useEffect(() => {
    const fetchPurchasedTitles = async () => {
      try {
        const response = await purchaseTitleApi.getAll(user.userID, {
          _limit: 20,
          _page: 1,
        });
        setPurchasedTitles(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchPurchasedTitles();
  }, []);

  useEffect(() => {
    const fetchHiredTitles = async () => {
      try {
        const response = await hiredTitleApi.getAll(user.userID, {
          _limit: 20,
          _page: 1,
        });
        setHiredTitles(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchHiredTitles();
  }, []);

  useEffect(() => {
    if (hiredTitles.length > 0 && purchasedTitles.length > 0) {
      const data = [...hiredTitles, ...purchasedTitles];
      sorting(data, sorter.isAsc, sorter.key);
      setTitles(data);
    }
  }, [hiredTitles, purchasedTitles]);

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
          <InventoryTickets
            cx={cx}
            handleClickIcon={handleClickIcon}
            user={user}
          />
          <InventoryInteract
            cx={cx}
            handleSort={handleSort}
            sortOptions={sortOptions}
            handleFilter={handleFilter}
          />
        </Row>
        <GridTable
          head={[
            { label: "Tựa truyện", md: 6 },
            { label: "Vé" },
            { label: "Ngày nhận" },
            { label: "Ngày hết" },
          ]}
        >
          <InventoryTable hiredTitles={titles} />
        </GridTable>
      </Container>
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default Inventory;
