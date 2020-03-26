import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { View, ViewRow } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { Button } from "../components/Button";
import { auth } from "../firebase";
export default props => {
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
      <ViewRow>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text>회원가입</Text>
      </ViewRow>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TOEasy
          onPress={() => props.navigation.navigate("SignupEmail")}
        >
          <Text>이메일 주소로 회원가입</Text>
        </TOEasy>
      </View>
      <ViewRow>
        <Text>이미 계정이 있으신가요?</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text>로그인</Text>
        </TouchableOpacity>
      </ViewRow>
    </>
  );
};
