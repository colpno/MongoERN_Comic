import { configureStore } from "@reduxjs/toolkit";
import { rootPersistConfig } from "libs/redux-persist/rootPersistConfig";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import rootReducer from "./rootReducer";

const handleMiddleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: handleMiddleware,
});

export const persistor = persistStore(store);

export default store;
