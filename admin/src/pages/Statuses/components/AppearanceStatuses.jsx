import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import {
  useAddObjectStatus,
  useDeleteObjectStatus,
  useGetObjectStatuses,
  useUpdateObjectStatus,
} from "hooks";
import AppearanceStatusTable from "./AppearanceStatusTable";
import styles from "../styles/Statuses.module.scss";

const cx = classNames.bind(styles);

function AppearanceStatuses() {
  const { data: statuses } = useGetObjectStatuses();
  const { add: addStatus } = useAddObjectStatus();
  const { update: updateStatus } = useUpdateObjectStatus();
  const { delete: deleteStatus } = useDeleteObjectStatus();

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
          <h4 className={cx("label")}>All Appearance Statuses</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingContainer>
            <AppearanceStatusTable
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

export default AppearanceStatuses;
