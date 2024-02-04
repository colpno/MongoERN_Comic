import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { useDeleteUser, useGetUsers, useRegisterUser, useUpdateUser } from "hooks";
import AdminTable from "./components/AdminTable";

function Admins() {
  const { data: admins } = useGetUsers({ role: "administrator" });
  const { register } = useRegisterUser();
  const { update: updateUser } = useUpdateUser();
  const { del: deleteUser } = useDeleteUser();

  const handleAdd = (data, setRowIdError) => {
    const { _id, ...fields } = data;
    register(fields).catch(() => {
      setRowIdError(_id);
    });
  };

  const handleUpdate = (data, setRowIdError) => {
    updateUser(data).catch(() => {
      setRowIdError(data._id);
    });
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    deleteUser(params);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h4>All Administrators</h4>
        </Col>
      </Row>
      <FloatingContainer>
        {admins.length > 0 && (
          <AdminTable
            admins={admins}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
          />
        )}
      </FloatingContainer>
    </Container>
  );
}

export default Admins;
