import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import comicApi from "api/comicApi";
import { authPersistConfig, themePersistConfig } from "libs/redux-persist";
import {
  commentReducer,
  commonReducer,
  globalReducer,
  loginReducer,
  paymentMethodReducer,
  readingChapterReducer,
  selectFieldReducer,
  statisticCountReducer,
  themeReducer,
  titleReducer,
  userReducer,
} from "./slices";

const rootReducer = combineReducers({
  [comicApi.reducerPath]: comicApi.reducer,
  comment: commentReducer,
  global: globalReducer,
  login: loginReducer,
  paymentMethod: paymentMethodReducer,
  reading: readingChapterReducer,
  selectField: selectFieldReducer,
  statisticCount: statisticCountReducer,
  theme: persistReducer(themePersistConfig, themeReducer),
  title: titleReducer,
  user: persistReducer(authPersistConfig, userReducer),
  common: commonReducer,
});

export default rootReducer;
