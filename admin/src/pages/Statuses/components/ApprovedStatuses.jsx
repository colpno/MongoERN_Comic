import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import {
  useAddApprovedStatus,
  useDeleteApprovedStatus,
  useGetApprovedStatuses,
  useUpdateApprovedStatus,
} from "hooks";
import ApprovedStatusTable from "./ApprovedStatusTable";
import styles from "../styles/Statuses.module.scss";

const cx = classNames.bind(styles);

function ApprovedStatuses() {
  const { data: statuses } = useGetApprovedStatuses();
  const { add: addStatus } = useAddApprovedStatus();
  const { update: updateStatus } = useUpdateApprovedStatus();
  const { delete: deleteStatus } = useDeleteApprovedStatus();

  const handleUpdate = (data) => {
    const { _id, ...fields } = data;
    updateStatus({ id: _id, data: fields });
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };
    deleteStatus(params);
  };

  const handleAdd = (data, setRowIdError) => {
    addStatus(data).catch(() => {
      setRowIdError(data._id);
    });
  };

  return (
    <Container>
      <Row className={cx("label-wrapper")}>
        <Col>
          <h4 className={cx("label")}>All Approved Statuses</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingContainer>
            <ApprovedStatusTable
              statuses={statuses}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onAdd={handleAdd}
            />
          </FloatingContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default ApprovedStatuses;
