import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slice/categoriesSlice";
import measurementSlice from './slice/measurementSlice'

const reducer = {
  categories: categoriesReducer,
  measurements: measurementSlice
};

const store = configureStore({
  reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;