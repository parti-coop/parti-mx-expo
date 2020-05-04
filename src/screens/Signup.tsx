import React from "react";
import { ViewStyle, Image, Platform } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Text, Title30, Mint16, Sub16 } from "../components/Text";
import { V1, ViewRow, View } from "../components/View";
import { TouchableOpacity, TORow } from "../components/TouchableOpacity";

import { signUpWithGoogle, IdTokenResult } from "../firebase";
import { useStore } from "../Store";

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
export default function Singup(props) {
  const { navigate } = props.navigation;
  const [, dispatch] = useStore();
  function SignupEmail() {
    navigate("SignupEmail");
  }
  async function SignupGoogle() {
    const res = await signUpWithGoogle();
    if (res.additionalUserInfo.isNewUser) {
      navigate("AuthProfile", { showTerms: true });
    } else {
      const tokenResult: IdTokenResult = await res.user.getIdTokenResult();
      const userId = Number(
        tokenResult?.claims?.["https://hasura.io/jwt/claims"]?.[
          "x-hasura-user-id"
        ]
      );
      if (!isNaN(userId)) {
        dispatch({ type: "SET_USER", user_id: userId });
        showMessage({
          type: "success",
          message: "이미 가입 하셨습니다. 바로 로그인 합니다.",
        });
      }
    }
  }
  function login() {
    navigate("Login");
  }
  return (
    <>
      <View style={{ marginTop: 83, marginHorizontal: 60 }}>
        <Title30>회원가입</Title30>
        <ViewRow>
          <Sub16>이미 계정이 있으신가요?</Sub16>
          <TouchableOpacity onPress={login} style={{ marginTop: 10 }}>
            <Mint16 style={{ marginLeft: 10 }}>로그인</Mint16>
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
              onPress={SignupGoogle}
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
