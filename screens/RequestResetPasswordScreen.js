import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { GenericButton } from "../components/GenericButton";
import { Input } from "../components/Input";
import { doResetPassword } from "../features/currentUser/currentUserSlice";

const RequestResetPasswordScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params.email);
  const passwordRequestStatus = useSelector(
    (state) => state.currentUser.sendPasswordRequestStatus
  );
  const errorMessageResetPassword = useSelector(
    (state) => state.currentUser.errorSendPassword
  );

  const dispatch = useDispatch();

  const resetPasswordHandler = () => {
    dispatch(doResetPassword({ email }));
  };
  return (
    <SafeAreaView style={styles.container}>
      {passwordRequestStatus === "succeeded" ? (
        <>
          <Text style={{ color: "green" }}>
            An email with reset instructions has been sent to {email}. Please
            check your spams folder if you don't find it.
          </Text>
          <GenericButton
            onPress={() => navigation.navigate("Login",{email:email})}
            name="Got it!"
          ></GenericButton>
        </>
      ) : (
        <>
          <Text>Email</Text>
          <Input value={email} changeHandler={setEmail} />
          {errorMessageResetPassword && (
            <Text style={{ color: "red" }}>{errorMessageResetPassword}</Text>
          )}
          <GenericButton
            onPress={resetPasswordHandler}
            name="Send reset email"
          ></GenericButton>
        </>
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

export default RequestResetPasswordScreen;