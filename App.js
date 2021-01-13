import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import store from "./store/store";
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
