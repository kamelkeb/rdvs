import { auth } from "../firebase";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import SignInFlowNavigator from "./SignInFlowNavigator";
import SettingsDrawerNavigator from "./SettingsDrawerNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import UserHome from "../screens/UserHome";
import WelcomeScreen from "../screens/WelcomeScreen";
import BookingScreen from "../screens/BookingScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  doSignout,
  doLocalSignIn,
  doTryLocalSignIn,
  cancelLocalSignIn,
} from "../features/currentUser/currentUserSlice";

const stackNavigator = createStackNavigator();

const MainNavigator = () => {
  const isLoggedin = useSelector((state) => state.currentUser.isLoggedin);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(doSignout());
  };

  useEffect(() => {
    dispatch(doTryLocalSignIn());
    const cleanup = auth.onAuthStateChanged((user) => {
      if (Boolean(user)) {
        dispatch(
          doLocalSignIn({
            id: user.uid,
            email: user.email,
          })
        );
      } else {
        dispatch(cancelLocalSignIn());
      }
    });
    return cleanup;
  }, []);
  return (
    <stackNavigator.Navigator>
      {isLoggedin ? (
        <>

          <stackNavigator.Screen
            component={BottomTabNavigator}
            name={"Bottom Tab"}
          ></stackNavigator.Screen>
          
        </>
      ) : (
        <>
          <stackNavigator.Screen
            component={WelcomeScreen}
            name={"Welcome"}
          ></stackNavigator.Screen>
          <stackNavigator.Screen
            component={BookingScreen}
            name={"Booking"}
          ></stackNavigator.Screen>
          <stackNavigator.Screen
            component={SignInFlowNavigator}
            name={"Login flow"}
          ></stackNavigator.Screen>
        </>
      )}
    </stackNavigator.Navigator>
  );
};

export default MainNavigator;
