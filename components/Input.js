import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const Input = ({ value, changeHandler, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.simpleTextInput}
      value={value}
      onChangeText={changeHandler}
      autoCapitalize="none"
      autoCompleteType="off"
      secureTextEntry={secureTextEntry}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  simpleTextInput: {
    border: "solid 1px grey",
    borderRadius: "3px",
  },
});
