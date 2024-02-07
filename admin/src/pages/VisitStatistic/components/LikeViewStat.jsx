import { FloatingContainer } from "components/index";
import PropTypes from "prop-types";
import { useState } from "react";
import getYearOptions from "utils/getYearOptions";
import LikeViewStatChart from "./LikeViewStatChart.jsx";
import LikeViewStatSelector from "./LikeViewStatSelector.jsx";

function LikeViewStat() {
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);

  return (
    <>
      <LikeViewStatSelector
        onChangeYear={setSelectedYear}
        selectedYear={selectedYear}
        yearOptions={yearOptions}
      />
      <FloatingContainer>
        <LikeViewStatChart selectedYear={selectedYear} />
      </FloatingContainer>
    </>
  );
}

LikeViewStat.propTypes = {
  selectedTitle: PropTypes.shape({}),
};

LikeViewStat.defaultProps = {
  selectedTitle: undefined,
};

export default LikeViewStat;
