import React from "react";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { View, ViewColumnStretch } from "../components/View";
import { Button } from "../components/Button";
import Constants from "expo-constants";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
export default props => {
  const { navigate } = props.navigation;
  const [store, dispatch] = useStore();
  function register() {
    props.navigation.navigate("Signup");
  }
  function login() {
    props.navigation.navigate("Login");
  }

  function refreshApp() {
    dispatch({ type: "APP_REFRESH" });
  }
  return (
    <ViewColumnStretch>
      <ViewColumnStretch>
        <TOEasy onPress={register} style={{ backgroundColor: "green" }}>
          <Text>신규 이용자 회원가입</Text>
        </TOEasy>
        <TOEasy onPress={login} style={{ backgroundColor: "lime" }}>
          <Text>기존 이용자 로그인</Text>
        </TOEasy>
      </ViewColumnStretch>
      <View>
        <Text>nativeBuildVersion: {Constants.nativeBuildVersion}</Text>
        <TouchableOpacity
          onPress={refreshApp}
          style={{ backgroundColor: "orange" }}
        >
          <Text>앱 리로드 (에러 날 시 reset)</Text>
        </TouchableOpacity>
      </View>
    </ViewColumnStretch>
  );
};
