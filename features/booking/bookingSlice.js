import { firestore } from "../../firebase";
import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { accessCodes, timeSlots } from "./initialMockData";

const initialState = {
  getAllCompaignsStatus: "idle",
  getAllCompaignsErrorMessage: "",
  validAccessCodes: accessCodes,
  timeSlots: timeSlots,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default bookingSlice.reducer;

export const selectTimeSlots = createSelector(
  [(state, accessCode) => state.booking.timeSlots[accessCode]],
  timeSlots => timeSlots
)