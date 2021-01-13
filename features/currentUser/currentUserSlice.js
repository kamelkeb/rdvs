import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase";

const initialState = {
  signInRequestStatus: "idle",
  signOutRequestStatus: "idle",
  errorSignIn: null,
  errorSignOut: null,
  isLoggedin: true,
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

export const doSignout = createAsyncThunk("currentUser/doSignout", async () => {
  return await auth.signOut();
});

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
      state.signInRequestStatus = "succeeded";
      state.errorSignIn = null;
      state.userProfile = {
        email: action.payload.email,
        id: action.payload.id,
      };
    },
    [doSignin.pending]: (state) => {
      state.signInRequestStatus = "pending";
      state.errorSignIn = null;
    },
    [doSignin.rejected]: (state, action) => {
      state.signInRequestStatus = "failed";
      state.errorSignIn = action.error.message;
    },
    [doSignout.fulfilled]: (state) => {
      state.isLoggedin = false;
      state.signOutRequestStatus = "succeeded";
      state.errorSignOut = null;
      state.userProfile = {
        email: null,
        id: null,
      };
    },
    [doSignout.pending]: (state) => {
      state.signOutRequestStatus = "pending";
      state.errorSignOut = null;
    },
    [doSignout.rejected]: (state, action) => {
      state.signOutRequestStatus = "failed";
      state.errorSignOut = action.error.message;
    },
  },
});

export const { signin } = currentUserSlice.actions;

export default currentUserSlice.reducer;
