import { auth } from "../firebase";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import UserHome from "./UserHome";
import LoginScreen from "./LoginScreen";
import SettingsScreen from "./SettingsScreen";
import {
  doSignout,
  doLocalSignIn,
  doTryLocalSignIn,
  cancelLocalSignIn,
} from "../features/currentUser/currentUserSlice";

const stackNavigator = createStackNavigator();
const Index = () => {};

export default Index;
