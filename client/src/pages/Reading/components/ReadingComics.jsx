import PropTypes from "prop-types";

function ReadingComics({ cx, images }) {
  return (
    <div className={cx("reading-page__content")}>
      {images.map((chapterImage) => {
        const { id, image } = chapterImage;
        return <img src={image} alt="content" key={id} />;
      })}
    </div>
  );
}

ReadingComics.propTypes = {
  cx: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ReadingComics;
