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
    border: "solid 1px blue",
    backgroundColor: "lightblue",
    borderRadius: 3,
    margin: 4,
  },
});
