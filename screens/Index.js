import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import UserHome from "./UserHome";
import LogginScreen from "./LogginScreen";
import { auth } from "../firebase";

export const Index = () => {
  const isLoggedin = useSelector((state) => state.currentUser.isLoggedin);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []);

  return isLoggedin ? <UserHome /> : <LogginScreen />;
};
