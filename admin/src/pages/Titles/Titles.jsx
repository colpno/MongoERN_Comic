import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { useGetApprovedStatuses, useGetTitles } from "hooks";
import {
  StatTitleApproval,
  StatTitleReleaseDay,
  StatTitleStatus,
  TitleManagementCards,
  TitleTable,
} from "./components";

function Titles() {
  const { data: titles } = useGetTitles({
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "code status color" },
      { collection: "status_id", field: "-_id status" },
    ]),
    _fields: "-cover.cloud_public_id -__v -_guid",
  });
  const { data: approvedStatuses } = useGetApprovedStatuses({
    _fields: "code status color",
  });

  return (
    <Container fluid="md">
      <Row>
        <TitleManagementCards titles={titles} />
      </Row>
      <Row>
        <Col xs={12} lg={8}>
          <h4>All Titles</h4>
          <FloatingContainer>
            <TitleTable titles={titles} approvedStatuses={approvedStatuses} />
          </FloatingContainer>
        </Col>
        <Col xs={12} lg={4}>
          <Row>
            <Col>
              <FloatingContainer>
                <StatTitleApproval titles={titles} approvedStatuses={approvedStatuses} />
              </FloatingContainer>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingContainer>
                <StatTitleStatus titles={titles} />
              </FloatingContainer>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingContainer>
                <StatTitleReleaseDay titles={titles} />
              </FloatingContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Titles;
