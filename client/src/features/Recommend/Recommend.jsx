/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { memo, useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { AiFillCaretDown } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button, CardList } from "components";
import { titleService } from "services";
import styles from "./Recommend.module.scss";

const cx = classNames.bind(styles);

function Recommend() {
  const { titleId } = useParams();
  const [isExpand, setIsExpand] = useState(false);
  const [titles, setTitles] = useState([]);
  const genresOfTitle = useSelector((state) => state.title.genresOfTitle);
  const unFoldList = useMemo(() => titles?.slice(6), [titles]);
  const foldList = useMemo(() => titles?.slice(0, 6), [titles]);

  const showMoreCards = () => {
    setIsExpand((prev) => !prev);
  };

  useEffect(() => {
    const params = {
      genres_all: genresOfTitle,
      _limit: 18,
    };

    titleService
      .random(params)
      .then((response) => {
        const filtered = response.data.filter((title) => title._id !== titleId);
        setTitles(filtered);
      })
      .catch((error) => console.error(error));
  }, [genresOfTitle]);

  return (
    <>
      {titles.length > 0 ? (
        <Container fluid="md" className={cx("recommend")}>
          <div className={cx("head")}>
            <h4 className={cx("title")}>Đề xuất</h4>
            <Button text className={cx("more")} onClick={showMoreCards}>
              <span>Xem thêm</span>
              <AiFillCaretDown className={cx(isExpand ? "rotate" : "")} />
            </Button>
          </div>
          <CardList wrap col={{ xs: 6, sm: 3, xl: 2 }} data={foldList} />
          {isExpand && <CardList wrap col={{ xs: 6, sm: 3, xl: 2 }} data={unFoldList} />}
        </Container>
      ) : null}
      {}
    </>
  );
}

export default memo(Recommend);
