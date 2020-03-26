import React from "react";
import { Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text, Text2 } from "../components/Text";
import { View, ViewRow, ViewColumnCenter } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { auth } from "../firebase";
export default props => {
  const { navigate, goBack } = props.navigation;
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
              onPress: () => goBack()
            }
          ]
        )
      )
      .catch(err =>
        Alert.alert(
          "발송 실패",
          "오류가 발생했습니다. 잠시 후 다시 시도하세요." + err,
          [
            {
              text: "확인",
              onPress: () => goBack()
            }
          ]
        )
      );
  }
  return (
    <>
      <ViewRow>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text2>비밀번호 찾기</Text2>
      </ViewRow>
      <ViewColumnCenter>
        <Text2>회원가입 시 등록한 이메일 주소를 입력하세요.</Text2>
      </ViewColumnCenter>
      <ViewRow style={{ flex: 1 }}>
        <AntDesign name="mail" size={30} />
        <TextInput
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="이메일 주소"
          placeholderTextColor="#c5c5c5"
          maxLength={100}
          onChange={e => setEmail(e.nativeEvent.text)}
          autoFocus
          onSubmitEditing={sendEmail}
        />
      </ViewRow>
      <TOEasy onPress={sendEmail}>
        <Text>보내기</Text>
      </TOEasy>
    </>
  );
};
