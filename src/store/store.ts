import { configureStore } from "@reduxjs/toolkit"
import tagsReducer from "./tagsSlice"

const store = configureStore({
  reducer: {
    tags: tagsReducer,
  },
})

export default store
