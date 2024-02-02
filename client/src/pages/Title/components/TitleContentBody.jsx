import classNames from "classnames/bind";
import { Container } from "react-bootstrap";
import styles from "../styles/Title.module.scss";
import TitleAbout from "./TitleAbout.jsx";
import TitleChapters from "./TitleChapters.jsx";

const cx = classNames.bind(styles);

function TitleContentBody() {
  return (
    <Container fluid="md" className={cx("title-page__wrapper__content")}>
      <TitleAbout />
      <section className={cx("chapters")}>
        <TitleChapters />
      </section>
    </Container>
  );
}

export default TitleContentBody;
