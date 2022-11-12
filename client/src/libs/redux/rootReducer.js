import { combineReducers } from "@reduxjs/toolkit";
import { authPersistConfig } from "libs/redux-persist/authPersistConfig";
import { persistReducer } from "redux-persist";
import {
  chapterReducer,
  myTitlesReducer,
  paymentMethodReducer,
  searchReducer,
  selectFieldReducer,
  statisticCountReducer,
  titleReducer,
  userReducer,
} from "./slices";

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
  statisticCount: statisticCountReducer,
  search: searchReducer,
  title: titleReducer,
  chapter: chapterReducer,
  paymentMethod: paymentMethodReducer,
  myTitles: myTitlesReducer,
  selectField: selectFieldReducer,
});

export default rootReducer;
