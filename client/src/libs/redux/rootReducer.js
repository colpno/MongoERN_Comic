import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import { authPersistConfig } from "libs/redux-persist";
import {
  globalReducer,
  loginReducer,
  paymentMethodReducer,
  readingChapterReducer,
  selectFieldReducer,
  statisticCountReducer,
  titleReducer,
  userReducer,
} from "./slices";

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  statisticCount: statisticCountReducer,
  global: globalReducer,
  title: titleReducer,
  chapter: readingChapterReducer,
  paymentMethod: paymentMethodReducer,
  selectField: selectFieldReducer,
  login: loginReducer,
});

export default rootReducer;
