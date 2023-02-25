import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { Loading, Popup } from "features";
import { usePopup, useToast } from "hooks";
import { genreService } from "services";
import GenreTable from "./components/GenreTable";
import styles from "./styles/Genres.module.scss";

const cx = classNames.bind(styles);

function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Toast, options: toastOptions, toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup({
    isShown: false,
    type: "confirm",
  });

  const handleUpdate = (data) => {
    const { _id, ...fields } = data[0];

    setPopup({
      title: "Cập nhật thể loại",
      content: "Bạn có chắc chắn muốn thay đổi không?",
      isShown: true,
      onConfirm: () => {
        genreService
          .update(_id, fields)
          .then((response) => {
            setGenres((prev) =>
              prev.map((item) => (item._id === _id ? { ...response.data } : item))
            );
            toastEmitter(response.message);
          })
          .catch((error) => toastEmitter(error, "error"));
      },
    });
  };

  const handleDelete = (data) => {
    const ids = data instanceof Map ? Array.from(data.keys()) : data;
    const params = {
      _id_in: ids,
    };

    setPopup({
      title: "Xóa thể loại",
      content: "Bạn có chắc chắn muốn xóa không?",
      isShown: true,
      onConfirm: () => {
        genreService
          .delete(params)
          .then((response) => {
            setGenres((prev) =>
              prev.filter((item) =>
                Array.isArray(ids) ? !ids.includes(item._id) : ids !== item._id
              )
            );
            toastEmitter(response.message);
          })
          .catch((error) => toastEmitter(error, "error"));
      },
    });
  };

  useEffect(() => {
    setLoading(true);

    genreService
      .getAll()
      .then((response) => {
        setGenres(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toastEmitter(error, "error");
      });
  }, []);

  return (
    <>
      <Container>
        <Row className={cx("label-wrapper")}>
          <Col>
            <h4 className={cx("label")}>All Genres</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingContainer className={cx("data-rows")}>
              <GenreTable genres={genres} onDelete={handleDelete} onUpdate={handleUpdate} />
            </FloatingContainer>
          </Col>
        </Row>
      </Container>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...toastOptions} />
      {loading && <Loading />}
    </>
  );
}

export default Genres;
