
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GenericButton } from "../components/GenericButton";
import { LogginForm } from "../components/LogginForm";
import { doSignout } from "../features/currentUser/currentUserSlice";

export const TesterScreen = () => {
  const isLoggedin = useSelector((state) => state.currentUser.isLoggedin);
  const email = useSelector((state) => state.currentUser.userProfile.email);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(doSignout());
  };


  return (
    <SafeAreaView style={styles.container}>
      {isLoggedin ? (
        <View>
          <Text>Bonjour cher {email}</Text>

          <GenericButton onPress={logoutHandler} name="Sign Out" />

        </View>
      ) : (
        <View>
          <Text>Vous n'êtes pas loggé!</Text>

          <LogginForm />
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

