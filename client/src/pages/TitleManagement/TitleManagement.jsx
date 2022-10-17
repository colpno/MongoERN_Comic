import classNames from "classnames/bind";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { FloatingContainer } from "components";
import { setSearchResult } from "libs/redux/slices/searchSlice";
import MyTitleContent from "pages/MyTitle/components/MyTitleContent";
import { getTitles } from "services/titleServices";
import TitleManagementCards from "./components/TitleManagementCards";
import {
  getContinuingCardData,
  getFinishedCardData,
  getPausedCardData,
} from "./const";
import styles from "./styles/TitleManagement.module.scss";

const cx = classNames.bind(styles);

function TitleManagement() {
  const TITLES_PER_PAGE = 50;
  const { titles, pagination, setPagination } = getTitles(TITLES_PER_PAGE);
  const { titles: allTitles } = getTitles();
  const total = 214;
  const continuingCardData = getContinuingCardData(total, 123);
  const pausedCardData = getPausedCardData(total, 23);
  const finishedCardData = getFinishedCardData(total, 50);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchResult([...allTitles]));
  }, []);

  return (
    <Container>
      <TitleManagementCards
        continuingCardData={continuingCardData}
        pausedCardData={pausedCardData}
        finishedCardData={finishedCardData}
      />
      <Row>
        <h4 className={cx("label")}>All Titles</h4>
      </Row>
      <FloatingContainer>
        <MyTitleContent
          titles={titles}
          pagination={pagination}
          setPagination={setPagination}
        />
      </FloatingContainer>
    </Container>
  );
}

export default TitleManagement;
