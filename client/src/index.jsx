import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import GlobalStyles from "assets/styles/GlobalStyles";
import { paypalConfigs } from "configs/paypal.config.js";
import { socket, SocketContext } from "context/socketContext";
import store, { persistor } from "libs/redux/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles>
        <SocketContext.Provider value={socket}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PayPalScriptProvider options={paypalConfigs}>
                <App />
              </PayPalScriptProvider>
            </PersistGate>
          </Provider>
        </SocketContext.Provider>
      </GlobalStyles>
    </BrowserRouter>
  </React.StrictMode>
);
