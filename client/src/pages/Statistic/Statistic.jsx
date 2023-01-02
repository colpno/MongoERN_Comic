import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData } from "features";
import { chapterReportService, chapterService } from "services";
import { getChartColors, getMonthArray } from "utils/constants";
import getYearOptions from "utils/getYearOptions";
import ChapterStatistic from "./components/ChapterStatistic";
import TitleStatistic from "./components/TitleStatistic";
import styles from "./styles/Statistic.module.scss";

const cx = classNames.bind(styles);

function Statistic() {
  // INFO: Data variables

  const yearOptions = getYearOptions();

  const [selectedTitle, setSelectedTitle] = useState({});
  const [selectedChapter, setSelectedChapter] = useState({});

  const [titleReportYear, setTitleReportYear] = useState(yearOptions[0]);
  const [chapterReportYear, setChapterReportYear] = useState(yearOptions[0]);

  const titles = useSelector((state) => state.title.myTitles);
  const [chapters, setChapters] = useState([]);

  // TODO: const [titleReports, setTitleReports] = useState([]);
  const [chapterReports, setChapterReports] = useState([]);

  const fetchChapters = (params) => {
    // get only title and _id fields
    params.fields = "title";

    chapterService
      .getAll(params)
      .then((response) => setChapters(response.data))
      .catch((error) => console.error(error));
  };

  // fetch all chapters of selected chapter
  useEffect(() => {
    if (selectedTitle?.value) {
      fetchChapters({ title_id: selectedTitle.value });
    }
  }, [selectedTitle]);

  // fetch all reports of selected chapter
  useEffect(() => {
    if (selectedChapter?.value) {
      const params = {
        chapter_id: selectedChapter.value,
        year: chapterReportYear.value,
      };

      chapterReportService
        .getAll(params)
        .then((response) => setChapterReports(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedChapter, chapterReportYear]);

  // fetch all reports of selected title
  /* TODO:
  useEffect(() => {
    const params = {
      title_id: selectedTitle.value,
      year: chapterReportYear.value,
    };

    if (selectedTitle?.value) {
      titleReportService
        .getAll(params)
        .then((response) => setTitleReports(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedTitle, titleReportYear]); 
  */

  // INFO: Select controls

  // convert all titles into options array with value-label object
  const titleSelectOptions = useMemo(() => {
    if (titles.length > 0) {
      const optionArray = titles.reduce((options, title) => {
        return [
          ...options,
          {
            value: title._id,
            label: title.title,
          },
        ];
      }, []);

      return optionArray;
    }

    return [];
  }, [titles]);

  // convert all chapters into options array with value-label object
  const chapterSelectOptions = useMemo(() => {
    if (chapters.length > 0) {
      const optionArray = chapters.reduce((options, chapter) => {
        return [
          ...options,
          {
            value: chapter._id,
            label: chapter.title,
          },
        ];
      }, []);

      return optionArray;
    }

    return [];
  }, [chapters]);

  // set title report year every time change title report year
  const changeTitleReportYear = (option) => {
    setTitleReportYear(option);
  };

  // set title report year every time change chapter report year
  const changeChapterReportYear = (option) => {
    setChapterReportYear(option);
  };

  // set selected title every time select title control change
  const changeSelectedTitle = (option) => {
    setSelectedTitle(option);
  };

  // set selected chapter every time select chapter control change
  const changeSelectedChapter = (option) => {
    setSelectedChapter(option);
  };

  // set initial selected title
  useEffect(() => {
    setSelectedTitle(titleSelectOptions[0]);
  }, [titleSelectOptions]);

  // set initial selected chapter
  useEffect(() => {
    setSelectedChapter(chapterSelectOptions[0]);
  }, [chapterSelectOptions]);

  // INFO: Chart variables

  const months = getMonthArray();
  const arrayOfZero = useMemo(() => new Array(months.length).fill(0), []);
  const currentMonth = useMemo(() => moment().month() + 1, []);
  const { backgroundColors, borderColors } = getChartColors();

  const [chartData, setChartData] = useState({
    title: {
      likes: [...arrayOfZero],
      views: [...arrayOfZero],
    },
    chapter: {
      likes: [...arrayOfZero],
      views: [...arrayOfZero],
    },
  });

  const chartLabels = useMemo(
    () =>
      months.map((month) => {
        if (month.number === currentMonth) return `Tháng hiện tại (${currentMonth})`;
        return `Tháng ${month.number}`;
      }),
    []
  );

  // INFO: Calculate chart data: views, likes

  // sum all likes and views in a year of a title
  /* TODO:
  useEffect(() => {
    const tempData = {
      likes: [...arrayOfZero],
      views: [...arrayOfZero],
    };

    if (titleReports.length > 0) {
      const { length } = titleReports;

      for (let i = 0; i < length; i++) {
        const { like, view, month } = titleReports[i];

        tempData.likes[month - 1] += like;
        tempData.views[month - 1] += view;
      }
    }

    setChartData((prev) => ({
      ...prev,
      title: tempData,
    }));
  }, [titleReports]); 
  */

  // sum all likes and views in a year of a chapter
  useEffect(() => {
    const tempData = {
      likes: [...arrayOfZero],
      views: [...arrayOfZero],
    };

    if (chapterReports.length > 0) {
      const { length } = chapterReports;

      for (let i = 0; i < length; i++) {
        const { like, view, month } = chapterReports[i];

        tempData.likes[month - 1] += like;
        tempData.views[month - 1] += view;
      }
    }

    setChartData((prev) => ({
      ...prev,
      chapter: tempData,
    }));
  }, [chapterReports]);

  // INFO: check sum

  const checkSumTitle = titleSelectOptions.length > 0 && selectedTitle?.value;
  const checkSumChapter = chapterSelectOptions.length > 0 && selectedChapter?.value;

  return (
    <Container className={cx("wrapper")}>
      {checkSumTitle ? (
        <>
          <Row>
            <Col>
              <TitleStatistic
                cx={cx}
                titleSelectOptions={titleSelectOptions}
                selectedTitle={selectedTitle}
                changeTitle={changeSelectedTitle}
                yearOptions={yearOptions}
                selectedYear={titleReportYear}
                changeYear={changeTitleReportYear}
                chartLabels={chartLabels}
                chartData={chartData.title}
                backgroundColors={backgroundColors}
                borderColors={borderColors}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {checkSumChapter ? (
                <ChapterStatistic
                  cx={cx}
                  chapterSelectOptions={chapterSelectOptions}
                  selectedChapter={selectedChapter}
                  changeChapter={changeSelectedChapter}
                  yearOptions={yearOptions}
                  selectedYear={chapterReportYear}
                  changeYear={changeChapterReportYear}
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
        </>
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
