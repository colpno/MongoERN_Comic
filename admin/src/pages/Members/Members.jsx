import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { FloatingContainer, FloatingForm } from "components";
import { Popup, ProgressCircle } from "features";
import { useDelete, useToast, useUpdate } from "hooks";
import {
  deleteUser,
  filterUser,
  searchUser,
  sortUsersByProperty,
} from "services/user";
import MemberManagementCards from "./components/MemberManagementCards";
import MemberTable from "./components/MemberTable";
import UpdateForm from "./components/UpdateForm";
import styles from "./styles/Members.module.scss";

const cx = classNames.bind(styles);

function Members() {
  const searchText = useSelector((state) => state.global.searchText);
  const { users: allMembers } = searchUser({ role: "member" });
  const {
    users: members,
    setUsers: setMembers,
    pagination,
    setPagination,
    sorting,
    fetchUser,
  } = sortUsersByProperty({ role: "member" }, "id", true);
  const { users: filteredMembers, fetch: fetchFilteredUsers } = filterUser(
    null,
    pagination.limit
  );
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const hasData = members?.length > 0;

  const {
    deletedItem,
    popup: deletePopup,
    setDeletedItem,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    deleteUser(deletedItem, setProgress)
      .then((value) => {
        if (value.affectedRows > 0) {
          toastEmitter("Tài khoản đã được xóa thành công", "success");
          setProgress(0);
          fetchUser();
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  const {
    updateInfo,
    showForm,
    popup: updatePopup,
    setUpdateInfo,
    setShowForm,
    setPopup: setUpdatePopup,
    handleSubmit: handleUpdateFormSubmit,
  } = useUpdate(async () => {
    console.log(updateInfo.updated);
  });

  const stat =
    allMembers.length > 0 &&
    allMembers.reduce(
      (obj, member) => {
        return {
          coin: obj.coin + member.coin,
          income: obj.income + member.income,
          highestCoin:
            obj.highestCoin < member.highestCoin
              ? member.highestCoin
              : obj.highestCoin,
          highestIncome:
            obj.highestIncome < member.highestIncome
              ? member.highestIncome
              : obj.highestIncome,
        };
      },
      {
        coin: 0,
        income: 0,
        highestCoin: allMembers[0].coin,
        highestIncome: allMembers[0].income,
      }
    );

  useEffect(() => {
    if (searchText.length > 0) {
      const data = {
        username: searchText,
        role: "member",
      };
      fetchFilteredUsers(data);
    }
    if (searchText.length === 0) {
      fetchUser();
    }
  }, [searchText]);

  useEffect(() => {
    filteredMembers.length > 0 ? setMembers(filteredMembers) : fetchUser();
  }, [filteredMembers]);

  return (
    <>
      <Container>
        <Row>
          {allMembers.length > 0 && (
            <MemberManagementCards
              totalCoin={stat.coin}
              totalIncome={stat.income}
              highestCoin={stat.highestCoin}
              highestIncome={stat.highestIncome}
            />
          )}
        </Row>
        {hasData && (
          <>
            <Row>
              <h4 className={cx("label")}>All Members</h4>
            </Row>
            <FloatingContainer className={cx("data-rows")}>
              <MemberTable
                sorting={sorting}
                members={members}
                popup={deletePopup}
                setPopup={setDeletePopup}
                pagination={pagination}
                setPagination={setPagination}
                setDeleteItem={setDeletedItem}
                setUpdate={setUpdateInfo}
                setShowForm={setShowForm}
              />
            </FloatingContainer>
          </>
        )}
      </Container>
      {showForm && Object.keys(updateInfo.selected).length > 0 && (
        <FloatingForm title="Chỉnh sửa">
          <UpdateForm
            cx={cx}
            member={updateInfo.selected}
            popup={updatePopup}
            handleSubmit={handleUpdateFormSubmit}
            setShowForm={setShowForm}
            setPopup={setUpdatePopup}
          />
        </FloatingForm>
      )}
      <Popup popup={deletePopup} setPopup={setDeletePopup} yesno />
      <Toast {...toastOptions} />
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default Members;
