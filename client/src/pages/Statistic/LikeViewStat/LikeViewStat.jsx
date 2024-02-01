import { memo, useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { sortArray } from "utils/arrayMethods";
import ChapterStatistic from "./components/ChapterStatistic";
import TitleStatistic from "./components/TitleStatistic";

function LikeViewStat() {
  const myTitles = useSelector((state) => state.title.myTitles);
  const titles = useMemo(() => {
    const approvedTitles = myTitles.filter((title) => title.approved_status_id.code === "apd");
    if (myTitles.length > 0) {
      return sortArray([...approvedTitles], "title", "asc");
    }
    return [];
  }, [myTitles]);
  const [selectedTitle, setSelectedTitle] = useState({});

  useEffect(() => {
    if (!selectedTitle.value && titles.length > 0) {
      setSelectedTitle({
        value: titles[0]._id,
        label: titles[0].title,
      });
    }
  }, [titles, selectedTitle]);

  if (!selectedTitle.value) return <div />;

  return (
    <>
      <Row>
        <Col>
          <TitleStatistic
            titles={titles}
            selectedTitle={selectedTitle}
            setSelectedTitle={setSelectedTitle}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChapterStatistic selectedTitle={selectedTitle} />
        </Col>
      </Row>
    </>
  );
}

export default memo(LikeViewStat);
