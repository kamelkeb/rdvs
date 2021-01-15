import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserHome from "../screens/UserHome";
import SettingsDrawerNavigator from "./SettingsDrawerNavigator";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
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
      />
      <Tab.Screen
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
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
