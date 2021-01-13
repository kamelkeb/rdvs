import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./store/store";
import { Provider } from "react-redux";
import Index from "./screens";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <Index />
      </Provider>
    </NavigationContainer>
  );
}
