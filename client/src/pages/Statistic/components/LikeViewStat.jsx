import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData } from "features";
import { chapterReportService, chapterService, titleReportService } from "services";
import { sortArray } from "utils/arrayMethods";
import { getChartColors, getMonthArray } from "utils/constants";
import getYearOptions from "utils/getYearOptions";
import styles from "../styles/Statistic.module.scss";
import ChapterStatistic from "./ChapterStatistic";
import TitleStatistic from "./TitleStatistic";

const cx = classNames.bind(styles);

function LikeViewStat({ setLoading, toastEmitter }) {
  // INFO: Data variables

  const yearOptions = getYearOptions();

  const [selectedTitle, setSelectedTitle] = useState({});
  const [selectedChapter, setSelectedChapter] = useState({});

  const [reportYear, setReportYear] = useState({
    title: yearOptions[0],
    chapter: yearOptions[0],
  });

  const myTitles = useSelector((state) => state.title.myTitles);
  const titles = useMemo(() => {
    const approvedTitles = myTitles.filter((title) => title.approved_status_id.code === "apd");
    if (myTitles.length > 0) return sortArray([...approvedTitles], "title", "asc");
    return [];
  }, [myTitles]);
  const [chapters, setChapters] = useState([]);

  const [titleReports, setTitleReports] = useState([]);
  const [chapterReports, setChapterReports] = useState([]);

  const fetchChapters = (params) => {
    setLoading(true);

    params._embed = JSON.stringify([
      { collection: "approved_status_id", fields: "-_id code", match: { code: "apd" } },
      { collection: "status_id", fields: "-_id code", match: { code: "vis" } },
    ]);
    params._fields = "title";

    chapterService
      .getAll(params)
      .then((response) => {
        setChapters(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setLoading(false);
      });
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
      setLoading(true);

      const params = {
        chapter_id: selectedChapter.value,
        year: reportYear.chapter.value,
      };

      chapterReportService
        .getAll(params)
        .then((response) => {
          setChapterReports(response.data);
          setLoading(false);
        })
        .catch((error) => {
          toastEmitter(error, "error");
          setLoading(false);
        });
    }
  }, [selectedChapter, reportYear.chapter]);

  // fetch all reports of selected title
  useEffect(() => {
    setLoading(true);

    if (selectedTitle?.value) {
      const params = {
        title_id: selectedTitle.value,
        year: reportYear.chapter.value,
      };

      titleReportService
        .getAll(params)
        .then((response) => {
          setTitleReports(response.data);
          setLoading(false);
        })
        .catch((error) => {
          toastEmitter(error, "error");
          setLoading(false);
        });
    }
  }, [selectedTitle, reportYear.title]);

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
    setReportYear((prev) => ({ ...prev, title: option }));
  };

  // set title report year every time change chapter report year
  const changeChapterReportYear = (option) => {
    setReportYear((prev) => ({ ...prev, chapter: option }));
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

  // sum all likes and views by month of a title
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

  // sum all likes and views by month of a chapter
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
    <>
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
                selectedYear={reportYear.title}
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
                  selectedYear={reportYear.chapter}
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
      {}
    </>
  );
}

LikeViewStat.propTypes = {
  setLoading: PropTypes.func.isRequired,
  toastEmitter: PropTypes.func.isRequired,
};

export default LikeViewStat;
