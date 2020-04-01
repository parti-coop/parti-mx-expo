import React from "react";
import {
  Keyboard,
  ViewProps,
  TextProps,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { showMessage } from "react-native-flash-message";

import { Text } from "../components/Text";
import { EmailInput, PasswordInput } from "../components/TextInput";
import { KeyboardAvoidingView } from "../components/KeyboardAvoidingView";
import { ViewRow, V0, View } from "../components/View";
import { Margin10 } from "../components/Margin";
import { TouchableOpacity } from "../components/TouchableOpacity";
import HeaderBack from "../components/HeaderBack";
import ButtonCheckbox from "../components/ButtonCheckbox";

import { useStore } from "../Store";
import { auth } from "../firebase";

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
export default props => {
  const { navigate } = props.navigation;
  const [, dispatch] = useStore();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkboxes, setCheckboxes] = React.useState([false, false]);
  const pswTextInput = React.useRef(null);

  function keyboardDownHandler() {
    Keyboard.dismiss();
  }
  function registerHandler() {
    if (checkboxes.includes(false)) {
      return showMessage({ type: "warning", message: "약관에 동의해주세요" });
    }
    dispatch({ type: "SET_LOADING", loading: true });
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        showMessage({
          type: "success",
          message: "회원가입에 성공 하셨습니다."
        })
      )
      .catch(err => showMessage({ type: "danger", message: err.message }))
      .finally(() =>
        dispatch({
          type: "SET_LOADING",
          loading: false
        })
      );
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ViewRow style={{ padding: 30, paddingTop: 6 }}>
          <Text style={{ fontSize: 30, color: "#333333" }}>
            이메일 회원가입
          </Text>
        </ViewRow>
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView>
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
              <Text>서비스 이용약관</Text>
            </TouchableOpacity>
            <Text>에 동의합니다 (필수)</Text>
          </ViewRow>
          <ViewRow style={{ marginVertical: 10 }}>
            <ButtonCheckbox value={checkboxes[1]} setValue={checkboxHandler2} />
            <Margin10 />
            <TouchableOpacity onPress={() => navigate("TermsPrivacy")}>
              <Text>개인정보 처리방침</Text>
            </TouchableOpacity>
            <Text>에 동의합니다 (필수)</Text>
          </ViewRow>
        </View>

        <TouchableOpacity onPress={registerHandler} style={{ flex: 1 }}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};
