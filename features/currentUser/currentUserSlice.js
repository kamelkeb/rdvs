import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedin: false,
  userProfile: {
    id: null,
    email: null,
  },
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
});

export default currentUserSlice.reducer;
