import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AppNavigator from "./AppNavigator";
import AuthLoading from "./screens/AuthLoading";
import Spinner from "react-native-loading-spinner-overlay";
import AuthMain from "./screens/AuthMain";
import { useStore } from "./Store";
const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      AppNavigator,
      AuthMain
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
export default () => {
  const [store] = useStore();
  return (
    <>
      <AppContainer />
      <Spinner visible={store.isLoading} textContent="로딩중입니다..." />
    </>
  );
};
