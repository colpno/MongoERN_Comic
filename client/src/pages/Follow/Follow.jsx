import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { noFavorite } from "assets/images";
import GridTable from "components/GridTable";
import TabsContainer from "components/TabsContainer";
import { NoData, Pagination, Popup } from "features";
import { useDelete, usePagination, useToast } from "hooks";
import { deleteFollow, getAllFollows } from "services/follow";
import styles from "./assets/styles/Follow.module.scss";
import FollowTable from "./components/FollowTable";

const cx = classNames.bind(styles);

function Follow() {
  const FOLLOWS_PER_PAGE = 50;
  const user = useSelector((state) => state.user.user);
  const [follows, setFollows] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(FOLLOWS_PER_PAGE);
  const { Toast, options, toastEmitter } = useToast();
  const menu = [
    { href: "", label: "Truyện tranh", tab: "" },
    { href: "?tab=novels", label: "Truyện chữ", tab: "novels" },
  ];
  const hasData = follows.length > 0;

  const fetchData = () => {
    const params = {
      userId: user.guid,
      page: pagination.page,
      limit: pagination.limit,
    };
    getAllFollows(params)
      .then((response) => {
        setFollows(response.data);
        setPaginationTotal(response.pagination.total);
      })
      .catch((error) => console.log(error));
  };

  const { deletedItem, setDeletedItem, popup, setPopup } = useDelete(
    async () => {
      deleteFollow(deletedItem).then(() => {
        toastEmitter("Hủy theo dõi thành công", "success");
        fetchData();
      });
    }
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container className={cx("follow")}>
        <TabsContainer menu={menu} />
        {hasData ? (
          <>
            <GridTable
              head={[
                { label: "Tiêu đề", xs: 8 },
                { label: "Cập nhật lần cuối", center: true },
                { label: "Xóa", center: true },
              ]}
            >
              <FollowTable
                follows={follows}
                popup={popup}
                setPopup={setPopup}
                setDeletedItem={setDeletedItem}
              />
            </GridTable>
            <Pagination pagination={pagination} setPagination={setPagination} />
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
      <Toast {...options} />
    </>
  );
}

export default Follow;
