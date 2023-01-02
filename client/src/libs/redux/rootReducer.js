import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import { authPersistConfig } from "libs/redux-persist";
import {
  commentReducer,
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
  comment: commentReducer,
  global: globalReducer,
  login: loginReducer,
  paymentMethod: paymentMethodReducer,
  reading: readingChapterReducer,
  selectField: selectFieldReducer,
  statisticCount: statisticCountReducer,
  title: titleReducer,
  user: persistReducer(authPersistConfig, userReducer),
});

export default rootReducer;
