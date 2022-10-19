import {
  myTitlesReducer,
  searchReducer,
  statisticCountReducer,
  userReducer,
} from "./slices";

const rootReducer = {
  user: userReducer,
  statisticCount: statisticCountReducer,
  search: searchReducer,
  myTitles: myTitlesReducer,
};

export default rootReducer;
