import classNames from "classnames/bind";
import { memo, useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { AiFillCaretDown } from "react-icons/ai";

import { Button, CardList } from "components";
import { titleService } from "services";
import styles from "./Recommend.module.scss";

const cx = classNames.bind(styles);

function Recommend() {
  const [isExpand, setIsExpand] = useState(false);
  const [titles, setTitles] = useState([]);
  const unFoldList = useMemo(() => titles?.slice(6), [titles]);
  const foldList = useMemo(() => titles?.slice(0, 6), [titles]);

  const fetchData = () => {
    titleService
      .getAll({ _limit: 18, _page: 1 })
      .then((response) => setTitles(response.data))
      .catch((error) => console.error(error));
  };

  const showMoreCards = () => {
    setIsExpand((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid="md" className={cx("recommend")}>
      <div className={cx("head")}>
        <h4 className={cx("title")}>Đề xuất</h4>
        <Button text className={cx("more")} onClick={showMoreCards}>
          <span>Xem thêm</span>
          <AiFillCaretDown className={cx(isExpand ? "rotate" : "")} />
        </Button>
      </div>
      <CardList wrap col={{ xs: 6, sm: 3, xl: 2 }} data={foldList} />
      {isExpand && (
        <CardList wrap col={{ xs: 6, sm: 3, xl: 2 }} data={unFoldList} />
      )}
    </Container>
  );
}

export default memo(Recommend);
