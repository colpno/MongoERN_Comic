import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import comicApi from "api/comicApi";
import { authPersistConfig } from "libs/redux-persist";
import {
  commonReducer,
  globalReducer,
  loginReducer,
  paymentMethodReducer,
  selectFieldReducer,
  titleReducer,
  userReducer,
} from "./slices";

const rootReducer = combineReducers({
  [comicApi.reducerPath]: comicApi.reducer,
  global: globalReducer,
  login: loginReducer,
  paymentMethod: paymentMethodReducer,
  selectField: selectFieldReducer,
  title: titleReducer,
  user: persistReducer(authPersistConfig, userReducer),
  common: commonReducer,
});

export default rootReducer;
