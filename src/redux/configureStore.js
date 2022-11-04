import { configureStore, combineReducers } from "@reduxjs/toolkit";
import calendarSlice from "./CalendarSlice";

const reducer = combineReducers({
  calendar: calendarSlice,
});

const store = configureStore({
  reducer,
});

export default store;
