/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import followApi from "api/followApi";
import { noFavorite } from "assets/images";
import GridTable from "components/GridTable";
import TabsContainer from "components/TabsContainer";
import { NoData, Pagination, Popup } from "features";
import { useDelete } from "hooks";
import { deleteFollow, getLimitedFollowsByUserID } from "services/follow";
import { getAllTitles } from "services/title";
import styles from "./assets/styles/Follow.module.scss";
import FollowTable from "./components/FollowTable";

const cx = classNames.bind(styles);

function Follow() {
  const user = useSelector((state) => state.user.user);
  const { follows, pagination, setPagination, fetchLimitFollows } =
    getLimitedFollowsByUserID(user.guid, 50);
  const { titles } = getAllTitles();
  const hasData = follows.length > 0;

  const followedTitles = useMemo(
    () =>
      follows.map((follow) => {
        const temp = {
          ...titles.find((title) => title.guid === follow.titleId),
          followId: follow.guid,
        };
        return temp;
      }),
    [follows]
  );

  const menu = [
    { href: "", label: "Truyện tranh", tab: "" },
    // { href: "?tab=novels", label: "Truyện chữ", tab: "novels" },
  ];

  const { deletedItem, setDeletedItem, popup, setPopup } = useDelete(
    async () => {
      deleteFollow(deletedItem).then((value) => {
        if (value.affectedRows > 0) {
          fetchLimitFollows();
        }
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
                { label: "Tiêu đề", md: 8 },
                { label: "Cập nhật lần cuối", center: true },
                { label: "Xóa", center: true },
              ]}
            >
              <FollowTable
                titles={followedTitles}
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
    </>
  );
}

export default Follow;
