import React from "react";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { ViewProps, TextProps, Image } from "react-native";

import { Text, Title30 } from "../components/Text";
import { EmailInput, PasswordInput } from "../components/TextInput";
import { ViewRow, V0 } from "../components/View";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { TORowCenter } from "../components/TouchableOpacity";
import HeaderBack from "../components/HeaderBack";
import { whiteRoundBg } from "../components/Styles";

import { auth, IdTokenResult } from "../firebase";
import { useStore } from "../Store";

import iconEmailColor from "../../assets/iconEmailColor.png";
import iconPassword from "../../assets/iconPassword.png";
import { LineSeperator } from "../components/LineDivider";
const textStyle = {
  fontSize: 16,
  color: "#999999",
} as TextProps;
const btnStyle = {
  height: 56,
  borderRadius: 15,
  backgroundColor: "#12BD8E",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#c9c9c9",
} as ViewProps;
export default function LoginEmail() {
  const { navigate, goBack } = useNavigation();
  const [, dispatch] = useStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const emailTextInput = React.useRef(null);
  const pswTextInput = React.useRef(null);

  async function loginHandler() {
    dispatch({ type: "SET_LOADING", loading: true });
    try {
      const credential = await auth.signInWithEmailAndPassword(email, password);

      const tokenResult: IdTokenResult = await credential.user.getIdTokenResult();
      const userId = Number(
        tokenResult?.claims?.["https://hasura.io/jwt/claims"]?.[
          "x-hasura-user-id"
        ]
      );
      if (isNaN(userId)) {
        console.log(tokenResult);
        return showMessage({
          type: "danger",
          message: "서버로 부터 인증을 받지 못하였습니다.",
        });
      }
      showMessage({
        type: "success",
        message: "로그인 성공 하셨습니다.",
      });
      dispatch({ type: "SET_LOADING", loading: false });
      dispatch({ type: "SET_USER", user_id: Number(userId) });
    } catch (error) {
      showMessage({
        type: "danger",
        message: JSON.stringify(error),
      });
    }
    dispatch({ type: "SET_LOADING", loading: false });
  }
  return (
    <>
      <HeaderBack />
      <KeyboardAwareScrollView>
        <ViewRow style={{ padding: 30, paddingTop: 6 }}>
          <Title30>이메일 로그인</Title30>
        </ViewRow>
        <V0
          style={[
            whiteRoundBg,
            {
              marginHorizontal: 30,
              marginVertical: 21,
              alignItems: "stretch",
              justifyContent: "center",
            },
          ]}
        >
          <ViewRow
            style={{
              paddingHorizontal: 30,
              paddingVertical: 24,
            }}
          >
            <Image source={iconEmailColor} />
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
              ref={emailTextInput}
              autoFocus={true}
              onSubmitEditing={() => pswTextInput.current.focus()}
              style={[textStyle]}
            />
          </ViewRow>
          <LineSeperator />
          <ViewRow style={{ paddingHorizontal: 30, paddingVertical: 24 }}>
            <Image source={iconPassword} />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.nativeEvent.text)}
              ref={pswTextInput}
              onSubmitEditing={loginHandler}
              style={[textStyle]}
            />
          </ViewRow>
        </V0>
        <V0 style={{ alignItems: "stretch", marginHorizontal: 30 }}>
          <TORowCenter onPress={loginHandler} style={btnStyle}>
            <Text style={{ fontSize: 16, color: "#ffffff" }}>로그인</Text>
          </TORowCenter>
          <TORowCenter
            onPress={() => navigate("PasswordFind")}
            style={{ padding: 36 }}
          >
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                color: "#12BD8E",
              }}
            >
              비밀번호 찾기
            </Text>
          </TORowCenter>
        </V0>
      </KeyboardAwareScrollView>
    </>
  );
}
