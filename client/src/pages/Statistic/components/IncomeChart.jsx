import PropTypes from "prop-types";
import { Row } from "react-bootstrap";

import { Select } from "components";
import { LineChart } from "features";

function IncomeChart({
  cx,

  yearOptions,
  changeYear,
  selectedYear,

  chartData,
  chartLabels,
  backgroundColors,
  borderColors,
}) {
  return (
    <>
      <div className={cx("selector-container")}>
        <h4>Thu nhập cá nhân:</h4>
        <Select
          className={cx("select")}
          options={yearOptions}
          value={selectedYear}
          setValue={changeYear}
          searchable
          height={30}
        />
      </div>
      <Row>
        <LineChart
          beginAtZero
          labels={chartLabels}
          datasets={[
            {
              label: "Thu nhập",
              data: chartData,
              backgroundColor: backgroundColors[6],
              borderColor: borderColors[6],
              borderWidth: 3,
            },
          ]}
        />
      </Row>
    </>
  );
}

IncomeChart.propTypes = {
  cx: PropTypes.func.isRequired,

  yearOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  changeYear: PropTypes.func.isRequired,
  selectedYear: PropTypes.shape({}).isRequired,

  chartData: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  backgroundColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  borderColors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default IncomeChart;
