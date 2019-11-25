import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { ActivityIndicator, StatusBar, View, Text } from "react-native";
import { useStore } from "../Store";

export default (props: NavigationStackScreenProps) => {
  const [store] = useStore();
  React.useEffect(() => {
    if (store.isInit) {
      props.navigation.navigate(
        store.userToken && store.userToken.length ? "AppNavigator" : "AuthMain"
      );
    }
  }, [store]);
  return (
    <View>
      <ActivityIndicator size={50} />
      <Text>{JSON.stringify(store)}</Text>
      <StatusBar barStyle="default" />
    </View>
  );
};
