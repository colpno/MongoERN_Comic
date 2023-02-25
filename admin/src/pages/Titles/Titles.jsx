import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Loading, Popup } from "features";
import { usePopup, useToast } from "hooks";
import { approvedStatusService, objectStatusService, titleService } from "services";
import { handlePromiseAllSettled } from "utils";
import {
  StatTitleStatus,
  StatTitleReleaseDay,
  TitleManagementCards,
  TitlesTable,
} from "./components";

const queryParams = {
  titleParams: {
    _embed: JSON.stringify([
      { collection: "approved_status_id", fields: "code status color" },
      { collection: "status_id", field: "-_id status" },
    ]),
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
  const { popup, setPopup, triggerPopup } = usePopup({
    type: "confirm",
  });

  const handleUpdate = (editedInfo) => {
    const { _id, ...fields } = editedInfo[0];

    setPopup({
      title: "Cập nhật tài khoản",
      content: "Bạn có chắc chắn muốn thay đổi không?",
      isShown: true,
      onConfirm: () => {
        titleService
          .update(_id, fields)
          .then((response) => {
            setTitles((prev) =>
              prev.map((item) => (item._id === _id ? { ...response.data } : item))
            );
            toastEmitter(response.message);
          })
          .catch((error) => toastEmitter(error));
      },
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
              <TitlesTable
                titles={titles}
                approvedStatuses={approvedStatuses}
                onRowEditCommit={handleUpdate}
              />
            </FloatingContainer>
          </Col>
          <Col xs={12} lg={4}>
            <Row>
              <Col>
                {titles.length > 0 && (
                  <FloatingContainer>
                    <StatTitleStatus titles={titles} statuses={objectStatuses} />
                  </FloatingContainer>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {titles.length > 0 && (
                  <FloatingContainer>
                    <StatTitleReleaseDay titles={titles} />
                  </FloatingContainer>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default Titles;
