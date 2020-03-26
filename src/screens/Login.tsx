import React from "react";
import { ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useStore } from "../Store";
import { Text } from "../components/Text";
import { View, ViewRow } from "../components/View";
import { TO0, TouchableOpacity } from "../components/TouchableOpacity";
const roundedRectangle12 = {
  width: 255,
  height: 56,
  borderRadius: 15,
  backgroundColor: "#30ad9f",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#c9c9c9"
} as ViewStyle;
export default props => {
  const { navigate } = props.navigation;
  function register() {
    navigate("Signup");
  }
  function loginEmail() {
    navigate("LoginEmail");
  }
  return (
    <>
      <View>
        <Text>로그인</Text>
        <ViewRow>
          <Text>아직 계정이 없으신가요?</Text>
        </ViewRow>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TO0 onPress={loginEmail} style={[roundedRectangle12]}>
          <Text style={{ fontSize: 16, color: "#ffffff" }}>
            이메일 주소로 로그인
          </Text>
        </TO0>
      </View>
      <ViewRow>
        <Text>아직 계정이 없으신가요?</Text>
        <TouchableOpacity onPress={register}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </ViewRow>
    </>
  );
};
