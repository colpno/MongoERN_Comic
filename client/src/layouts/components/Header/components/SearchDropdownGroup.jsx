import Button from "components/Button";
import PropTypes from "prop-types";

function SearchDropdownGroup({ cx, searchResult, label }) {
  return (
    <div className={cx("dropdown__group")}>
      <p className={cx("dropdown__group__title")}>{label}</p>
      <ul>
        {searchResult.map((title) => {
          const { id, coverImage, titleName, authors } = title;
          return (
            <li key={id} className={cx("dropdown__item")}>
              <Button wrapper to={`/comic/title/${id}`}>
                <figure className={cx("dropdown__group__figure")}>
                  <div className={cx("box-img")}>
                    <img src={coverImage} alt="title" />
                  </div>
                  <figcaption
                    className={cx("dropdown__group__figure__figcaption")}
                  >
                    <h6 className={cx("title")}>{titleName}</h6>
                    <span className={cx("author")}>{authors}</span>
                  </figcaption>
                </figure>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

SearchDropdownGroup.propTypes = {
  cx: PropTypes.func.isRequired,
  searchResult: PropTypes.arrayOf(
    PropTypes.shape({
      coverImage: PropTypes.string.isRequired,
      titleName: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
        PropTypes.string.isRequired,
      ]).isRequired,
      authors: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
        PropTypes.string.isRequired,
      ]).isRequired,
    }).isRequired
  ).isRequired,
  label: PropTypes.string.isRequired,
};

export default SearchDropdownGroup;
