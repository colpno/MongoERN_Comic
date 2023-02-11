import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { CardList } from "components";
import { NoData } from "features";
import { titleService } from "services";
import styles from "./Complete.module.scss";

const cx = classNames.bind(styles);

function Complete() {
  const [titles, setTitles] = useState([]);

  const fetchData = () => {
    titleService
      .getAll(
        {
          release_day: "finished",
          _embed: JSON.stringify([
            { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
            { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
          ]),
        },
        false
      )
      .then((response) => setTitles(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className={cx("complete-page")}>
      {titles.length > 0 ? (
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
