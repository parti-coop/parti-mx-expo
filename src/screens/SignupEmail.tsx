import React from "react";
import { Keyboard, ViewProps, TextProps, Image } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Text, Title30, Body16 } from "../components/Text";
import { EmailInput, PasswordInput } from "../components/TextInput";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { ViewRow, V0, View } from "../components/View";
import { Margin10 } from "../components/Margin";
import { TouchableOpacity, TORowCenter } from "../components/TouchableOpacity";
import HeaderBack from "../components/HeaderBack";
import ButtonCheckbox from "../components/ButtonCheckbox";

import { useStore } from "../Store";
import { auth } from "../firebase";

import iconEmailColor from "../../assets/iconEmailColor.png";
import iconPassword from "../../assets/iconPassword.png";
import { LineSeperator } from "../components/LineDivider";
const boxStyle = {
  borderRadius: 25,
  backgroundColor: "#ffffff",
  shadowColor: "rgba(0, 0, 0, 0.15)",
  elevation: 1,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 1,
  shadowOpacity: 1,
  marginHorizontal: 30,
  marginVertical: 21,
  alignItems: "stretch",
  justifyContent: "center",
} as ViewProps;
const textStyle = {
  fontSize: 16,
  color: "#999999",
} as TextProps;
const btnStyle = {
  height: 56,
  borderRadius: 15,
  backgroundColor: "#30ad9f",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#c9c9c9",
  margin: 30,
} as ViewProps;
export default function SingupEmail(props) {
  const { navigate } = props.navigation;
  const [, dispatch] = useStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkboxes, setCheckboxes] = React.useState([false, false]);
  const pswTextInput = React.useRef(null);

  function keyboardDownHandler() {
    Keyboard.dismiss();
  }
  async function registerHandler() {
    if (checkboxes.includes(false)) {
      return showMessage({ type: "warning", message: "약관에 동의해주세요" });
    }
    dispatch({ type: "SET_LOADING", loading: true });
    try {
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (credential.additionalUserInfo.isNewUser) {
        showMessage({
          type: "success",
          message: "회원가입에 성공 하셨습니다. 고유한 유저명을 만들어 주세요.",
        });
        navigate("AuthProfile");
      }
    } catch (error) {
      showMessage({ type: "danger", message: error.message });
    }
    dispatch({ type: "SET_LOADING", loading: false });
  }

  function checkboxHandler1(v: boolean) {
    setCheckboxes([v, checkboxes[1]]);
  }
  function checkboxHandler2(v: boolean) {
    setCheckboxes([checkboxes[0], v]);
  }

  return (
    <>
      <HeaderBack />
      <KeyboardAwareScrollView>
        <ViewRow style={{ paddingHorizontal: 30 }}>
          <Title30>이메일 회원가입</Title30>
        </ViewRow>
        <V0 style={boxStyle}>
          <ViewRow
            style={{
              paddingHorizontal: 30,
              paddingVertical: 24,
            }}
          >
            <Image source={iconEmailColor} />
            <EmailInput
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
              ref={pswTextInput}
              onSubmitEditing={keyboardDownHandler}
              style={[textStyle]}
            />
          </ViewRow>
        </V0>
        <View style={{ paddingHorizontal: 30 }}>
          <ViewRow style={{ marginVertical: 10 }}>
            <ButtonCheckbox value={checkboxes[0]} setValue={checkboxHandler1} />
            <Margin10 />
            <TouchableOpacity onPress={() => navigate("TermsService")}>
              <Body16>서비스 이용약관</Body16>
              <View style={{ height: 1, backgroundColor: "black" }} />
            </TouchableOpacity>
            <Text>에 동의합니다 (필수)</Text>
          </ViewRow>
          <ViewRow style={{ marginVertical: 10 }}>
            <ButtonCheckbox value={checkboxes[1]} setValue={checkboxHandler2} />
            <Margin10 />
            <TouchableOpacity onPress={() => navigate("TermsPrivacy")}>
              <Body16>개인정보 처리방침</Body16>
              <View style={{ height: 1, backgroundColor: "black" }} />
            </TouchableOpacity>
            <Text>에 동의합니다 (필수)</Text>
          </ViewRow>
        </View>

        <TORowCenter onPress={registerHandler} style={btnStyle}>
          <Text style={{ fontSize: 16, color: "#ffffff" }}>확인</Text>
        </TORowCenter>
      </KeyboardAwareScrollView>
    </>
  );
}
