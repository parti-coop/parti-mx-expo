import React from "react";
import { useStore } from "../Store";
import { Text } from "../components/Text";
import { ViewColumnCenter } from "../components/View";
import { Button } from "../components/Button";
import { auth } from "../firebase";
import { TOEasy, TouchableOpacity } from "../components/TouchableOpacity";
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
    <ViewColumnCenter>
      <TouchableOpacity onPress={refreshApp}>
        <Text>에러 날 시 앱 리로드</Text>
      </TouchableOpacity>
      <Text>Auth Screen</Text>
      <Text>인증</Text>
      <Button title="신규 이용자 회원가입" onPress={register} />
      <Button title="기존 이용자 로그인" onPress={login} />
    </ViewColumnCenter>
  );
};
