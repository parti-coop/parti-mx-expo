import React from "react";
import { TouchableWithoutFeedback, Keyboard, ViewProps } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Mint13, Title30 } from "../components/Text";
import { View, ViewRow } from "../components/View";
import HeaderConfirm from "../components/HeaderConfirm";
import { PasswordInput } from "../components/TextInput";
import { KeyboardAwareScrollView } from "../components/KeyboardAwareScrollView";

import { useStore } from "../Store";
import { auth, Firebase } from "../firebase";

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
export default (props) => {
  const { navigate, goBack } = props.navigation;
  const [store, dispatch] = useStore();
  const [oldP, setOldP] = React.useState("");
  const [newP, setNewP] = React.useState("");
  function resetInput() {
    setOldP("");
    setNewP("");
  }
  async function reauth() {
    if (!(oldP && newP)) {
      return showMessage({ type: "info", message: "모두 입력하십시오" });
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
          <Title30>비밀번호 변경</Title30>
        </View>

        <View style={boxStyle}>
          <ViewRow>
            <Mint13>현재 비밀번호</Mint13>
            <PasswordInput
              value={oldP}
              onChangeText={setOldP}
              placeholder="현재 비밀번호를입력해 주세요"
              style={{ fontSize: 16 }}
            />
          </ViewRow>
          <ViewRow>
            <Mint13>신규 비밀번호</Mint13>
            <PasswordInput
              value={newP}
              onChangeText={setNewP}
              placeholder="신규 비밀번호를 입력해주세요"
              style={{ fontSize: 16 }}
            />
          </ViewRow>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
