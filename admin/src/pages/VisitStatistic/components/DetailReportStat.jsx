import { FloatingContainer } from "components/index";
import { useLazyGetChapterReports, useLazyGetTitleReports } from "hooks/index";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import getYearOptions from "utils/getYearOptions";
import DetailReportStatChart from "./DetailReportStatChart";
import DetailReportStatSelector from "./DetailReportStatSelector";

function DetailReportStat() {
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [selectedTitle, setSelectedTitle] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const { get: getTitleReports, data: titleReports } = useLazyGetTitleReports();
  const { get: getChapterReports, data: chapterReports } = useLazyGetChapterReports();
  const titleOptions = useMemo(() => {
    const duplications = [];

    return titleReports.reduce((previous, { title_id: title }) => {
      const current = [...previous];

      if (!duplications.includes(title._id)) {
        duplications.push(title._id);
        current.push({ value: title._id, label: title.title });
      }

      return current;
    }, []);
  }, [titleReports]);
  const chapterOptions = useMemo(() => {
    const duplications = [];

    return chapterReports.reduce((previous, { chapter_id: chapter }) => {
      const current = [...previous];

      if (!duplications.includes(chapter._id)) {
        duplications.push(chapter._id);
        current.push({
          value: chapter._id,
          label: `Chương ${chapter.order}${chapter.title ? `: ${chapter.title}` : ""}`,
        });
      }

      return current;
    }, []);
  }, [chapterReports]);

  useEffect(() => {
    if (selectedYear?.value) {
      getTitleReports({
        _embed: JSON.stringify([{ collection: "title_id", field: "title" }]),
        _fields: "title_id -_id",
      });
    }
  }, [selectedYear]);

  useEffect(() => {
    if (titleOptions.length > 0) setSelectedTitle(titleOptions[0]);
  }, [titleOptions, setSelectedTitle]);

  useEffect(() => {
    if (selectedTitle?.value) {
      getChapterReports({
        _embed: JSON.stringify([
          {
            collection: "chapter_id",
            field: "title order",
            match: {
              title_id: selectedTitle.value,
            },
          },
        ]),
        _fields: "chapter_id -_id",
      });
    }
  }, [selectedTitle, getChapterReports]);

  useEffect(() => {
    if (chapterOptions.length > 0) setSelectedChapter(chapterOptions[0]);
  }, [chapterOptions, setSelectedChapter]);

  return (
    <>
      <Row>
        <Col>
          <h4>Thống kê chi tiết lượt thích và xem</h4>
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <FloatingContainer>
            <DetailReportStatChart
              selectedYear={selectedYear}
              selectedTitle={selectedTitle}
              selectedChapter={selectedChapter}
            />
          </FloatingContainer>
        </Col>
        <Col lg={4}>
          <FloatingContainer>
            <DetailReportStatSelector
              selectedYear={selectedYear}
              selectedTitle={selectedTitle}
              selectedChapter={selectedChapter}
              onChangeYear={setSelectedYear}
              onChangeTitle={setSelectedTitle}
              onChangeChapter={setSelectedChapter}
              yearOptions={yearOptions}
              titleOptions={titleOptions}
              chapterOptions={chapterOptions}
            />
          </FloatingContainer>
        </Col>
      </Row>
    </>
  );
}

DetailReportStat.propTypes = {
  selectedTitle: PropTypes.shape({}),
};

DetailReportStat.defaultProps = {
  selectedTitle: undefined,
};

export default DetailReportStat;
