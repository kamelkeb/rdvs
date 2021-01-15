import React from "react";
import { Text, SafeAreaView } from "react-native";
import { GenericButton } from "../components/GenericButton";

const PersonalInfosScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <Text>PersonalInfosScreen</Text>
      <GenericButton
        name="Menu"
        onPress={() => navigation.openDrawer()}
      ></GenericButton>
    </SafeAreaView>
  );
};

export default PersonalInfosScreen;