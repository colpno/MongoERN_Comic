/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { topSales } from "assets/images";
import { FloatingContainer } from "components";
import AdminCard from "layouts/AdminLayout/components/AdminCard";
import MyTitleContent from "pages/MyTitle/components/MyTitleContent";
import { getTitles } from "services/titleServices";

import styles from "./styles/TitleManagement.module.scss";

const cx = classNames.bind(styles);

function TitleManagement() {
  const { titles, pagination, setPagination } = getTitles(50);

  return (
    <>
      <Container className={cx("wrapper")}>
        <Row>
          <Col md={4}>
            <AdminCard icon={topSales} label="Continuing" amount="123" />
          </Col>
          <Col md={4}>
            <AdminCard icon={topSales} label="Continuing" amount="123" />
          </Col>
          <Col md={4}>
            <AdminCard icon={topSales} label="Continuing" amount="123" />
          </Col>
        </Row>
      </Container>
      <FloatingContainer>
        <MyTitleContent
          titles={titles}
          pagination={pagination}
          setPagination={setPagination}
        />
      </FloatingContainer>
    </>
  );
}

export default TitleManagement;
