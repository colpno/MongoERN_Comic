import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

function HiredChaptersTableRow({ titlesAndChapters, cx }) {
  return (
    <>
      {titlesAndChapters.map((object) => {
        const { title, chapter } = object;

        return (
          <Row className={cx("transaction__container")} key={chapter.id}>
            <Col md={8} className={cx("transaction__container__content")}>
              <div className={cx("box-img")}>
                <img src={title.cover} alt={title.name} />
              </div>
              <div>
                <p className={cx("title")}>{title.name}</p>
                <p className={cx("author")}>{chapter.name}</p>
              </div>
            </Col>
          </Row>
        );
      })}{" "}
    </>
  );
}

HiredChaptersTableRow.propTypes = {
  titlesAndChapters: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.shape({
        cover: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      chapter: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  cx: PropTypes.func.isRequired,
};

export default HiredChaptersTableRow;
