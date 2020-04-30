import React from "react";
import { Alert, ViewStyle } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useFocusEffect } from "@react-navigation/native";

import { Title30 } from "../components/Text";
import HeaderBack from "../components/HeaderBack";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { White18, Body16 } from "../components/Text";
import { ViewRow } from "../components/View";
import { TO1 } from "../components/TouchableOpacity";
import { PasswordInput } from "../components/TextInput";
import { DotMint4 } from "../components/Dots";

import { auth, Firebase } from "../firebase";
const box = {
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
  padding: 30,
} as ViewStyle;
export default function AccountDelete() {
  const [password, setPassword] = React.useState("");
  useFocusEffect(
    React.useCallback(() => {
      return () => setPassword("");
    }, [])
  );

  function exitHandler() {
    if (password.length < 6) {
      return showMessage({
        type: "warning",
        message: "비밀번호를 넣어 주세요",
      });
    }
    const credential = Firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    Alert.alert("회원탈퇴", "회원탈퇴 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "네",
        onPress: async () => {
          try {
            await auth.currentUser.reauthenticateWithCredential(credential);
            await auth.currentUser.delete();
            showMessage({ type: "success", message: "회원탈퇴 하였습니다." });
          } catch (error) {
            showMessage({ type: "danger", message: JSON.stringify(error) });
          }
        },
      },
    ]);
  }
  return (
    <>
      <HeaderBack />
      <ViewRow style={{ padding: 30, paddingTop: 6 }}>
        <Title30>회원탈퇴</Title30>
      </ViewRow>
      <KeyboardAwareScrollView style={box}>
        <Body16>
          회원 탈퇴 시 서비스 이용 정보를 아래와 같이 정리 합니다.
        </Body16>
        <ViewRow style={{ marginTop: 40 }}>
          <DotMint4 style={{ marginRight: 10 }} />
          <Body16>회원 정보: 즉시 삭제</Body16>
        </ViewRow>
        <ViewRow>
          <DotMint4 style={{ marginRight: 10 }} />
          <Body16>가입 그룹 정보: 즉시 삭제</Body16>
        </ViewRow>
        <ViewRow>
          <DotMint4 style={{ marginRight: 10 }} />
          <Body16>작성된 글 및 댓글: 유지</Body16>
        </ViewRow>
        <Body16 style={{ marginTop: 40 }}>
          작성한 게시물의 삭제를 원하시는 경우, 탈퇴 신청 전에 삭제를
          진행해주세요. 탈퇴 처리가 완료된 후에는 작성 하신글과 댓글의 삭제를
          요청할 수 없습니다.
        </Body16>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          autoFocus={true}
          onSubmitEditing={exitHandler}
          style={{ marginVertical: 20 }}
        />
        <TO1
          onPress={exitHandler}
          style={{
            height: 50,
            borderRadius: 15,
            backgroundColor: "#30ad9f",
          }}
        >
          <White18>탈퇴합니다</White18>
        </TO1>
      </KeyboardAwareScrollView>
    </>
  );
}
