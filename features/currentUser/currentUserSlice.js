import { auth, firestore } from "../../firebase";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const USER_PROFILES_COLLECTION = "individuals";

const initialState = {
  isTryingLocalSignIn: true,
  signOutRequestStatus: "idle",
  sendPasswordRequestStatus: "idle",
  errorSendPassword: null,
  errorSignIn: null,
  signInRequestStatus: "idle",
  errorSignOut: null,
  isLoggedin: false,

  userProfile: {
    id: null,
    userProfileId: null,
    email: null,
    name: null,
    surname: "Kam",
    address: null,
    tel: null,
    postcode: null,
    town: null,
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

export const userProfileCreate = createAsyncThunk(
  "currentUser/userProfileCreate",
  async (userProfile) => {
    const individualsRef = firestore.collection(USER_PROFILES_COLLECTION);
    const userProfileRef = await individualsRef.add(userProfile);
    const profileSnapshot = await userProfileRef.get();

    return { userProfileId: userProfileRef.id, ...profileSnapshot.data() };
  }
);

export const userProfileUpdate = createAsyncThunk(
  "currentUser/userProfileUpdate",
  async ({ data, id }) => {
    const individualsRef = firestore.collection(USER_PROFILES_COLLECTION);
    individualsRef.doc(id).update(data);
  }
);

export const userProfileDelete = createAsyncThunk(
  "currentUser/userProfileDelete",
  async (userProfileId) => {
    const individualsRef = firestore.collection(USER_PROFILES_COLLECTION);
    individualsRef.doc(userProfileId).delete();
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    doLocalSignIn: (state, action) => {
      state.isLoggedin = true;
      state.userProfile = {
        ...state.userProfile,
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
    localUserUpdate: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload };
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
    [userProfileCreate.fulfilled]: (state, action) => {
      console.log("Payload: ", action.payload);
      state.userProfile = { ...state.userProfile, ...action.payload };
    },
    [userProfileCreate.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [userProfileUpdate.rejected]: (state, action) => {
      console.log(action.error.message);
    },
  },
});

export const {
  doLocalSignIn,
  doTryLocalSignIn,
  cancelLocalSignIn,
  localUserUpdate,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;

// Custom Hooks:

export const useProfileInit = () => {
  const userId = useSelector((state) => state.currentUser.userProfile.id);
  const dispatch = useDispatch();
  useEffect(() => {
    const individualsRef = firestore.collection(USER_PROFILES_COLLECTION);
    const cleanup = individualsRef
      .where("userId", "==", userId)
      .onSnapshot(({ docs }) => {
        if (docs && docs.length > 0) {
          dispatch(
            localUserUpdate({ userProfileId: docs[0].id, ...docs[0].data() })
          );
        }
      });

    return cleanup;
  }, [dispatch, userId]);
};
