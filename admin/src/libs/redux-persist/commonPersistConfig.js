import storage from "redux-persist/lib/storage";

const commonPersistConfig = {
  key: "common",
  storage,
  whitelist: ["theme"],
};

export default commonPersistConfig;
