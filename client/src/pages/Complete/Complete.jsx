import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import CardList from "components/CardList";
import { NoData } from "features";
import { getAllTitles } from "services/title";
import styles from "./assets/styles/Complete.module.scss";

const cx = classNames.bind(styles);

function Complete() {
  const [titles, setTitles] = useState([]);
  const hasData = titles.length;

  const fetchData = () => {
    getAllTitles({ releaseDay: "finished" })
      .then((response) => setTitles(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className={cx("complete-page")}>
      {hasData ? (
        <CardList
          wrap
          data={titles}
          col={{ xs: 6, sm: 4, md: 20 }}
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
