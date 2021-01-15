import React from "react";
import { Text, SafeAreaView } from "react-native";
import { GenericButton } from "../components/GenericButton";
const EditAppoinmentScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView>
      <Text>EditAppoinmentScreen</Text>
      <GenericButton
        name="Menu"
        onPress={() => navigation.openDrawer()}
      ></GenericButton>
    </SafeAreaView>
  );
};

export default EditAppoinmentScreen;
