import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { noFavorite } from "assets/images";
import { GridTable } from "components";
import { NoData, Pagination, Popup } from "features";
import { useDelete, usePagination, useToast } from "hooks";
import { followService } from "services";
import FollowTable from "./components/FollowTable";
import styles from "./styles/Follow.module.scss";

const cx = classNames.bind(styles);

function Follow() {
  const FOLLOWS_PER_PAGE = 50;
  const user = useSelector((state) => state.user.user);
  const [follows, setFollows] = useState([]);
  const { pagination, setPagination, setPaginationTotal } = usePagination(FOLLOWS_PER_PAGE);
  const { Toast, options, toastEmitter } = useToast();
  const hasData = follows.length > 0;

  const fetchData = () => {
    const params = {
      userId: user._id,
      _page: pagination.page,
      _limit: pagination.limit,
    };
    followService
      .getAll(params)
      .then((response) => {
        setFollows(response.data);
        setPaginationTotal(response.paginate.total);
      })
      .catch((error) => console.error(error));
  };

  const { deletedItem, setDeletedItem, popup, setPopup } = useDelete(async () => {
    followService.delete(deletedItem).then(() => {
      toastEmitter("Hủy theo dõi thành công", "success");
      fetchData();
    });
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container className={cx("follow")}>
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
