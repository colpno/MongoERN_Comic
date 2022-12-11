import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import GridTable from "components/GridTable";
import { Popup } from "features";
import TicketExplainPopup from "pages/Title/components/TicketExplainPopup";
import { getLimitedHiredChaptersByUserID } from "services/hiredChapter";
import { getAllPurchasedChapters } from "services/purchasedChapter";
import { sortArray } from "utils/arrayMethods";
import { ReactComponent as TicketLogo } from "./assets/images/ticket.svg";
import styles from "./assets/styles/Inventory.module.scss";
import InventoryInteract from "./components/InventoryInteract";
import InventoryTable from "./components/InventoryTable";
import InventoryTickets from "./components/InventoryTickets";

const cx = classNames.bind(styles);

function Inventory() {
  const user = useSelector((state) => state.user.user);
  const { hiredChapters } = getLimitedHiredChaptersByUserID({
    userId: user.guid,
    limit: 30,
  });
  const { purchasedChapters } = getAllPurchasedChapters({
    userId: user.guid,
    limit: 30,
  });
  const [chapters, setChapters] = useState([]);
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
        return sortArray(array, key, "asc");
      case false:
        return sortArray(array, key, "desc");
      default:
        return array;
    }
  };

  const handleSort = () => {
    let data = [];
    switch (sorter.key) {
      case "createdAt":
        data = sorting([...chapters], !sorter.isAsc, sorter.key);
        break;
      case "expiredDay":
        data = sorting([...hiredChapters], !sorter.isAsc, sorter.key);
        data.push(...purchasedChapters);
        break;
      default:
        break;
    }
    setSorter({ ...sorter, isAsc: !sorter.isAsc });
    setChapters(data);
  };

  const handleFilter = (selected) => {
    const { value } = selected;
    if (sorter.key !== value) {
      const data = [...hiredChapters, ...purchasedChapters];

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

      setChapters(data);
    }
  };

  useEffect(() => {
    if (hiredChapters.length > 0 && purchasedChapters.length > 0) {
      const data = [...hiredChapters, ...purchasedChapters];
      sorting(data, sorter.isAsc, sorter.key);
      setChapters(data);
    }
  }, [hiredChapters, purchasedChapters]);

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
          <InventoryTable hiredChapters={chapters} />
        </GridTable>
      </Container>
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default Inventory;
