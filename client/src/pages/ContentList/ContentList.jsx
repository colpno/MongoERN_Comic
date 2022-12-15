import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import CardList from "components/CardList";
import { getGenre } from "services/genre";
import { getAllTitles } from "services/title";
import styles from "./assets/styles/ContentList.module.scss";

const cx = classNames.bind(styles);

function ContentList() {
  const { genreId } = useParams();
  const [titles, setTitles] = useState([]);
  const [genre, setGenre] = useState({});

  const fetchData = () => {
    const titlesPromise = getAllTitles({ embed: "title_genre", genreId });
    const genrePromise = getGenre(genreId);

    Promise.all([titlesPromise, genrePromise])
      .then(([titlesResponse, genreResponse]) => {
        setTitles(titlesResponse);
        setGenre(genreResponse);
      })
      .catch((error) => console.log(error));
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
