import { useState } from "react";
import getYearOptions from "utils/getYearOptions.js";
import TotalIncomeStatChart from "./TotalIncomeStatChart";
import TotalIncomeStatSelector from "./TotalIncomeStatSelector";

function TotalIncomeStat() {
  const yearOptions = getYearOptions();
  const [selectedYear, setSelectedYear] = useState(yearOptions[0]);

  return (
    <>
      <TotalIncomeStatSelector
        onChangeYear={setSelectedYear}
        selectedYear={selectedYear}
        yearOptions={yearOptions}
      />
      <TotalIncomeStatChart selectedYear={selectedYear} />
    </>
  );
}

export default TotalIncomeStat;
