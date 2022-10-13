import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { memo } from "react";
import { Container } from "react-bootstrap";

import CardList from "components/CardList";
import styles from "../../../assets/styles/ComicFollowSection.module.scss";

const cx = classNames.bind(styles);

function ComicFollowSection({ titles, headTitle }) {
  return (
    <section>
      <Container className={cx("follow")}>
        <CardList
          col={{
            sm: 2,
          }}
          data={titles}
          headTitle={headTitle}
        />
      </Container>
    </section>
  );
}

ComicFollowSection.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  headTitle: PropTypes.string.isRequired,
};

export default memo(ComicFollowSection);
