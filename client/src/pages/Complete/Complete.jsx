import classNames from "classnames/bind";
import { Container } from "react-bootstrap";

import { CardList } from "components";
import { NoData } from "features";
import { useGetTitles } from "hooks/index.jsx";
import { Slide } from "react-awesome-reveal";
import styles from "./Complete.module.scss";

const cx = classNames.bind(styles);

function Complete() {
  const params = {
    params: {
      release_day: "finished",
      _embed: JSON.stringify([
        { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
        { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
      ]),
    },
    isPrivate: false,
  };
  const { data: titles = [] } = useGetTitles(params, false);

  return (
    <Container className={cx("complete-page")}>
      {titles?.length > 0 ? (
        <Slide direction="up" triggerOnce>
          <CardList
            wrap
            data={titles}
            col={{ xs: 6, sm: 4, md: 20 }}
            classN={{ boxImg: cx("box-img") }}
            dropRow={false}
          />
        </Slide>
      ) : (
        <NoData>
          <h5>Không có dữ liệu để hiển thị</h5>
        </NoData>
      )}
    </Container>
  );
}

export default Complete;
