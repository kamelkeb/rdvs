import React from "react";
import { useSelector } from "react-redux";
import { Text, SafeAreaView, StyleSheet } from "react-native";

import { useProfileInit } from "../features/currentUser/currentUserSlice";

const UserHome = ({ navigation, route }) => {
  const email = useSelector((state) => state.currentUser.userProfile.email);

  useProfileInit();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Bonjour cher {email}</Text>
    </SafeAreaView>
  );
};

export default UserHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
