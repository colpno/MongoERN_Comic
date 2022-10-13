import titleApi from "api/titleApi";
import classNames from "classnames/bind";
import CardList from "components/CardList";
import NoData from "features/NoData";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./assets/styles/Complete.module.scss";

const cx = classNames.bind(styles);

function Complete() {
  const [titles, setTitles] = useState([]);
  const hasData = titles.length;

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await titleApi.search("titleStatusId", 1);
        setTitles(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchTitles();
  }, []);

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
