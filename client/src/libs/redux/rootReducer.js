import { combineReducers } from "@reduxjs/toolkit";
import { authPersistConfig } from "libs/redux-persist/authPersistConfig";
import { persistReducer } from "redux-persist";
import {
  readingChapterReducer,
  paymentMethodReducer,
  selectFieldReducer,
  statisticCountReducer,
  titleReducer,
  userReducer,
} from "./slices";
import globalReducer from "./slices/globalSlice";

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  statisticCount: statisticCountReducer,
  global: globalReducer,
  title: titleReducer,
  chapter: readingChapterReducer,
  paymentMethod: paymentMethodReducer,
  selectField: selectFieldReducer,
});

export default rootReducer;
