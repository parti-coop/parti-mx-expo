import React from "react";
import { ViewStyle, Image, Platform } from "react-native";

import { Text, Title30 } from "../components/Text";
import { V1, ViewRow, View } from "../components/View";
import { TouchableOpacity, TORow } from "../components/TouchableOpacity";

import { signUpWithGoogle } from "../firebase";

import iconEmail from "../../assets/iconEmail.png";
import iconGoogle from "../../assets/iconGoogle.png";
const roundedRectangle12 = {
  width: 255,
  height: 56,
  borderRadius: 15,
  backgroundColor: "#30ad9f",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#c9c9c9",
  marginBottom: 7,
} as ViewStyle;
const textStyle = {
  fontSize: 16,
  color: "#777777",
} as ViewStyle;
export default function Singup(props) {
  const { navigate } = props.navigation;
  function SignupEmail() {
    navigate("SignupEmail");
  }
  function login() {
    navigate("Login");
  }
  return (
    <>
      <View style={{ marginTop: 83, marginHorizontal: 60 }}>
        <Title30>회원가입</Title30>
        <ViewRow>
          <Text style={[textStyle]}>이미 계정이 있으신가요?</Text>
          <TouchableOpacity onPress={login} style={{ marginTop: 10 }}>
            <Text style={[textStyle, { color: "#30ad9f", marginLeft: 10 }]}>
              로그인
            </Text>
          </TouchableOpacity>
        </ViewRow>
      </View>

      <V1
        style={{
          marginHorizontal: 60,
          justifyContent: "flex-end",
          marginBottom: 128,
        }}
      >
        {Platform.select({
          android: (
            <TORow
              onPress={signUpWithGoogle}
              style={[roundedRectangle12, { backgroundColor: "#ee4822" }]}
            >
              <Image
                source={iconGoogle}
                style={{ marginLeft: 46, marginRight: 18 }}
              />
              <Text style={{ fontSize: 16, color: "#ffffff" }}>
                구글로 회원가입
              </Text>
            </TORow>
          ),
        })}
        <TORow onPress={SignupEmail} style={[roundedRectangle12]}>
          <Image
            source={iconEmail}
            style={{ marginLeft: 46, marginRight: 18 }}
          />
          <Text style={{ fontSize: 16, color: "#ffffff" }}>
            이메일로 회원가입
          </Text>
        </TORow>
      </V1>
    </>
  );
}
