import { auth } from "../firebase";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import SignInFlowNavigator from "./SignInFlowNavigator";
import UserHome from "../screens/UserHome";

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
            component={SettingsScreen}
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
        <stackNavigator.Screen
          component={SignInFlowNavigator}
          name={"Login flow"}
        ></stackNavigator.Screen>
      )}
    </stackNavigator.Navigator>
  );
};

export default MainNavigator;
