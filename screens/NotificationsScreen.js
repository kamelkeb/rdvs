import React from "react";
import { Text, SafeAreaView } from "react-native";
import { GenericButton } from "../components/GenericButton";

const NotificationsScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <Text>NotificationsScreen</Text>
      <GenericButton
        name="Menu"
        onPress={() => navigation.openDrawer()}
      ></GenericButton>
    </SafeAreaView>
  );
};

export default NotificationsScreen;