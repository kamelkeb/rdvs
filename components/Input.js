import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const Input = ({ value, changeHandler }) => {
  return (
    <TextInput
      style={styles.simpleTextInput}
      value={value}
      onChangeText={changeHandler}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  simpleTextInput: {
    border: "solid 1px grey",
    borderRadius: "3px",
  },
});
