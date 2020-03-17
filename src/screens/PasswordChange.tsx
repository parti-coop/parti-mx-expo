import React from "react";
import { Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useStore } from "../Store";
import { Text, Text2 } from "../components/Text";
import { View, ViewRowLeft, ViewColumnCenter } from "../components/View";
import { TouchableOpacity, TOEasy } from "../components/TouchableOpacity";
import { PasswordInput } from "../components/TextInput";
import { auth, Firebase } from "../firebase";
export default props => {
  const { navigate, goBack } = props.navigation;
  const [store, dispatch] = useStore();
  const [oldP, setOldP] = React.useState("");
  const [newP, setNewP] = React.useState("");

  function reauth() {
    const credential = Firebase.auth.EmailAuthProvider.credential(
      auth.currentUser.email,
      oldP
    );
    auth.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => auth.currentUser.updatePassword(newP))
      .then(() =>
        Alert.alert("갱신 성공", "비밀번호 갱신에 성공했습니다.", [
          {
            text: "확인",
            onPress: () => goBack()
          }
        ])
      )
      .catch(err =>
        Alert.alert(
          "갱신 실패",
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
      <ViewRowLeft>
        <TouchableOpacity
          style={{ width: 50, padding: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons name="ios-arrow-back" size={60} />
        </TouchableOpacity>
        <Text2>비밀번호 변경</Text2>
      </ViewRowLeft>

      <View style={{ flex: 1, alignItems:"stretch" }}>
        <PasswordInput value={oldP} onChangeText={setOldP} />
        <PasswordInput value={newP} onChangeText={setNewP} />
      </View>
      <TOEasy onPress={reauth}>
        <Text>보내기</Text>
      </TOEasy>
    </>
  );
};
