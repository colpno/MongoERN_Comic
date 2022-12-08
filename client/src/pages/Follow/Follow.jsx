import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { noFavorite } from "assets/images";
import GridTable from "components/GridTable";
import TabsContainer from "components/TabsContainer";
import { NoData, Pagination, Popup } from "features";
import { useDelete, useToast } from "hooks";
import { deleteFollow, getLimitedFollowsByUserID } from "services/follow";
import styles from "./assets/styles/Follow.module.scss";
import FollowTable from "./components/FollowTable";

const cx = classNames.bind(styles);

function Follow() {
  const user = useSelector((state) => state.user.user);
  const { follows, pagination, setPagination, fetchLimitFollows } =
    getLimitedFollowsByUserID(user.guid, 50);
  const { Toast, options, toastEmitter } = useToast();
  const hasData = follows.length > 0;

  const menu = [
    { href: "", label: "Truyện tranh", tab: "" },
    { href: "?tab=novels", label: "Truyện chữ", tab: "novels" },
  ];

  const { deletedItem, setDeletedItem, popup, setPopup } = useDelete(
    async () => {
      deleteFollow(deletedItem).then(() => {
        toastEmitter("Hủy theo dõi thành công", "success");
        fetchLimitFollows();
      });
    }
  );

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
