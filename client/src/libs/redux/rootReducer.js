import {
  myTitlesReducer,
  searchReducer,
  selectFieldReducer,
  statisticCountReducer,
  userReducer,
} from "./slices";

const rootReducer = {
  user: userReducer,
  statisticCount: statisticCountReducer,
  search: searchReducer,
  myTitles: myTitlesReducer,
  selectField: selectFieldReducer,
};

export default rootReducer;
