import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { useGetApprovedStatuses, useGetObjectStatuses, useGetTitles, useUpdateTitle } from "hooks";
import { StatTitleApproval, StatTitleStatus, TitleManagementCards, TitleTable } from "./components";

function Titles() {
  const { data: titles } = useGetTitles({
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "code status color" },
      { collection: "status_id", field: "-_id status" },
    ]),
    _fields: "-cover.cloud_public_id -__v -_guid",
  });
  const { data: objectStatuses } = useGetObjectStatuses({
    _fields: "code status",
  });
  const { data: approvedStatuses } = useGetApprovedStatuses({
    _fields: "code status color",
  });
  const { update: updateTitle } = useUpdateTitle();

  const handleUpdate = (data, setRowIdError) => {
    const { _id, approved_status_id: approvedStatusId } = data;

    updateTitle({ id: _id, data: { approved_status_id: approvedStatusId } }).catch(() => {
      setRowIdError(_id);
    });
  };

  return (
    <Container fluid="md">
      <Row>
        <TitleManagementCards titles={titles} />
      </Row>
      <Row>
        <Col>
          <h4>All Titles</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={8}>
          <FloatingContainer>
            <TitleTable
              titles={titles}
              approvedStatuses={approvedStatuses}
              objectStatuses={objectStatuses}
              onUpdate={handleUpdate}
            />
          </FloatingContainer>
        </Col>
        <Col xs={12} lg={4}>
          <Row>
            <Col>
              {titles.length > 0 && (
                <FloatingContainer>
                  <StatTitleApproval titles={titles} approvedStatuses={approvedStatuses} />
                </FloatingContainer>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {titles.length > 0 && (
                <FloatingContainer>
                  <StatTitleStatus titles={titles} statuses={objectStatuses} />
                </FloatingContainer>
              )}
            </Col>
          </Row>
          {/* <Row>
              <Col>
                {titles.length > 0 && (
                  <FloatingContainer>
                    <StatTitleReleaseDay titles={titles} />
                  </FloatingContainer>
                )}
              </Col>
            </Row> */}
        </Col>
      </Row>
    </Container>
  );
}

export default Titles;
