import React from "react";
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ViewProps,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Text, Title30, Sub15, White16 } from "../components/Text";
import { ViewRow } from "../components/View";
import { TO1, TOCenter } from "../components/TouchableOpacity";
import { EmailInput } from "../components/TextInput";
import HeaderBack from "../components/HeaderBack";

import { useStore } from "../Store";
import { auth } from "../firebase";

import iconEmailColor from "../../assets/iconEmailColor.png";
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
  justifyContent: "center",
  padding: 30,
} as ViewProps;
const roundedRectangle12 = {
  height: 56,
  borderRadius: 15,
  backgroundColor: "#30ad9f",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#c9c9c9",
  marginHorizontal: 30,
  marginVertical: 21,
} as ViewProps;
export default (props) => {
  const { navigate, goBack } = useNavigation();
  const [store, dispatch] = useStore();
  const [email, setEmail] = React.useState("");
  function sendEmail() {
    auth
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          "이메일을 발송했습니다",
          "이메일로 보내드린 안내에 따라 비밀번호를 재설정하세요.",
          [
            {
              text: "확인",
              onPress: () => goBack(),
            },
          ]
        )
      )
      .catch((err) =>
        Alert.alert(
          "발송 실패",
          "오류가 발생했습니다. 잠시 후 다시 시도하세요." + err,
          [
            {
              text: "확인",
              onPress: () => goBack(),
            },
          ]
        )
      );
  }
  return (
    <>
      <HeaderBack />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ViewRow style={{ padding: 30, paddingTop: 6 }}>
          <Title30>비밀번호 찾기</Title30>
          <Sub15>회원가입 시 등록한 이메일 주소를 입력하세요.</Sub15>
        </ViewRow>
      </TouchableWithoutFeedback>
      <ViewRow style={boxStyle}>
        <Image source={iconEmailColor} />
        <EmailInput
          value={email}
          onChangeText={setEmail}
          autoFocus={true}
          onSubmitEditing={sendEmail}
          style={{
            fontSize: 16,
            color: "#999999",
          }}
        />
      </ViewRow>
      <TOCenter onPress={sendEmail} style={roundedRectangle12}>
        <White16>보내기</White16>
      </TOCenter>
    </>
  );
};
