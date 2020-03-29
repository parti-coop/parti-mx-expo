import React from "react";
import {
  ImageBackground,
  ViewProps,
  TextProps,
  Image,
  Alert
} from "react-native";
import Constants from "expo-constants";

import { Text } from "../components/Text";
import { View, ViewRow } from "../components/View";
import { TouchableOpacity, TO1 } from "../components/TouchableOpacity";

import { useStore } from "../Store";

import bgIntro from "../../assets/bgIntro.png";
import partimxLogo from "../../assets/partimxLogo.png";
const box = {
  height: 96,
  backgroundColor: "#008489",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#c9c9c9"
} as ViewProps;
const textStyle = {
  fontSize: 16,
  lineHeight: 28,
  textAlign: "center",
  color: "#ffffff"
} as TextProps;
export default props => {
  const { navigate } = props.navigation;
  const [, dispatch] = useStore();
  function register() {
    navigate("Signup");
  }
  function login() {
    navigate("Login");
  }

  function refreshApp() {
    Alert.alert(
      "앱 리로딩",
      `앱을 새로 다운받고 시작하시겠습니까?
      \n 현재 앱 버전: 3월26일
      \n nativeBuildVersion: ${Constants.nativeBuildVersion}`,
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "reload",
          onPress: () => dispatch({ type: "APP_REFRESH" })
        }
      ]
    );
  }

  return (
    <ImageBackground source={bgIntro} style={{ flex: 1 }}>
      <View>
        <Text></Text>
        <TouchableOpacity
          onPress={refreshApp}
          style={{ position: "absolute", right: 29, top: 96 }}
        >
          <Image source={partimxLogo} />
        </TouchableOpacity>
      </View>
      <ViewRow style={{ position: "absolute", bottom: 0 }}>
        <TO1 onPress={register} style={[box, { borderTopRightRadius: 30 }]}>
          <Text style={[textStyle]}>신규 이용자</Text>
          <Text style={[textStyle, { fontSize: 22 }]}>회원가입</Text>
        </TO1>
        <TO1 onPress={login} style={[box, { borderTopLeftRadius: 30 }]}>
          <Text style={[textStyle]}>기존 이용자</Text>
          <Text style={[textStyle, { fontSize: 22 }]}>로그인</Text>
        </TO1>
      </ViewRow>
    </ImageBackground>
  );
};
