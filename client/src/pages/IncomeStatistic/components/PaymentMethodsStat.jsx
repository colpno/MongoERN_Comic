import { FloatingContainer } from "components";
import { BarChart } from "features";
import PropTypes from "prop-types";

function PaymentMethodsStat({ labels, datasets }) {
  return (
    <FloatingContainer>
      <BarChart labels={labels} datasets={datasets} />
    </FloatingContainer>
  );
}

PaymentMethodsStat.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  datasets: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default PaymentMethodsStat;
