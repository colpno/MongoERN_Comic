import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Loading } from "features";
import { useToast } from "hooks";
import { approvedStatusService, objectStatusService, titleService } from "services";
import { handlePromiseAllSettled } from "utils";
import { StatTitleApproval, StatTitleStatus, TitleManagementCards, TitleTable } from "./components";

const queryParams = {
  titleParams: {
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "code status color" },
      { collection: "status_id", field: "-_id status" },
    ]),
    _fields: "-cover.cloud_public_id -__v -_guid",
  },
  approvedStatusParams: {
    _fields: "code status color",
  },
  objectStatusParams: {
    _fields: "code status",
  },
};

function Titles() {
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const [titles, setTitles] = useState([]);
  const [approvedStatuses, setApprovedStatuses] = useState([]);
  const [objectStatuses, setObjectStatuses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpdate = (data, setRowIdError) => {
    const { _id, approved_status_id: approvedStatusId } = data;

    titleService
      .update(_id, { approved_status_id: approvedStatusId })
      .then((response) => {
        setTitles((prev) => prev.map((item) => (item._id === _id ? { ...response.data } : item)));
        toastEmitter(response.message);
      })
      .catch((error) => {
        setRowIdError(_id);
        toastEmitter(error, "error");
      });
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { approvedStatusParams, objectStatusParams, titleParams } = queryParams;

      const approvedStatusPromise = approvedStatusService.getAll(approvedStatusParams);
      const objectStatusPromise = objectStatusService.getAll(objectStatusParams);
      const titlePromise = titleService.getAll(titleParams);
      const promises = [titlePromise, approvedStatusPromise, objectStatusPromise];

      const results = await Promise.allSettled(promises);
      const { fulfilledResults } = handlePromiseAllSettled(results, toastEmitter);
      const [titleResult, approvedStatusResult, objectStatusResult] = fulfilledResults;

      setLoading(false);
      titleResult && setTitles(titleResult.data);
      approvedStatusResult && setApprovedStatuses(approvedStatusResult.data);
      objectStatusResult && setObjectStatuses(objectStatusResult.data);
    })();
  }, []);

  return (
    <>
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
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default Titles;
