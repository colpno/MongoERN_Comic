import classNames from "classnames/bind";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { sortUsersByProperty } from "services/user";
import AdminManagementCards from "./components/AdminManagementCards";
import AdminTable from "./components/AdminTable";
import styles from "./styles/AdminManagement.module.scss";

const cx = classNames.bind(styles);

function AdminManagement() {
  const {
    users: members,
    pagination,
    setPagination,
    sorting,
  } = sortUsersByProperty("administrator", "index", true);
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "",
    content: "",
  });
  const hasData = members?.length > 0;

  return (
    <Container>
      {hasData && (
        <>
          <Row>
            <AdminManagementCards totalTitles={pagination.total} />
          </Row>
          <Row>
            <h4 className={cx("label")}>All Administrators</h4>
          </Row>
          <FloatingContainer>
            <AdminTable
              sorting={sorting}
              admins={members}
              popup={popup}
              setPopup={setPopup}
              pagination={pagination}
              setPagination={setPagination}
            />
          </FloatingContainer>
        </>
      )}
    </Container>
  );
}

export default AdminManagement;
