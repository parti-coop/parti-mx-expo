import React from "react";
import { NavigationSwitchScreenProps } from "react-navigation";
import { View } from "react-native";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { auth } from "../firebase";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  const [store, dispatch] = useStore();
  function register() {
    props.navigation.navigate("Signup");
  }
  function login() {
    props.navigation.navigate("Login");
  }
  function userTokenHandler() {
    navigate("Home");
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Auth Screen</Text>
      <Text>인증</Text>
      <Text>{store.userToken}</Text>
      <Button title="신규 이용자 회원가입" onPress={register} />
      <Button title="기존 이용자 로그인" onPress={login} />
    </View>
  );
};
