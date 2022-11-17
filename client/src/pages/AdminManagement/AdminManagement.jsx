import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

import { Button, FloatingContainer, FloatingForm } from "components";
import { Popup, ProgressCircle } from "features";
import { useAdd, useDelete, useToast } from "hooks";
import { register } from "services/auth";
import { deleteUser, filterUser, sortUsersByProperty } from "services/user";
import AdminTable from "./components/AdminTable";
import UpdateForm from "./components/UpdateForm";
import styles from "./styles/AdminManagement.module.scss";

const cx = classNames.bind(styles);

function AdminManagement() {
  const searchText = useSelector((state) => state.global.searchText);
  const {
    users: admins,
    setUsers: setAdmins,
    pagination,
    setPagination,
    sorting,
    fetchUser,
  } = sortUsersByProperty({ role: "admin" }, "id", true);
  const { users: filteredAdmins, fetch: fetchFilteredUsers } = filterUser(
    null,
    pagination.limit
  );
  const [progress, setProgress] = useState(0);
  const { Toast, options: toastOptions, toastEmitter } = useToast();

  const hasData = admins?.length > 0;

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
    register(data)
      .then((value) => {
        if (value.affectedRows > 0) {
          toastEmitter("Tài khoản admin đã được thêm thành công", "success");
          setProgress(0);
          setShowAddForm(false);
          fetchUser();
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  const {
    deletedItem,
    popup: deletePopup,
    setDeletedItem,
    setPopup: setDeletePopup,
  } = useDelete(async () => {
    deleteUser(deletedItem, setProgress)
      .then((value) => {
        if (value.affectedRows > 0) {
          toastEmitter("Tài khoản admin đã được xóa thành công", "success");
          setProgress(0);
          fetchUser();
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error || error.data.message, "error");
        setProgress(0);
      });
  });

  useEffect(() => {
    if (searchText.length > 0) {
      const data = {
        username: searchText,
      };
      fetchFilteredUsers(data);
    }
    if (searchText.length === 0) {
      fetchUser();
    }
  }, [searchText]);

  useEffect(() => {
    filteredAdmins.length > 0 ? setAdmins(filteredAdmins) : fetchUser();
  }, [filteredAdmins]);

  return (
    <>
      <Container>
        {hasData && (
          <>
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
                admins={admins}
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
      <Toast {...toastOptions} />
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default AdminManagement;
