import classNames from "classnames/bind";
import CardList from "components/CardList";
import { NoData } from "features";
import { Container } from "react-bootstrap";
import getAllTitlesByProperty from "services/title/getAllTitlesByProperty";
import styles from "./assets/styles/Complete.module.scss";

const cx = classNames.bind(styles);

function Complete() {
  const { titles } = getAllTitlesByProperty("status", "finished");
  const hasData = titles.length;

  return (
    <Container className={cx("complete-page")}>
      {hasData ? (
        <CardList
          data={titles}
          col={{ md: 20 }}
          classN={{ boxImg: cx("box-img") }}
        />
      ) : (
        <NoData>
          <h5>Không có dữ liệu để hiển thị</h5>
        </NoData>
      )}
    </Container>
  );
}

export default Complete;
