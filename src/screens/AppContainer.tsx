import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import AuthContainer from "./AuthContainer";
import { useStore } from "../Store";
export default () => {
  const [store] = useStore();
  return (
    <NavigationContainer>
      {/* <AppNavigator /> */}
      {store.userToken.length > 0 ? <AppNavigator /> : <AuthContainer />}
    </NavigationContainer>
  );
};
