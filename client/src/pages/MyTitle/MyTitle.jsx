/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";

import titleApi from "api/titleApi";
import Button from "components/Button";
import GridTable from "components/GridTable";
import NoData from "features/NoData";
import Pagination from "features/Pagination";
import { addStatisticCountData } from "libs/redux/slices/statisticCountSlice";
import styles from "./assets/styles/MyTitle.module.scss";
import MyTitleTable from "./components/MyTitleTable";

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
  const dispatch = useDispatch();
  const [allTitles, setAllTitles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: titles.length,
  });
  const hasData = titles.length > 0;

  const onPageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.search("userId", 1);
        setAllTitles(response);
        setPagination({ ...pagination, total: response.length });
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, []);

  useEffect(() => {
    const likes = allTitles.reduce((total, title) => total + title.like, 0);
    const views = allTitles.reduce((total, title) => total + title.view, 0);
    dispatch(
      addStatisticCountData({ totalChapters: allTitles.length, likes, views })
    );
  }, [allTitles]);

  useEffect(() => {
    const paginate = () => {
      const data = allTitles.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit
      );
      setTitles(data);
    };

    paginate();
  }, [allTitles, pagination.page]);

  return (
    <>
      <div className={cx("my-title")}>
        <Container className={cx("my-title__header")}>
          <span className={cx("my-title__header__total")}>
            Tổng số truyện:{" "}
            <span className={cx("my-title__header__total__number")}>
              {pagination.total}
            </span>
          </span>
          {hasData && <BtnCreate />}
        </Container>

        {hasData ? (
          <GridTable
            head={[
              { label: "Ảnh bìa" },
              { label: "Tiêu đề", md: 3 },
              { label: "Số chương" },
              { label: "Trạng thái" },
              { label: "Ngày đăng" },
              { label: "Ngày cập nhật" },
              { label: "" },
            ]}
          >
            <MyTitleTable data={titles} />
          </GridTable>
        ) : (
          <NoData>
            <h5>Hiện tại chưa có truyện nào!</h5>
            <BtnCreate />
          </NoData>
        )}
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      </div>

      <div className={cx("")} />
    </>
  );
}

export default MyTitle;
