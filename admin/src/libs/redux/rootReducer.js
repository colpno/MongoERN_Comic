import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import { authPersistConfig } from "libs/redux-persist";
import {
  globalReducer,
  loginReducer,
  paymentMethodReducer,
  selectFieldReducer,
  titleReducer,
  userReducer,
} from "./slices";

const rootReducer = combineReducers({
  global: globalReducer,
  login: loginReducer,
  paymentMethod: paymentMethodReducer,
  selectField: selectFieldReducer,
  title: titleReducer,
  user: persistReducer(authPersistConfig, userReducer),
});

export default rootReducer;
