import {
  myTitlesReducer,
  searchReducer,
  selectFieldReducer,
  statisticCountReducer,
  titleReducer,
  userReducer,
} from "./slices";

const rootReducer = {
  user: userReducer,
  statisticCount: statisticCountReducer,
  search: searchReducer,
  title: titleReducer,
  myTitles: myTitlesReducer,
  selectField: selectFieldReducer,
};

export default rootReducer;
