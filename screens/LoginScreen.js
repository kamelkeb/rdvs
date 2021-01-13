import { Text, SafeAreaView } from "react-native";
import { LoginForm } from "../components/LoginForm";
import React from "react";

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <Text>Vous n'êtes pas loggé!</Text>
      <LoginForm />
    </SafeAreaView>
  );
};

export default LoginScreen;
