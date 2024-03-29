import { configureStore } from "@reduxjs/toolkit";
import { tagsApi } from "./tagsSlice";

const store = configureStore({
  reducer: {
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tagsApi.middleware),
});

export default store;