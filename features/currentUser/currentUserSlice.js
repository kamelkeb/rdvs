import { auth } from "../../firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isTryingLocalSignIn: true,
  signInRequestStatus: "idle",
  signOutRequestStatus: "idle",
  sendPasswordRequestStatus: "idle",
  errorSendPassword: null,
  errorSignIn: null,
  errorSignOut: null,
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

export const doSignout = createAsyncThunk("currentUser/doSignout", async () => {
  return await auth.signOut();
});

export const doResetPassword = createAsyncThunk(
  "currentUser/doResetPassword",
  async ({ email }) => {
    return await auth.sendPasswordResetEmail(email);
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    doLocalSignIn: (state, action) => {
      state.isLoggedin = true;
      state.userProfile = {
        id: action.payload.id,
        email: action.payload.email,
      };
      state.isTryingLocalSignIn = false;
    },
    doTryLocalSignIn: (state) => {
      state.isTryingLocalSignIn = true;
    },
    cancelLocalSignIn: (state) => {
      state.isTryingLocalSignIn = false;
    },
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

    [doResetPassword.fulfilled]: (state) => {
      state.sendPasswordRequestStatus = "succeeded";
      state.errorSendPassword = null;
    },
    [doResetPassword.pending]: (state) => {
      state.sendPasswordRequestStatus = "pending";
      state.errorSendPassword = null;
    },
    [doResetPassword.rejected]: (state, action) => {
      state.sendPasswordRequestStatus = "failed";
      state.errorSendPassword = action.error.message;
    },
  },
});

export const {
  doLocalSignIn,
  doTryLocalSignIn,
  cancelLocalSignIn,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;