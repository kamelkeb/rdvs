import React from "react";

import store from "./store/store";
import { Provider } from "react-redux";
import Index from './screens'

export default function App() {

  return (
    <Provider store={store}>
      <Index/>
    </Provider>
  );
}
