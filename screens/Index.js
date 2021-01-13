import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import UserHome from "./UserHome";
import LoginScreen from "./LoginScreen";
import SettingsScreen from "./SettingsScreen";
import { doSignout } from "../features/currentUser/currentUserSlice";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const stackNavigator = createStackNavigator();
const Index = () => {
  const isLoggedin = useSelector((state) => state.currentUser.isLoggedin);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(doSignout());
  };

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
          component={LoginScreen}
          name={"Login"}
        ></stackNavigator.Screen>
      )}
    </stackNavigator.Navigator>
  );
};

export default Index;
