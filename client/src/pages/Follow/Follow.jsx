import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import followApi from "api/followApi";
import { noFavorite } from "assets/images";
import GridTable from "components/GridTable";
import TabsContainer from "components/TabsContainer";
import { NoData, Pagination, Popup } from "features";
import styles from "./assets/styles/Follow.module.scss";
import FollowTable from "./components/FollowTable";

const cx = classNames.bind(styles);

function Follow() {
  const userId = 1;
  const [titles, setTitles] = useState([]);
  const hasData = titles.length > 0;

  const menu = [
    { href: "", label: "Truyện tranh", tab: "" },
    { href: "?tab=novels", label: "Truyện chữ", tab: "novels" },
  ];
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 30,
    total: titles.length,
  });
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "",
    content: "",
  });

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const response = await followApi.getAll(userId, {
          _limit: pagination.limit,
          _page: pagination.page,
        });
        const titlesArray = response.data.map((follow) => follow.title);

        setTitles(titlesArray);
        setPagination({ ...pagination, total: response.pagination.total });
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchFollows();
  }, [pagination.page]);

  useEffect(() => {
    // console.log(popup.isConfirm);
  }, [popup.isConfirm]);

  return (
    <>
      <Container className={cx("follow")}>
        <TabsContainer menu={menu} />
        {hasData ? (
          <>
            <GridTable
              head={[
                { label: "Tiêu đề", md: 8 },
                { label: "Cập nhật lần cuối", center: true },
                { label: "Xóa", center: true },
              ]}
            >
              <FollowTable titles={titles} popup={popup} setPopup={setPopup} />
            </GridTable>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <NoData image={noFavorite}>
            <>
              <h5>Hiện tại chưa có truyện nào được bạn theo dõi!</h5>
              <small>Vui lòng quay lại sau nhé!</small>
            </>
          </NoData>
        )}
      </Container>
      <Popup yesno popup={popup} setPopup={setPopup} />
    </>
  );
}

export default Follow;
