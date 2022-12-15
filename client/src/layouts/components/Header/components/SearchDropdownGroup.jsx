import PropTypes from "prop-types";

import Button from "components/Button";

function SearchDropdownGroup({ cx, searchResult, label }) {
  return (
    <div className={cx("dropdown__group")}>
      <p className={cx("dropdown__group__title")}>{label}</p>
      <ul>
        {searchResult.map((title) => {
          const { id, cover, name, author } = title;
          return (
            <li key={id} className={cx("dropdown__item")}>
              <Button wrapper fullWidth to={`/comic/title/${id}`}>
                <figure className={cx("dropdown__group__figure")}>
                  <div className={cx("box-img")}>
                    <img src={cover} alt="title" />
                  </div>
                  <figcaption
                    className={cx("dropdown__group__figure__figcaption")}
                  >
                    <h6 className={cx("title")}>{name}</h6>
                    <span className={cx("author")}>{author}</span>
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
      cover: PropTypes.string.isRequired,
      name: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
        PropTypes.string.isRequired,
      ]).isRequired,
      author: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
        PropTypes.string.isRequired,
      ]).isRequired,
    }).isRequired
  ).isRequired,
  label: PropTypes.string.isRequired,
};

export default SearchDropdownGroup;
