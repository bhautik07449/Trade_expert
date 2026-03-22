import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slice/categoriesSlice";
import measurementReducer from './slice/measurementSlice';
import currencyReducer from './slice/currencySlice'
import pageSlice from './slice/pageSlice'

const reducer = {
  categories: categoriesReducer,
  measurements: measurementReducer,
  currency: currencyReducer,
  page: pageSlice
};

const store = configureStore({
  reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;