/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";

import { Button, FloatingContainer, FloatingForm } from "components";
import { Popup } from "features";
import { useAdd, useDelete } from "hooks";
import { register } from "services/auth";
import { deleteUser, sortUsersByProperty } from "services/user";
import AdminManagementCards from "./components/AdminManagementCards";
import AdminTable from "./components/AdminTable";
import styles from "./styles/AdminManagement.module.scss";
import UpdateForm from "./components/UpdateForm";

const cx = classNames.bind(styles);

function AdminManagement() {
  const {
    users: members,
    pagination,
    setPagination,
    sorting,
    fetchUser,
  } = sortUsersByProperty({ role: "admin" }, "id", true);

  const {
    handleSubmit: handleAddFormSubmit,
    popup: addFormPopup,
    setPopup: setAddFormPopup,
    setShowForm: setShowAddForm,
    showForm: showAddForm,
  } = useAdd(async ({ username, password, email }) => {
    const data = {
      username,
      password,
      email,
      role: "admin",
    };
    register(data).then((value) => {
      if (value.affectedRows > 0) {
        fetchUser();
      }
    });
  });

  const {
    deletedItem,
    popup: deletePopup,
    setDeletedItem,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    deleteUser(deletedItem).then((value) => {
      if (value.affectedRows > 0) {
        fetchUser();
      }
    });
  });

  const hasData = members?.length > 0;

  return (
    <>
      <Container>
        {hasData && (
          <>
            <Row>
              <AdminManagementCards totalTitles={pagination.total} />
            </Row>
            <Row className={cx("label-wrapper")}>
              <Col>
                <h4 className={cx("label")}>All Administrators</h4>
              </Col>
              <Col md={4}>
                <Button primary onClick={() => setShowAddForm(true)}>
                  <AiOutlinePlus />
                  Thêm
                </Button>
              </Col>
            </Row>
            <FloatingContainer>
              <AdminTable
                admins={members}
                pagination={pagination}
                sorting={sorting}
                setPopup={setDeletePopup}
                setPagination={setPagination}
                setDeletedItem={setDeletedItem}
              />
            </FloatingContainer>
          </>
        )}
      </Container>
      {showAddForm && (
        <FloatingForm title="Chỉnh sửa">
          <UpdateForm
            cx={cx}
            admin={{ username: "", password: "", email: "" }}
            handleSubmit={handleAddFormSubmit}
            setShowForm={setShowAddForm}
          />
        </FloatingForm>
      )}
      <Popup yesno popup={deletePopup} setPopup={setDeletePopup} />
      <Popup yesno popup={addFormPopup} setPopup={setAddFormPopup} />
    </>
  );
}

export default AdminManagement;
