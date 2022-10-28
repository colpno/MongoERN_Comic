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
                <img src={title.coverImage} alt={title.titleName} />
              </div>
              <div>
                <p className={cx("title")}>{title.titleName}</p>
                <p className={cx("authors")}>{chapter.titleName}</p>
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
        coverImage: PropTypes.string.isRequired,
        titleName: PropTypes.string.isRequired,
      }).isRequired,
      chapter: PropTypes.shape({
        id: PropTypes.string.isRequired,
        titleName: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  cx: PropTypes.func.isRequired,
};

export default HiredChaptersTableRow;
