import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export const GenericButton = ({ onPress, name }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.genericButton}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  genericButton: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "blue",
    backgroundColor: "lightblue",
    borderRadius: 3,
    margin: 4,
  },
});
