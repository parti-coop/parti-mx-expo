import React from "react";
import { ImageBackground, ViewProps, TextProps } from "react-native";

import { Text } from "../components/Text";
import { Image } from "../components/Image";
import { View, ViewRow } from "../components/View";
import { TouchableOpacity, TO1 } from "../components/TouchableOpacity";
import useAppRefresh from "../components/useAppRefresh";

import bgIntro from "../../assets/bgIntro.png";
import appIcon from "../../assets/appIcon.png";
const box = {
  height: 96,
  backgroundColor: "#008489",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#12BD8E",
} as ViewProps;
const textStyle = {
  fontSize: 16,
  lineHeight: 28,
  textAlign: "center",
  color: "#ffffff",
} as TextProps;
export default (props) => {
  const { navigate } = props.navigation;
  const appRefresh = useAppRefresh();
  function register() {
    navigate("Signup");
  }
  function login() {
    navigate("Login");
  }

  return (
    <ImageBackground source={appIcon} style={{ flex: 1 }}>
      {/* <View>
        <Text></Text>
        <TouchableOpacity
          onPress={appRefresh}
          style={{ position: "absolute", right: 29, top: 96 }}
        >
          <Image source={appIcon} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
      </View> */}
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
