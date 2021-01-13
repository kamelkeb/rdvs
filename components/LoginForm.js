import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./Input";
import { GenericButton } from "./GenericButton";
import {
  doSignin,
  doResetPassword,
} from "../features/currentUser/currentUserSlice";

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showResetUI, setShowResetUI] = useState(false);
  const errorMessageSignIn = useSelector(
    (state) => state.currentUser.errorSignIn
  );
  const passwordRequestStatus = useSelector(
    (state) => state.currentUser.sendPasswordRequestStatus
  );
  const errorMessageResetPassword = useSelector(
    (state) => state.currentUser.errorSendPassword
  );
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(doSignin(credentials));
  };

  const resetPasswordHandler = () => {
    setShowResetUI(false);
    dispatch(doResetPassword({ email: credentials.email }));
  };

  return (
    <View>
      {passwordRequestStatus === "succeeded" && (
        <Text style={{ color: "green" }}>Un email a bien été envoyé.</Text>
      )}
      {errorMessageResetPassword && (
        <Text style={{ color: "red" }}>
          {errorMessageResetPassword}
          "example@lol.com" is a valid mail format..
        </Text>
      )}
      <Text>Email</Text>
      <Input
        value={credentials.email}
        changeHandler={(newValue) =>
          setCredentials((credentials) => {
            return { ...credentials, email: newValue };
          })
        }
      />
      {showResetUI || errorMessageResetPassword ? (
        <GenericButton
          onPress={resetPasswordHandler}
          name="Send reset email"
        ></GenericButton>
      ) : (
        <>
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
          <TouchableOpacity onPress={() => setShowResetUI(true)}>
            <Text style={{ color: "blue" }}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
          <Text style={{ color: "red" }}>{errorMessageSignIn}</Text>
          <GenericButton onPress={loginHandler} name="Sign in" />
        </>
      )}
    </View>
  );
};
