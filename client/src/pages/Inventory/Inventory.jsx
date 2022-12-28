import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { GridTable } from "components";
import { Pagination, Popup } from "features";
import { usePagination } from "hooks";
import TicketExplainPopup from "pages/Title/components/TicketExplainPopup";
import { chapterTransactionService } from "services";
import { sortArray } from "utils/arrayMethods";
import { ReactComponent as TicketLogo } from "./assets/images/ticket.svg";
import styles from "./assets/styles/Inventory.module.scss";
import {
  InventoryInteract,
  InventoryTable,
  InventoryTickets,
} from "./components";

const cx = classNames.bind(styles);

function Inventory() {
  const CHAPTERS_PER_PAGE = 30;
  const user = useSelector((state) => state.user.user);
  const [chapters, setChapters] = useState([]);
  const [sorter, setSorter] = useState({ key: "createdAt", isAsc: false });
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(CHAPTERS_PER_PAGE);
  const sortOptions = [
    { value: "createdAt", label: "Ngày nhận" },
    { value: "expiredAt", label: "Ngày hết hạn" },
  ];
  const [popup, setPopup] = useState({
    trigger: false,
    title: "",
    content: "",
  });

  const fetchData = () => {
    chapterTransactionService
      .getAll({
        user_id: user._id,
        _page: pagination.page,
        _limit: pagination.limit / 2,
      })
      // .then((response) => {
      .then(() => {
        // TODO const { purchasedChapters, hiredChapters } = response;

        // const allData = [...hiredChapters.data, purchasedChapters.data];
        // setChapters(allData);
        // setPaginationTotal(allData.length);
        setChapters([]);
        setPaginationTotal(0);
      })
      .catch((error) => console.error(error));
  };

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
    const data = sorting([...chapters], !sorter.isAsc, sorter.key);
    setSorter({ ...sorter, isAsc: !sorter.isAsc });
    setChapters(data);
  };

  const handleFilter = (selected) => {
    const { value } = selected;
    if (sorter.key !== value) {
      const data = [...chapters];

      switch (value) {
        case "createdAt":
          sorting(data, false, value);
          setSorter({ key: value, isAsc: false });
          break;
        case "expiredAt":
          sorting(
            data.filter((item) => item.ticket_id === 2),
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
    fetchData();
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
        <Pagination pagination={pagination} setPagination={setPagination} />
      </Container>
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default Inventory;
