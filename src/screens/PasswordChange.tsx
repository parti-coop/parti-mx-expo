import React from "react";
import { showMessage } from "react-native-flash-message";
import { useFocusEffect } from "@react-navigation/native";

import { Mint13, Title22 } from "../components/Text";
import { View, ViewRow } from "../components/View";
import HeaderConfirm from "../components/HeaderConfirm";
import { PasswordInput } from "../components/TextInput";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";
import { whiteRoundBg } from "../components/Styles";
import { LineSeperatorFull } from "../components/LineDivider";

import { useStore } from "../Store";
import { auth, Firebase } from "../firebase";

export default function PasswordChange(props) {
  const { goBack } = props.navigation;
  const [, dispatch] = useStore();
  const [oldP, setOldP] = React.useState("");
  const [newP, setNewP] = React.useState("");
  function resetInput() {
    setOldP("");
    setNewP("");
  }
  useFocusEffect(
    React.useCallback(() => {
      return resetInput;
    }, [])
  );
  async function reauth() {
    if (!(oldP && newP)) {
      return showMessage({ type: "info", message: "모두 입력하십시오" });
    }
    if (newP.length < 8) {
      return showMessage({
        type: "warning",
        message: "비밀번호는 8자 이상이어야 합니다.",
      });
    }
    const credential = Firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      oldP
    );
    dispatch({ type: "SET_LOADING", loading: true });
    resetInput();
    try {
      await auth.currentUser.reauthenticateWithCredential(credential);
      await auth.currentUser.updatePassword(newP);
      showMessage({
        type: "success",
        message: "비밀번호 갱신에 성공했습니다.",
      });
      goBack();
    } catch (error) {
      showMessage({ type: "danger", message: error.message });
    }
    dispatch({ type: "SET_LOADING", loading: false });
  }
  return (
    <>
      <HeaderConfirm onPress={reauth} />
      <KeyboardAwareScrollView>
        <View style={{ padding: 30, paddingTop: 6 }}>
          <Title22>비밀번호 변경</Title22>
        </View>

        <View
          style={[
            whiteRoundBg,
            {
              justifyContent: "center",
              paddingHorizontal: 20,
            },
          ]}
        >
          <ViewRow style={{ paddingVertical: 10 }}>
            <Mint13>현재 비밀번호</Mint13>
            <PasswordInput
              value={oldP}
              onChangeText={setOldP}
              placeholder="현재 비밀번호 입력"
              style={{ fontSize: 16 }}
            />
          </ViewRow>
          <LineSeperatorFull />
          <ViewRow style={{ paddingVertical: 10 }}>
            <Mint13>신규 비밀번호</Mint13>
            <PasswordInput
              value={newP}
              onChangeText={setNewP}
              placeholder="신규 비밀번호 입력"
              style={{ fontSize: 16 }}
            />
          </ViewRow>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}
