/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer, FloatingForm } from "components";
import { Popup } from "features";
import { useDelete, useUpdate } from "hooks";
import { deleteUser, sortUsersByProperty } from "services/user";
import MemberManagementCards from "./components/MemberManagementCards";
import MemberTable from "./components/MemberTable";
import styles from "./styles/MemberManagement.module.scss";
import UpdateForm from "./components/UpdateForm";

const cx = classNames.bind(styles);

function MemberManagement() {
  const {
    users: members,
    pagination,
    setPagination,
    sorting,
    fetchUser,
  } = sortUsersByProperty({ role: "member" }, "id", true);
  const hasData = members?.length > 0;

  const {
    deletedItem,
    popup: deletePopup,
    setDeletedItem,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    deleteUser(deletedItem).then((response) => {
      if (response.affectedRows > 0) {
        fetchUser();
      }
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

  return (
    <>
      <Container>
        {hasData && (
          <>
            <Row>
              <MemberManagementCards totalTitles={pagination.total} />
            </Row>
            <Row>
              <h4 className={cx("label")}>All Members</h4>
            </Row>
            <FloatingContainer>
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
    </>
  );
}

export default MemberManagement;
