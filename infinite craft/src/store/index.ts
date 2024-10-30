import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./slices/authSlice";
import { imageReducer } from "./slices/imageSlice";
import { userPromptReducer } from "./slices/promptSlice";
const reducers = combineReducers({
  user: userReducer,
  generatePrompt: userPromptReducer,
  userImage: imageReducer,
});
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["userImage"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "test",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
