import { auth } from "../firebase";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";
import SignInFlowNavigator from "./SignInFlowNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import BookingScreen from "../screens/BookingScreen";
import {
  doSignout,
  doLocalSignIn,
  doTryLocalSignIn,
  cancelLocalSignIn,
} from "../features/currentUser/currentUserSlice";
import UserHome from "../screens/UserHome";
import SettingsDrawerNavigator from "./SettingsDrawerNavigator";
import { SimpleLineIcons } from "@expo/vector-icons";

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
            component={UserHome}
            name={"Home"}
            options={({ navigation }) => ({
              title: "Welcome !",
              headerRight: () => (
                <SimpleLineIcons
                  onPress={() => navigation.push("Settings")}
                  name="settings"
                  size={24}
                  color="black"
                />
              ),
            })}
          ></stackNavigator.Screen>

          <stackNavigator.Screen
            component={SettingsDrawerNavigator}
            name={"Settings"}
            options={({ navigation }) => ({
              title: "Settings",
              headerRight: () => (
                <Octicons
                  onPress={logoutHandler}
                  name="sign-out"
                  size={24}
                  color="black"
                />
              ),
            })}
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
