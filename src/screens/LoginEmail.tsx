import React from "react";
import { StackHeaderProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import {
  ViewProps,
  TextProps,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import { Text } from "../components/Text";
import { EmailInput, PasswordInput } from "../components/TextInput";
import { ViewRow, V0 } from "../components/View";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { TORowCenter } from "../components/TouchableOpacity";
import HeaderBack from "../components/HeaderBack";

import { auth } from "../firebase";
import { useStore } from "../Store";

import iconEmailColor from "../../assets/iconEmailColor.png";
import iconPassword from "../../assets/iconPassword.png";
import LineSeperator from "../components/LineSeperator";
const boxStyle = {
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowRadius: 1,
  shadowOpacity: 1,
  marginHorizontal: 30,
  marginVertical: 21,
  alignItems: "stretch",
  justifyContent: "center"
} as ViewProps;
const textStyle = {
  fontSize: 16,
  color: "#999999"
} as TextProps;
const btnStyle = {
  height: 56,
  borderRadius: 15,
  backgroundColor: "#30ad9f",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#c9c9c9"
} as ViewProps;
export default (props: StackHeaderProps) => {
  const { navigate } = props.navigation;
  const [, dispatch] = useStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const emailTextInput = React.useRef(null);
  const pswTextInput = React.useRef(null);

  function loginHandler() {
    dispatch({ type: "SET_LOADING", loading: true });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => user.uid)
      .then(() =>
        showMessage({
          type: "success",
          message: "로그인 성공 하셨습니다."
        })
      )
      .catch(err =>
        showMessage({
          type: "danger",
          message: JSON.stringify(err)
        })
      )
      .finally(() =>
        dispatch({
          type: "SET_LOADING",
          loading: false
        })
      );
  }
  return (
    <>
      <HeaderBack />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ViewRow style={{ padding: 30, paddingTop: 6 }}>
          <Text style={{ fontSize: 30, color: "#333333" }}>이메일 로그인</Text>
        </ViewRow>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView style={{ justifyContent: "flex-end" }}>
        <V0 style={boxStyle}>
          <ViewRow
            style={{
              paddingHorizontal: 30,
              paddingVertical: 24
            }}
          >
            <Image source={iconEmailColor} />
            <EmailInput
              value={email}
              onChange={e => setEmail(e.nativeEvent.text)}
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
              onChange={e => setPassword(e.nativeEvent.text)}
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
                color: "#30ad9f"
              }}
            >
              비밀번호 찾기
            </Text>
          </TORowCenter>
        </V0>
      </KeyboardAvoidingView>
    </>
  );
};
