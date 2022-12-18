import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData } from "features";
import { getAllChapters } from "services/chapter";
import { getAllChapterReports } from "services/chapterReport";
import { getAllTitleReports } from "services/titleReport";
import { getChartColors, getMonthArray } from "utils/constants";
import { formatTime } from "utils/convertTime";
import ChapterStatistic from "./components/ChapterStatistic";
import TitleStatistic from "./components/TitleStatistic";
import styles from "./styles/Statistic.module.scss";

const cx = classNames.bind(styles);

function Statistic() {
  // INFO: Data variables

  const titles = useSelector((state) => state.title.myTitles);
  const [titleReports, setTitleReports] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [chapterReports, setChapterReports] = useState([]);
  const [ID, setID] = useState({
    titleID: "",
    chapterID: "",
  });

  const fetchTitleReports = (params) => {
    getAllTitleReports(params)
      .then((response) => setTitleReports(response))
      .catch((error) => console.log(error));
  };

  const fetchChapterReports = (params) => {
    getAllChapterReports(params)
      .then((response) => setChapterReports(response))
      .catch((error) => console.log(error));
  };

  const fetchChapters = (params) => {
    getAllChapters(params)
      .then((response) => setChapters(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    titles.length > 0 && fetchChapters({ titleId: titles[0].guid });
  }, [titles]);

  useEffect(() => {
    ID.titleID && fetchChapters({ titleId: ID.titleID });
  }, [ID.titleID]);

  useEffect(() => {
    ID.chapterID &&
      fetchChapterReports({
        chapterId: ID.chapterID,
      });
  }, [ID.chapterID]);

  useEffect(() => {
    ID.titleID &&
      fetchTitleReports({
        titleId: ID.titleID,
      });
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
  const { month: currentMonth, year: currentYear } = useMemo(() => {
    return formatTime(new Date());
  }, []);
  const [chartData, setChartData] = useState({
    title: {
      likes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      views: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    chapter: {
      likes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      views: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  });

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

  // INFO: Calculate views and likes

  const getReportByTitle = (reports = [], titleId = "") => {
    return reports.filter((report) => report.titleId === titleId);
  };

  const getReportByChapter = (reports = [], chapterId = "") => {
    return reports.filter((report) => report.chapterId === chapterId);
  };

  const getViews = (reports = [], year = currentYear) => {
    const views = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const reportsByYear = reports.filter((report) => report.year === year);
    reportsByYear.forEach((report) => {
      const { month } = report;
      views[month] = report.view;
    });

    return views;
  };

  const getLikes = (reports = [], year = currentYear) => {
    const likes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const reportsByYear = reports.filter((report) => report.year === year);
    reportsByYear.forEach((report) => {
      const { month } = report;
      likes[month] = report.like;
    });

    return likes;
  };

  useEffect(() => {
    const reports = getReportByTitle(titleReports, ID.titleID);
    const likes = getLikes(reports);
    const views = getViews(reports);

    setChartData((prev) => ({
      ...prev,
      title: { likes, views },
    }));
  }, [titleReports, ID.titleID]);

  useEffect(() => {
    const reports = getReportByChapter(chapterReports, ID.chapterID);
    const likes = getLikes(reports);
    const views = getViews(reports);

    setChartData((prev) => ({
      ...prev,
      chapter: { likes, views },
    }));
  }, [chapterReports, ID.chapterID]);

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
