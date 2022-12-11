/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData } from "features";
import { getAllChaptersByTitleID } from "services/chapter";
import { getAllChapterReportsByProperty } from "services/chapterReport";
import { getAllTitleReportsByProperty } from "services/titleReport";
import { getChartColors, getMonthArray } from "utils/constants";
import { formatTime } from "utils/convertTime";
import ChapterStatistic from "./components/ChapterStatistic";
import TitleStatistic from "./components/TitleStatistic";
import styles from "./styles/Statistic.module.scss";

const cx = classNames.bind(styles);

function Statistic() {
  // INFO: Data variables

  const titles = useSelector((state) => state.myTitles.titles);
  const [titleReports, setTitleReports] = useState([]);
  const [chapterReports, setChapterReports] = useState([]);
  const { chapters, fetchAllChapters } = getAllChaptersByTitleID();
  const [ID, setID] = useState({
    titleID: "",
    chapterID: "",
  });

  const {
    chartLikeData: titleReportLikes,
    chartViewData: titleReportViews,
    fetchAllTitlesByProperty,
  } = getAllTitleReportsByProperty();
  const {
    chartLikeData: chapterReportLikes,
    chartViewData: chapterReportViews,
    fetchAllChapterReportsByProperty,
  } = getAllChapterReportsByProperty();

  useEffect(() => {
    const fetchChapters = async () => {
      await fetchAllChapters(titles[0].guid);
    };

    titles.length > 0 && fetchChapters();
  }, [titles]);

  useEffect(() => {
    const fetchChapters = async () => {
      await fetchAllChapters(ID.titleID);
    };

    ID.titleID && fetchChapters();
  }, [ID.titleID]);

  useEffect(() => {
    const fetchChapterReports = async () => {
      const chapterReportArray = await fetchAllChapterReportsByProperty({
        chapterId: ID.chapterID,
      });
      setTitleReports(chapterReportArray);
    };

    ID.chapterID && fetchChapterReports();
  }, [ID.chapterID]);

  useEffect(() => {
    const fetchTitleReports = async () => {
      const titleReportArray = await fetchAllTitlesByProperty({
        titleId: ID.titleID,
      });
      setTitleReports(titleReportArray);
    };

    ID.titleID && fetchTitleReports();
  }, [ID.titleID]);

  useEffect(() => {
    if (titles.length > 0 && chapters.length > 0) {
      setID({
        titleID: titles[0].guid,
        chapterID: chapters[0].guid,
      });
    }
  }, [titles, chapters]);

  // INFO: Chart variables

  const months = getMonthArray();
  const { backgroundColors, borderColors } = getChartColors();

  const [chartData, setChartData] = useState({
    title: {
      like: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      view: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    chapter: {
      like: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      view: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  });

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

  // INFO: Select control options

  const titleSelectOptions = useMemo(
    () =>
      titles.length > 0
        ? titles.reduce((options, title) => {
            return [...options, { value: title.guid, label: title.name }];
          }, [])
        : [],
    [titles]
  );

  const chapterSelectOptions =
    chapters.length > 0
      ? chapters.reduce((options, chapter) => {
          return [...options, { value: chapter.guid, label: chapter.name }];
        }, [])
      : [];

  // INFO: Calculate title's views and likes

  useEffect(() => {
    if (titleReportLikes && titleReportLikes[currentYear]?.length > 0) {
      const likes = [
        ...titleReportLikes[currentYear].slice(currentMonth),
        ...titleReportLikes[currentYear].slice(0, currentMonth),
      ];
      const views = [
        ...titleReportViews[currentYear].slice(currentMonth),
        ...titleReportViews[currentYear].slice(0, currentMonth),
      ];

      setChartData((prev) => ({
        ...prev,
        title: { like: likes, view: views },
      }));
    }
  }, [titleReports]);

  // INFO: Calculate chapter's views and likes

  useEffect(() => {
    if (chapterReportLikes && chapterReportLikes[currentYear]?.length > 0) {
      const likes = [
        ...chapterReportLikes[currentYear].slice(currentMonth),
        ...chapterReportLikes[currentYear].slice(0, currentMonth),
      ];
      const views = [
        ...chapterReportViews[currentYear].slice(currentMonth),
        ...chapterReportViews[currentYear].slice(0, currentMonth),
      ];

      setChartData((prev) => ({
        ...prev,
        chapter: { like: likes, viewData: views },
      }));
    }
  }, [chapterReports, chapterSelectOptions]);

  const changeTitle = (option) => {
    setID({ ...ID, titleID: option.value });
  };

  const changeChapter = (option) => {
    setID({ ...ID, chapterID: option.value });
  };

  return (
    <Container className={cx("wrapper")}>
      {titleSelectOptions.length > 0 ? (
        <Row>
          <Col md={8}>
            <TitleStatistic
              cx={cx}
              titleSelectOptions={titleSelectOptions}
              changeTitle={changeTitle}
              chartLabels={chartLabels}
              chartData={chartData.title}
              backgroundColors={backgroundColors}
              borderColors={borderColors}
            />
          </Col>
          <Col md={4}>
            {chapterSelectOptions.length > 0 ? (
              <ChapterStatistic
                cx={cx}
                chapterSelectOptions={chapterSelectOptions}
                changeChapter={changeChapter}
                chartData={chartData.chapter}
                chartLabels={chartLabels}
                backgroundColors={backgroundColors}
                borderColors={borderColors}
              />
            ) : (
              <NoData>
                <h5>Truyện không có chương nào để thống kê</h5>
              </NoData>
            )}
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
