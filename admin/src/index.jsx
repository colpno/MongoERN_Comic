import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
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

import GlobalStyles from "assets/styles/GlobalStyles";
import store, { persistor } from "libs/redux/store";
import App from "./App";

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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <GlobalStyles>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GlobalStyles>
  </BrowserRouter>
  // </React.StrictMode>
);
