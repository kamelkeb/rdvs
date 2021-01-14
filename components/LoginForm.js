import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./Input";
import { GenericButton } from "./GenericButton";
import { doSignin } from "../features/currentUser/currentUserSlice";
import { useNavigation } from "@react-navigation/native";

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const errorMessageSignIn = useSelector(
    (state) => state.currentUser.errorSignIn
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginHandler = () => {
    dispatch(doSignin(credentials));
  };

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
      />

      <Text>Password</Text>
      <Input
        value={credentials.password}
        changeHandler={(newValue) =>
          setCredentials((credentials) => {
            return { ...credentials, password: newValue };
          })
        }
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Request reset email")}
      >
        <Text style={{ color: "blue" }}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <Text style={{ color: "red" }}>{errorMessageSignIn}</Text>
      <GenericButton onPress={loginHandler} name="Sign in" />
    </View>
  );
};
