import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input } from "../components/Input";
import { GenericButton } from "../components/GenericButton";

const LogginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  return (
    <View>
      <Text>Email</Text>
      <Input
        value={credentials.email}
        changeHandler={(newValue) =>
          setCredentials((credentials) => {
            return { ...credentials, email: newValue };
          })
        }
      ></Input>
      <Text>Password</Text>
      <Input
        value={credentials.password}
        changeHandler={(newValue) =>
          setCredentials((credentials) => {
            return { ...credentials, password: newValue };
          })
        }
      ></Input>
      <GenericButton
        onPress={() => console.log(credentials.email)}
        name="Sign in"
      ></GenericButton>
    </View>
  );
};

export const TesterScreen = () => {
  const isLoggedin = useSelector((state) => state.currentUser.isLoggedin);
  const email = useSelector((state) => state.currentUser.userProfile.email);
  return (
    <SafeAreaView style={styles.container}>
      {isLoggedin ? (
        <Text>Bonjour cher {email}</Text>
      ) : (
        <Text>Vous n'êtes pas loggé!</Text>
      )}
      {isLoggedin || <LogginForm></LogginForm>}
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
