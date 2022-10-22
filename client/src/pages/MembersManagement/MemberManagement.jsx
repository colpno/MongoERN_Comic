import classNames from "classnames/bind";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { sortUsersByProperty } from "services/user";
import MemberManagementCards from "./components/MemberManagementCards";
import MemberTable from "./components/MemberTable";
import styles from "./styles/MemberManagement.module.scss";

const cx = classNames.bind(styles);

function MemberManagement() {
  const {
    users: members,
    pagination,
    setPagination,
    sorting,
  } = sortUsersByProperty("member", "index", true);
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
            <MemberManagementCards totalTitles={pagination.total} />
          </Row>
          <Row>
            <h4 className={cx("label")}>All Members</h4>
          </Row>
          <FloatingContainer>
            <MemberTable
              sorting={sorting}
              members={members}
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

export default MemberManagement;
