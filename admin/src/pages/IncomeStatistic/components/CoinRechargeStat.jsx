import PropTypes from "prop-types";

import { FloatingContainer } from "components";
import { LineChart } from "features";

function CoinRechargeStat({ labels, datasets }) {
  return (
    <FloatingContainer>
      <LineChart labels={labels} datasets={datasets} />
    </FloatingContainer>
  );
}

CoinRechargeStat.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  datasets: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default CoinRechargeStat;
