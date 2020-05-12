import React from "react";
import { ViewStyle, Image, Platform } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Text, Title30 } from "../components/Text";
import { V1, ViewRow, View } from "../components/View";
import { TouchableOpacity, TORow } from "../components/TouchableOpacity";

import { getUserId } from "../firebase";
import { useStore } from "../Store";

import iconEmail from "../../assets/iconEmail.png";
import iconGoogle from "../../assets/iconGoogle.png";
const roundedRectangle12 = {
  width: 255,
  height: 56,
  borderRadius: 15,
  backgroundColor: "#12BD8E",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#c9c9c9",
  marginBottom: 7,
} as ViewStyle;
const textStyle = {
  fontSize: 16,
  color: "#777777",
} as ViewStyle;
export default function Login(props) {
  const { navigate } = props.navigation;
  const [, dispatch] = useStore();
  function register() {
    navigate("Signup");
  }
  function loginEmail() {
    navigate("LoginEmail");
  }
  // async function SigninGoogle() {
  //   const res = await signUpWithGoogle();
  //   if (res.additionalUserInfo.isNewUser) {
  //     showMessage({
  //       type: "info",
  //       message: "아직 가입 하지 않았습니다, 가입 절차를 진행합니다.",
  //     });
  //     navigate("AuthProfile", { showTerms: true });
  //   } else {
  //     const userId =await getUserId();
  //     if (userId !== null) {
  //       dispatch({ type: "SET_USER", user_id: userId });
  //     }
  //   }
  // }
  return (
    <>
      <View style={{ marginTop: 83, marginHorizontal: 60 }}>
        <Title30>로그인</Title30>
        <ViewRow>
          <Text style={[textStyle]}>아직 계정이 없으신가요?</Text>
          <TouchableOpacity onPress={register} style={{ marginTop: 10 }}>
            <Text style={[textStyle, { color: "#12BD8E", marginLeft: 10 }]}>
              회원가입
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
        {/* {Platform.select({
          android: (
            <TORow
              onPress={SigninGoogle}
              style={[roundedRectangle12, { backgroundColor: "#ee4822" }]}
            >
              <Image
                source={iconGoogle}
                style={{ marginLeft: 46, marginRight: 18 }}
              />
              <Text style={{ fontSize: 16, color: "#ffffff" }}>
                구글로 로그인
              </Text>
            </TORow>
          ),
        })} */}
        <TORow onPress={loginEmail} style={[roundedRectangle12]}>
          <Image
            source={iconEmail}
            style={{ marginLeft: 46, marginRight: 18 }}
          />
          <Text style={{ fontSize: 16, color: "#ffffff" }}>
            이메일로 로그인
          </Text>
        </TORow>
      </V1>
    </>
  );
}
