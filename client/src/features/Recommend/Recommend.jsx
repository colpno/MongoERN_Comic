import classNames from "classnames/bind";
import { memo, useState } from "react";
import { Container } from "react-bootstrap";
import { AiFillCaretDown } from "react-icons/ai";

import Button from "components/Button";
import CardList from "components/CardList";
import { getAllTitles } from "services/title";
import styles from "./assets/styles/Recommend.module.scss";

const cx = classNames.bind(styles);

function Recommend() {
  const [isExpand, setIsExpand] = useState(false);
  const { titles } = getAllTitles(18);
  const unFoldList = titles.slice(6);
  const foldList = titles.slice(0, 6);

  const showMoreCards = () => {
    isExpand ? setIsExpand(false) : setIsExpand(true);
  };

  return (
    <Container className={cx("recommend")}>
      <div className={cx("head")}>
        <h4 className={cx("title")}>Đề xuất</h4>
        <Button text className={cx("more")} onClick={showMoreCards}>
          <span>Xem thêm</span>
          <AiFillCaretDown className={cx(isExpand ? "rotate" : "")} />
        </Button>
      </div>
      <CardList col={{ md: 2 }} data={foldList} />
      {isExpand && <CardList col={{ md: 2 }} data={unFoldList} />}
    </Container>
  );
}

export default memo(Recommend);
