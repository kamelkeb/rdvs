import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";

const initialState = {
  status: "idle",
  error: null,
  isLoggedin: false,
  userProfile: {
    id: null,
    email: null,
  },
};

export const doSignin = createAsyncThunk(
  "currentUser/doSignin",
  async (credentials) => {
    const response = auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );

    const userProfile = {
      id: (await response).user.uid,
      email: (await response).user.email,
    };
    return userProfile;
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    /* signin: (state, action) => {
      state.isLoggedin = true;
      state.userProfile.email = action.payload.email;
    }, */
  },
  extraReducers: {
    [doSignin.fulfilled]: (state, action) => {
      state.isLoggedin = true;
      state.status = "succeeded";
      state.error = null;
      state.userProfile = {
        email: action.payload.email,
        id: action.payload.id,
      };
    },
    [doSignin.pending]: (state, action) => {
      state.status = "pending";
      state.error = null;
    },
    [doSignin.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { signin } = currentUserSlice.actions;

export default currentUserSlice.reducer;
