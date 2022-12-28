import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

import { Button } from "components";
import { NoData, Search } from "features";
import { usePagination } from "hooks";
import { titleService } from "services";
import styles from "./styles/MyTitle.module.scss";
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
  const TITLES_PER_PAGE = 50;
  const user = useSelector((state) => state.user.user);
  const searchText = useSelector((state) => state.global.searchText);
  const [titles, setTitles] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(TITLES_PER_PAGE);
  const defaultTitleApiParams = {
    user_id: user._id,
    _sort: "_id",
    _order: "asc",
    _page: pagination.page,
    _limit: pagination.limit,
  };
  const [titleApiParams, setTitleApiParams] = useState(defaultTitleApiParams);
  const [isDescSort, setIsDescSort] = useState(true);
  const hasData = titles.length > 0;

  const fetchData = (params) => {
    titleService
      .getAll(params)
      .then((response) => {
        setTitles(response.data);
        setPaginationTotal(response.paginate.total);
      })
      .catch((error) => console.error(error));
  };

  const handleSorting = (column) => {
    setTitleApiParams((prev) => ({
      ...prev,
      _sort: column,
      _order: isDescSort ? "desc" : "asc",
    }));
    setIsDescSort((prev) => !prev);
  };

  useEffect(() => {
    fetchData(titleApiParams);
  }, [titleApiParams]);

  useEffect(() => {
    if (searchText) {
      setTitleApiParams((prev) => ({ ...prev, name: searchText }));
    }
    if (searchText.length === 0) {
      setTitleApiParams(defaultTitleApiParams);
    }
  }, [searchText]);

  return (
    <Container className={cx("my-title")}>
      <Row className={cx("my-title__header")}>
        <Col xs={12} md="auto">
          <MyTitleHeader cx={cx} totalTitle={pagination.total} />
        </Col>
        <Col xs={6} md={4} lg={4} className="right">
          <Search />
        </Col>
        <Col xs={6} md={3} lg={20} className="right">
          {hasData && <BtnCreate />}
        </Col>
      </Row>
      {hasData ? (
        <Row>
          <MyTitleContent
            sorting={handleSorting}
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
