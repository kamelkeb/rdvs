import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserHome from "../screens/UserHome";
import SettingsDrawerNavigator from "./SettingsDrawerNavigator";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { GenericButton } from "../components/GenericButton";

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={UserHome} name={"Home"} />
      <Tab.Screen component={SettingsDrawerNavigator} name={"Settings"} />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
