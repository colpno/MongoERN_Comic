import CardList from "components/CardList";
import PropTypes from "prop-types";
import { memo } from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "../../../assets/styles/ComicActionSection.module.scss";

const cx = classNames.bind(styles);

function ComicActionSection({ titles, headTitle }) {
  return (
    <section>
      <Container className={cx("action")}>
        <CardList
          col={{
            sm: 4,
          }}
          data={titles}
          headTitle={headTitle}
        />
      </Container>
    </section>
  );
}

ComicActionSection.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  headTitle: PropTypes.string.isRequired,
};

export default memo(ComicActionSection);
