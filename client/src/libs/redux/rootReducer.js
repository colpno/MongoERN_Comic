import searchReducer from "./slices/searchSlice";
import statisticCountReducer from "./slices/statisticCountSlice";
import userReducer from "./slices/userSlice";

const rootReducer = {
  user: userReducer,
  statisticCount: statisticCountReducer,
  search: searchReducer,
};

export default rootReducer;
