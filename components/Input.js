
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
    />

  );
};


const styles = StyleSheet.create({
  simpleTextInput: {
    borderWidth: 2,
    borderRadius: 3,

    borderColor: "grey",
    borderStyle: "solid",
  },
});
