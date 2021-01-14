import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { Input } from "../components/Input";
import { TouchableOpacity } from "react-native";
import { GenericButton } from "../components/GenericButton";

const WelcomeScreen = ({ navigation, route }) => {
  const [accessCode, setAccessCode] = useState("");
  const [validityError, setValidityError] = useState(false);
  const validAccessCodes = useSelector(
    (state) => state.booking.validAccessCodes
  );

  const verifyValidity = (accessCode) => validAccessCodes.includes(accessCode);

  const checkAccessCodeHandler = () => {
    if (verifyValidity(accessCode)) {
      setValidityError(false);
      navigation.navigate("Booking", { accessCode });
    } else {
      setValidityError(true);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome screen</Text>
      <Input value={accessCode} changeHandler={setAccessCode}></Input>
      {validityError && (
        <Text style={{ color: "red" }}>
          The access code is not recognized or the booking compaign may be
          finished.
        </Text>
      )}
      <GenericButton
        onPress={checkAccessCodeHandler}
        name="Access booking"
      ></GenericButton>
      <TouchableOpacity onPress={() => navigation.navigate("Login flow")}>
        <Text style={{ color: "blue" }}>
          If you already have an account, to sign in please click here.
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});