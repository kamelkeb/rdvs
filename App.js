import React from "react";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./store/store";

import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </NavigationContainer>
  );
}
