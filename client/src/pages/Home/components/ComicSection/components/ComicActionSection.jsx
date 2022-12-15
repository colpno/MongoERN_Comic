import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Container } from "react-bootstrap";

import { CardListWithTitle } from "components";
import styles from "../../../assets/styles/ComicActionSection.module.scss";

const cx = classNames.bind(styles);

function ComicActionSection({ titles, genre }) {
  return (
    <section>
      <Container className={cx("action")}>
        <CardListWithTitle
          col={{
            xs: 10,
            md: 7,
            lg: 4,
          }}
          data={titles}
          genre={genre}
        />
      </Container>
    </section>
  );
}

ComicActionSection.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  genre: PropTypes.shape({}).isRequired,
};

export default memo(ComicActionSection);
