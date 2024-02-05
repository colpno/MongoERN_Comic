import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { useGetComments, useUpdateComment } from "hooks/index";
import CommentTable from "./components/CommentTable.jsx";
import styles from "./styles/Comment.module.scss";

const cx = classNames.bind(styles);

function Comment() {
  const { data: comments } = useGetComments({
    _embed: JSON.stringify([{ collection: "author", fields: "username" }]),
  });
  const { update: updateComment } = useUpdateComment();

  const handleUpdate = (data, setRowIdError) => {
    const { _id, ...fields } = data;
    updateComment({ id: _id, data: fields }).catch(() => {
      setRowIdError(_id);
    });
  };

  return (
    <Container>
      <Row className={cx("label-wrapper")}>
        <Col>
          <h4 className={cx("label")}>All Comments</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingContainer className={cx("data-rows")}>
            <CommentTable comments={comments} onUpdate={handleUpdate} />
          </FloatingContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default Comment;
