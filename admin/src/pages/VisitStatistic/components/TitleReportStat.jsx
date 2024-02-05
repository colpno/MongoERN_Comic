import { FloatingContainer } from "components/index";
import { useLazyGetTitleReports } from "hooks/index";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import getYearOptions from "utils/getYearOptions";
import TitleReportStatChart from "./TitleReportStatChart";
import TitleReportStatSelector from "./TitleReportStatSelector";

function TitleReportStat({ selectedTitle, setSelectedTitle }) {
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);
  const { get: getReports, data: reports } = useLazyGetTitleReports();
  const reportOptions = useMemo(() => {
    const duplications = [];

    return reports.reduce((previous, { title_id: title }) => {
      const current = [...previous];

      if (!duplications.includes(title._id)) {
        duplications.push(title._id);
        current.push({ value: title._id, label: title.title });
      }

      return current;
    }, []);
  }, [reports]);

  useEffect(() => {
    if (reportOptions.length > 0) {
      setSelectedTitle(reportOptions[0]);
    }
  }, [reportOptions, setSelectedTitle]);

  useEffect(() => {
    if (selectedYear?.value) {
      getReports({
        year: selectedYear.value,
        _embed: JSON.stringify([{ collection: "title_id", field: "title" }]),
      });
    }
  }, [selectedYear]);

  return (
    <>
      <TitleReportStatSelector
        onChangeYear={setSelectedYear}
        selectedYear={selectedYear}
        yearOptions={yearOptions}
        selectedTitle={selectedTitle}
        onChangeTitle={setSelectedTitle}
        reportOptions={reportOptions}
      />
      <FloatingContainer>
        <TitleReportStatChart selectedYear={selectedYear} selectedTitle={selectedTitle} />
      </FloatingContainer>
    </>
  );
}

TitleReportStat.propTypes = {
  selectedTitle: PropTypes.shape({}),
  setSelectedTitle: PropTypes.func.isRequired,
};

TitleReportStat.defaultProps = {
  selectedTitle: undefined,
};

export default TitleReportStat;
