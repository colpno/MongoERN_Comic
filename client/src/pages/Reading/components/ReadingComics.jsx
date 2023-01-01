import PropTypes from "prop-types";

function ReadingComics({ cx, images }) {
  return (
    <div className={cx("reading-page__content")}>
      {images.map((chapterImage, index) => {
        const { source } = chapterImage;
        return <img src={source} alt="content" key={index} />;
      })}
    </div>
  );
}

ReadingComics.propTypes = {
  cx: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ReadingComics;
