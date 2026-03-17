import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slice/categoriesSlice";
import measurementSlice from './slice/measurementSlice';
import pageSlice from './slice/pageSlice'

const reducer = {
  categories: categoriesReducer,
  measurements: measurementSlice,
  page: pageSlice
};

const store = configureStore({
  reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;