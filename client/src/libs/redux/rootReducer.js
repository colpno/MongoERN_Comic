import statisticCountReducer from "./slices/statisticCountSlice";
import userReducer from "./slices/userSlice";

const rootReducer = {
  user: userReducer,
  statisticCount: statisticCountReducer,
};

export default rootReducer;
