import { configureStore, combineReducers } from "@reduxjs/toolkit";
import calendarSlice from "./CalendarSlice";
import reservationLayoutSlice from "./ReservationLayoutSlice";

const reducer = combineReducers({
  calendar: calendarSlice,
  reservations: reservationLayoutSlice,
});

const store = configureStore({
  reducer,
});

export default store;
