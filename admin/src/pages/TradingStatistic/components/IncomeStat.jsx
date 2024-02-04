import { FloatingContainer } from "components/index";
import { useState } from "react";
import getYearOptions from "utils/getYearOptions";
import IncomeStatChart from "./IncomeStatChart";
import IncomeStatSelector from "./IncomeStatSelector";

function IncomeStat() {
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);

  return (
    <>
      <IncomeStatSelector
        onChangeYear={setSelectedYear}
        selectedYear={selectedYear}
        yearOptions={yearOptions}
      />
      <FloatingContainer>
        <IncomeStatChart selectedYear={selectedYear} />
      </FloatingContainer>
    </>
  );
}

export default IncomeStat;
