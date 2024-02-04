import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { useAddGenre, useDeleteGenre, useGetGenres, useUpdateGenre } from "hooks/index";
import GenreTable from "./components/GenreTable";
import styles from "./styles/Genres.module.scss";

const cx = classNames.bind(styles);

function Genres() {
  const { data: genres } = useGetGenres();
  const { update: updateGenre } = useUpdateGenre();
  const { del: deleteGenre } = useDeleteGenre();
  const { add: addGenre } = useAddGenre();

  const handleAdd = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    addGenre(fields).catch(() => {
      setRowIdError(_id);
    });
  };

  const handleUpdate = (data, setRowIdError) => {
    const { _id, ...fields } = data;

    updateGenre({ id: _id, data: fields }).catch(() => {
      setRowIdError(_id);
    });
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = { _id_in: ids };
    deleteGenre(params);
  };

  return (
    <Container>
      <Row className={cx("label-wrapper")}>
        <Col>
          <h4 className={cx("label")}>All Genres</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingContainer className={cx("data-rows")}>
            <GenreTable
              genres={genres}
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

export default Genres;
