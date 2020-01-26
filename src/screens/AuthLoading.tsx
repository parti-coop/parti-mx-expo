import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
// import { ActivityIndicator, StatusBar, View, Text } from "react-native";
import { useStore } from "../Store";

export default (props: NavigationStackScreenProps) => {
  const [store, dispatch] = useStore();
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: !store.isInit });
    if (store.isInit) {
      props.navigation.navigate(
        store.userToken && store.userToken.length ? "AppNavigator" : "AuthMain"
      );
    }
  }, [store]);
  return null;
};
