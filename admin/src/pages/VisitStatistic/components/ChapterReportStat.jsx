import { FloatingContainer } from "components/index";
import PropTypes from "prop-types";
import { useLazyGetChapterReports } from "hooks/index";
import { useEffect, useMemo, useState } from "react";
import getYearOptions from "utils/getYearOptions";
import ChapterReportStatChart from "./ChapterReportStatChart";
import ChapterReportStatSelector from "./ChapterReportStatSelector";

function ChapterReportStat({ selectedTitle }) {
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const [selectedChapter, setSelectedChapter] = useState();
  const { get: getReports, data: reports } = useLazyGetChapterReports();
  const reportOptions = useMemo(() => {
    const duplications = [];

    return reports.reduce((previous, { chapter_id: chapter }) => {
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
  }, [reports]);

  useEffect(() => {
    if (reportOptions.length > 0) {
      setSelectedChapter(reportOptions[0]);
    }
  }, [reportOptions]);

  useEffect(() => {
    if (selectedYear.value && selectedTitle?.value) {
      getReports({
        year: selectedYear.value,
        _embed: JSON.stringify([
          {
            collection: "chapter_id",
            field: "title",
            match: {
              title_id: selectedTitle.value,
            },
          },
        ]),
      });
    }
  }, [selectedYear, selectedTitle]);

  return (
    <>
      <ChapterReportStatSelector
        onChangeYear={setSelectedYear}
        yearOptions={yearOptions}
        selectedYear={selectedYear}
        selectedChapter={selectedChapter}
        onChangeChapter={setSelectedChapter}
        reportOptions={reportOptions}
      />
      <FloatingContainer>
        <ChapterReportStatChart selectedYear={selectedYear} selectedChapter={selectedChapter} />
      </FloatingContainer>
    </>
  );
}

ChapterReportStat.propTypes = {
  selectedTitle: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

ChapterReportStat.defaultProps = {
  selectedTitle: undefined,
};

export default ChapterReportStat;
