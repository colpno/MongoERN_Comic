import PropTypes from "prop-types";

import { Button } from "components";

function SearchDropdownGroup({ cx, searchResult }) {
  return (
    <div className={cx("dropdown__group")}>
      <ul>
        {searchResult.map((ttl) => {
          return (
            <li key={ttl._id} className={cx("dropdown__item")}>
              <Button wrapper fullWidth to={`/comic/title/${ttl._id}`}>
                <figure className={cx("dropdown__group__figure")}>
                  <div className={cx("box-img")}>
                    <img src={ttl.cover.source} alt="title" />
                  </div>
                  <figcaption className={cx("dropdown__group__figure__figcaption")}>
                    <h6 className={cx("title")}>{ttl.title}</h6>
                    <span className={cx("author")}>{ttl.author}</span>
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
      cover: PropTypes.shape({
        source: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
        PropTypes.string.isRequired,
      ]).isRequired,
      author: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
        PropTypes.string.isRequired,
      ]).isRequired,
    }).isRequired
  ).isRequired,
};

export default SearchDropdownGroup;
