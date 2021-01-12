import React from "react";

import store from "./store/store";
import { Provider } from "react-redux";
import { TesterScreen } from "./screens/TesterScreen";

export default function App() {
  return (
    <Provider store={store}>
      <TesterScreen></TesterScreen>
    </Provider>
  );
}
