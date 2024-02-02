import classNames from "classnames/bind";
import { Comment, Recommend } from "features";
import { Container } from "react-bootstrap";
import TitleContent from "./components/TitleContent";
import styles from "./styles/Title.module.scss";

const cx = classNames.bind(styles);

function Title() {
  return (
    <div className={cx("container")}>
      <Container className={cx("content")}>
        <TitleContent />
        <Comment />
        <Recommend />
      </Container>
    </div>
  );
}

export default Title;
