import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import { noFavorite } from "assets/images";
import GridTable from "components/GridTable";
import TabsContainer from "components/TabsContainer";
import { NoData, Pagination, Popup } from "features";
import { getLimitedFollowsByUserID } from "services/follow";
import styles from "./assets/styles/Follow.module.scss";
import FollowTable from "./components/FollowTable";

const cx = classNames.bind(styles);

function Follow() {
  const user = useSelector((state) => state.user.user);
  const { titles, pagination, setPagination } = getLimitedFollowsByUserID(
    user.id,
    50
  );
  const hasData = titles.length > 0;

  const menu = [
    { href: "", label: "Truyện tranh", tab: "" },
    { href: "?tab=novels", label: "Truyện chữ", tab: "novels" },
  ];
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "",
    content: "",
  });

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
    </>
  );
}

export default Follow;
