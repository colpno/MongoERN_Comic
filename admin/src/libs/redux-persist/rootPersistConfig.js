import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "common"],
};

export default rootPersistConfig;
