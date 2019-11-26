import React from "react";
import { NavigationSwitchScreenProps } from "react-navigation";
import { View } from "react-native";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  const [store, setStore] = useStore();
  function pressHandler() {
    userTokenHandler();
  }
  function userTokenHandler() {
    setStore({ userToken: "custom-user-token-to-be-made" });
    navigate("Home");
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Auth Screen</Text>
      <Text>인증</Text>
      <Text>{store.userToken}</Text>
      <Button title="go to home" onPress={pressHandler} />
    </View>
  );
};
