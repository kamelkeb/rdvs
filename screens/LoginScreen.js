import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";
import { LoginForm } from "../components/LoginForm";


const LoginScreen = () => {
  const isTryingLocalSignIn = useSelector(
    (state) => state.currentUser.isTryingLocalSignIn
  );
  return (
    <SafeAreaView style={styles.container}>
      {isTryingLocalSignIn ? (
        <ActivityIndicator size="large" color="#11bb11"></ActivityIndicator>
      ) : (
          <LoginForm />
      )}
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

export default LoginScreen;
