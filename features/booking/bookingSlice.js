import { firestore } from "../../firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
