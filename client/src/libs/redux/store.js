import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import comicApi from "api/comicApi";
import { rootPersistConfig } from "libs/redux-persist";
import rootReducer from "./rootReducer";

const handleMiddleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(comicApi.middleware);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: handleMiddleware,
});

const persistor = persistStore(store);

export { persistor };

export default store;
