import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Container } from "react-bootstrap";

import { CardListWithTitle } from "components";
import styles from "../../../assets/styles/ComicFollowSection.module.scss";

const cx = classNames.bind(styles);

function ComicFollowSection({ titles, genre }) {
  return (
    <section>
      <Container className={cx("follow")}>
        <CardListWithTitle
          col={{
            xs: 2,
          }}
          data={titles}
          genre={genre}
        />
      </Container>
    </section>
  );
}

ComicFollowSection.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  genre: PropTypes.shape({}).isRequired,
};

export default memo(ComicFollowSection);
