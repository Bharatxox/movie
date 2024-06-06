import { configureStore } from "@reduxjs/toolkit";
import { popularMoviesApi } from "./services/popular";
import { homeSlice } from "./HomeSlice";

const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    [popularMoviesApi.reducerPath]: popularMoviesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(popularMoviesApi.middleware),
});
export default store;
