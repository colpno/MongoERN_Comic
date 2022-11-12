/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { LineChart, NoData } from "features";
import { getAllChapters, getAllChaptersByTitleID } from "services/chapter";
import { getAllChapterReportsByProperty } from "services/chapterReport";
import { getAllTitleReportsByProperty } from "services/titleReport";
import { getChartColors, getMonthArray } from "utils/constants";
import { formatTime } from "utils/convertTime";
import SelectorContainer from "./components/SelectorContainer";
import styles from "./styles/Statistic.module.scss";

const cx = classNames.bind(styles);

function Statistic() {
  const months = getMonthArray();
  const { backgroundColors, borderColors } = getChartColors();
  const titles = useSelector((state) => state.myTitles.titles);
  const { month: currentMonth, year: currentYear } = useMemo(() => {
    return formatTime(new Date());
  }, []);
  const chartLabels = useMemo(
    () => [
      ...months.slice(currentMonth),
      ...months.slice(0, currentMonth - 1),
      "Tháng hiện tại",
    ],
    []
  );
  const [ID, setID] = useState({ titleID: 1, chapterID: 1 });
  const { chapters } = getAllChaptersByTitleID(ID.titleID);
  const titleSelectOptions = useMemo(
    () =>
      titles.length > 0
        ? titles.reduce((options, title) => {
            return [...options, { value: title.id, label: title.name }];
          }, [])
        : [],
    [chapters]
  );
  const chapterSelectOptions = useMemo(
    () =>
      chapters.length > 0
        ? chapters.reduce((options, chapter) => {
            return [...options, { value: chapter.id, label: chapter.name }];
          }, [])
        : [],
    [ID.titleID, chapters]
  );
  const {
    titleReports,
    chartLikeData: titleReportLikes,
    chartViewData: titleReportViews,
  } = getAllTitleReportsByProperty({ titleId: ID.titleID });
  const {
    chapterReports,
    chartLikeData: chapterReportLikes,
    chartViewData: chapterReportViews,
  } = getAllChapterReportsByProperty({ chapterId: ID.chapterID });

  const [titleChart, setTitleChart] = useState({ likeData: [], viewData: [] });
  useEffect(() => {
    if (titleReportLikes[currentYear]?.length > 0) {
      const likes = [
        ...titleReportLikes[currentYear].slice(currentMonth),
        ...titleReportLikes[currentYear].slice(0, currentMonth),
      ];
      const views = [
        ...titleReportViews[currentYear].slice(currentMonth),
        ...titleReportViews[currentYear].slice(0, currentMonth),
      ];
      setTitleChart({ likeData: likes, viewData: views });
    }
  }, [titleReports]);

  const [chapterChart, setChapterChart] = useState({
    likeData: [],
    viewData: [],
  });
  useEffect(() => {
    if (chapterReportLikes[currentYear]?.length > 0) {
      const likes = [
        ...chapterReportLikes[currentYear].slice(currentMonth),
        ...chapterReportLikes[currentYear].slice(0, currentMonth),
      ];
      const views = [
        ...chapterReportViews[currentYear].slice(currentMonth),
        ...chapterReportViews[currentYear].slice(0, currentMonth),
      ];
      setChapterChart({ likeData: likes, viewData: views });
    }

    if (chapterSelectOptions.length <= 0) {
      setChapterChart({
        likeData: [],
        viewData: [],
      });
    }
  }, [chapterReports, chapterSelectOptions]);

  const hasData = titles.length > 0;

  const handleTitleChange = (value) => {
    setID({ ...ID, titleID: value.value });
  };

  const handleChapterChange = (value) => {
    setID({ ...ID, chapterID: value.value });
  };

  return (
    <Container className={cx("wrapper")}>
      {hasData ? (
        <Row>
          <Col md={8}>
            {titleSelectOptions.length > 0 && (
              <SelectorContainer
                cx={cx}
                titleLabel="Truyện"
                options={titleSelectOptions}
                handleChange={handleTitleChange}
              />
            )}
            <Row>
              <LineChart
                labels={chartLabels}
                datasets={[
                  {
                    label: "Lượt xem",
                    data: titleChart.viewData,
                    backgroundColor: backgroundColors[6],
                    borderColor: borderColors[6],
                    borderWidth: 3,
                  },
                  {
                    label: "Lượt thích",
                    data: titleChart.likeData,
                    backgroundColor: backgroundColors[7],
                    borderColor: borderColors[7],
                    borderWidth: 3,
                  },
                ]}
              />
            </Row>
          </Col>
          <Col md={4}>
            {chapterSelectOptions.length > 0 && (
              <SelectorContainer
                cx={cx}
                titleLabel="Chương"
                options={chapterSelectOptions}
                handleChange={handleChapterChange}
              />
            )}
            <Row>
              <LineChart
                labels={chartLabels}
                datasets={[
                  {
                    label: "Lượt xem",
                    data: chapterChart.viewData,
                    backgroundColor: backgroundColors[6],
                    borderColor: borderColors[6],
                  },
                ]}
              />
            </Row>
            <Row>
              <LineChart
                labels={chartLabels}
                datasets={[
                  {
                    label: "Lượt thích",
                    data: chapterChart.likeData,
                    backgroundColor: backgroundColors[7],
                    borderColor: borderColors[7],
                  },
                ]}
              />
            </Row>
          </Col>
        </Row>
      ) : (
        <NoData>
          <h5>Hiện tại chưa có dữ liệu để thống kê!</h5>
          <small>Vui lòng quay lại sau nhé!</small>
        </NoData>
      )}
    </Container>
  );
}

export default Statistic;
