import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import "moment/locale/vi";
import moment from "moment";

import "./GlobalStyles.scss";

moment.locale("vi");

Chart.register(
  ArcElement,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,

  BarElement
);

function GlobalStyles({ children }) {
  return children;
}

export default GlobalStyles;
