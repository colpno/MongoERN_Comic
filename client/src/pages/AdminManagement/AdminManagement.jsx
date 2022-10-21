import classNames from "classnames/bind";
import { Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import MyTitleContent from "pages/MyTitle/components/MyTitleContent";
import { sortTitles } from "services/title";
import AdminManagementCards from "./components/AdminManagementCards";
import styles from "./styles/AdminManagement.module.scss";

const cx = classNames.bind(styles);

function AdminManagement() {
  const TITLES_PER_PAGE = 50;
  const { titles, pagination, setPagination, sorting } = sortTitles(
    "index",
    true,
    TITLES_PER_PAGE
  );
  const hasData = titles?.length > 0;

  return (
    <Container>
      {hasData && (
        <>
          <Row>
            <AdminManagementCards totalTitles={pagination.total} />
          </Row>
          <Row>
            <h4 className={cx("label")}>All Titles</h4>
          </Row>
          <FloatingContainer>
            <MyTitleContent
              sorting={sorting}
              titles={titles}
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
