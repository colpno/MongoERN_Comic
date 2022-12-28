import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { CardList } from "components";
import { genreService, titleService } from "services";
import styles from "./ContentList.module.scss";

const cx = classNames.bind(styles);

function ContentList() {
  const { genreId } = useParams();
  const [titles, setTitles] = useState([]);
  const [genre, setGenre] = useState({});

  const fetchData = () => {
    genreService
      .getOne(genreId)
      .then((genreResponse) => {
        setGenre(genreResponse);

        titleService
          .getAll({ genres_in: genreResponse.data.name })
          .then((titleResponse) => {
            setTitles(titleResponse.data);
          })
          .catch((titleError) => console.log(titleError));
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className={cx("content-list-page")}>
      <Row>
        <Col>
          <h3 className={cx("title")}>{genre.name}</h3>
        </Col>
      </Row>
      <CardList data={titles} col={{ lg: 2 }} />
    </Container>
  );
}

export default ContentList;
