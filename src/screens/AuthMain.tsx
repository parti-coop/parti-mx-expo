import React from "react";
import { NavigationSwitchScreenProps } from "react-navigation";
import { View, Text, Button } from "react-native";
import { useStore } from "../Store";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  const [store, setStore] = useStore();
  function pressHandler() {
    navigate("Home", { name: "Swain" });
  }
  function userTokenHandler() {
    setStore({ userToken: "aaa" });
  }
  return (
    <View style={{ flex: 1 }}>
      <Text>Auth Screen</Text>
      <Text>인증</Text>
      <Text>{store.userToken}</Text>
      <Button title="set user token" onPress={userTokenHandler} />
      <Button title="go to home" onPress={pressHandler} />
    </View>
  );
};
