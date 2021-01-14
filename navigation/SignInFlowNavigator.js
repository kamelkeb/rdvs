import { auth } from "../firebase";
import React, { useEffect } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";

import RequestResetPasswordScreen from "../screens/RequestResetPasswordScreen";

const stackNavigator = createStackNavigator();
const SignInFlowNavigator = () => {
  return (
    <stackNavigator.Navigator>
      <stackNavigator.Screen
        component={LoginScreen}
        name={"Login"}
        initialParams={{
          email:""
        }}
      ></stackNavigator.Screen>
      <stackNavigator.Screen
        component={RequestResetPasswordScreen}
        name={"Request reset email"}
        initialParams={{
          email:""
        }}
      ></stackNavigator.Screen>
    </stackNavigator.Navigator>
  );
};

export default SignInFlowNavigator;