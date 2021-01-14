import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import EditAppoinmentScreen from "../screens/EditAppointmentScreen";
import PersonalInfosScreen from "../screens/PersonalInfosScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

const { Navigator, Screen } = createDrawerNavigator();

const SettingsDrawerNavigator = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Personal Infos" component={PersonalInfosScreen} />
      <Screen name="Edit appointment" component={EditAppoinmentScreen} />
      <Screen name="Notifications" component={NotificationsScreen} />
    </Navigator>
  );
};

export default SettingsDrawerNavigator;
