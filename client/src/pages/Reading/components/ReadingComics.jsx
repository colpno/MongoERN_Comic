import PropTypes from "prop-types";

function ReadingComics({ cx, images }) {
  return (
    <div className={cx("reading-page__content")}>
      {images.map((image, index) => {
        return <img src={image} alt="content" key={index} />;
      })}
    </div>
  );
}

ReadingComics.propTypes = {
  cx: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ReadingComics;
