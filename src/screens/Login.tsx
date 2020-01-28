import React from "react";
import { NavigationSwitchScreenProps } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { View, ViewRowLeft } from "../components/View";
import { TouchableOpacity } from "../components/TouchableOpacity";
import { Button } from "../components/Button";
import { auth } from "./firebase";
export default (props: NavigationSwitchScreenProps) => {
  const { navigate } = props.navigation;
  const [store, dispatch] = useStore();
  function register() {
    props.navigation.navigate("Signup");
  }
  function login() {
    props.navigation.navigate("Login");
  }
  return (
    <>
      <ViewRowLeft>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>로그인</Text>
      </ViewRowLeft>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("LoginEmail")}
        >
          <Text>이메일 주소로 로그인</Text>
        </TouchableOpacity>
      </View>
      <ViewRowLeft>
        <Text>아직 계정이 없으신가요?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </ViewRowLeft>
    </>
  );
};
