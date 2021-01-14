import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import bookingReducer from "../features/booking/bookingSlice";

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    booking: bookingReducer,
  },
});