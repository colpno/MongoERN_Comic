import PropTypes from "prop-types";

function ReadingComics({ cx, images }) {
  return (
    <div className={cx("reading-page__content")}>
      {images.map((chapterImage, index) => {
        const { src } = chapterImage;
        return <img src={src} alt="content" key={index} />;
      })}
    </div>
  );
}

ReadingComics.propTypes = {
  cx: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ReadingComics;
